import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Link } from "@tanstack/react-router";
import { ArrowUp, Square, X } from "lucide-react";
import { site } from "@/data/site";
import { Brand } from "./brand";

type Message = { role: "user" | "assistant"; content: string };
type StreamEvent =
  { type: "delta"; text: string } | { type: "done" } | { type: "error"; message: string };

const suggestions = ["What is Aestrox POS?", "How does pricing work?", "Can I use my printer?"];
const MAX_INPUT_HEIGHT = 132;

/** Reads the assistant's newline-delimited JSON stream, one event per line. */
async function* readEvents(body: ReadableStream<Uint8Array>): AsyncGenerator<StreamEvent> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  try {
    while (true) {
      const { value, done } = await reader.read();
      buffer += done ? decoder.decode() : decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = done ? "" : (lines.pop() ?? "");
      for (const line of lines) if (line.trim()) yield JSON.parse(line) as StreamEvent;
      if (done) return;
    }
  } finally {
    reader.releaseLock();
  }
}

export default function ChatWidget({
  open,
  onOpenChange,
  onCloseFocus,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCloseFocus: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  // The answer being written, shown live until it is complete.
  const [draft, setDraft] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const request = useRef<AbortController | null>(null);
  const pendingHistory = useRef<Message[] | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const nearBottom = useRef(true);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => () => request.current?.abort(), []);
  useEffect(() => {
    if (!open) request.current?.abort();
  }, [open]);

  const scrollToEnd = useCallback(() => {
    const log = scrollRef.current;
    if (log && nearBottom.current) log.scrollTop = log.scrollHeight;
  }, []);
  useLayoutEffect(() => {
    scrollToEnd();
  }, [messages, draft, busy, error, scrollToEnd]);

  // Phones: keep the sheet inside the visible area when the keyboard opens
  // (iOS shrinks only the visual viewport) and keep the latest message in view.
  useEffect(() => {
    const viewport = window.visualViewport;
    const panel = panelRef.current;
    if (!open || !viewport || !panel) return;
    const sync = () => {
      panel.style.setProperty("--chat-viewport-height", `${viewport.height}px`);
      panel.style.setProperty("--chat-viewport-top", `${viewport.offsetTop}px`);
      requestAnimationFrame(scrollToEnd);
    };
    sync();
    viewport.addEventListener("resize", sync);
    viewport.addEventListener("scroll", sync);
    return () => {
      viewport.removeEventListener("resize", sync);
      viewport.removeEventListener("scroll", sync);
    };
  }, [open, scrollToEnd]);

  // The question box grows with the text, up to a few lines.
  useLayoutEffect(() => {
    const box = inputRef.current;
    if (!box) return;
    box.style.height = "auto";
    box.style.height = `${Math.min(box.scrollHeight, MAX_INPUT_HEIGHT)}px`;
  }, [input, open]);

  async function send(text: string, retry = false) {
    if (request.current || !text.trim()) return;
    // A failed/cancelled question has no assistant response. A new question
    // replaces that pending turn instead of sending two consecutive user roles.
    const completed = messages.at(-1)?.role === "user" ? messages.slice(0, -1) : messages;
    const history: Message[] =
      retry && pendingHistory.current
        ? pendingHistory.current
        : [...completed.slice(-10), { role: "user", content: text.trim() }];
    pendingHistory.current = history;
    if (!retry) setMessages(history);
    setInput("");
    setError("");
    setBusy(true);
    setDraft("");
    setAnnouncement("Aestrox is typing.");
    nearBottom.current = true;
    const controller = new AbortController();
    request.current = controller;
    let timedOut = false;
    const timeout = window.setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, 30000);
    let answer = "";
    const keepAnswer = () => {
      setMessages([...history, { role: "assistant", content: answer.trim() }]);
      pendingHistory.current = null;
    };
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      });
      if (!response.ok) {
        if (response.status === 429)
          throw new Error("A few too many messages at once. Please wait a minute and try again.");
        throw new Error("The assistant is unavailable right now. Try again, or contact our team.");
      }
      if (response.headers.get("content-type")?.includes("application/json")) {
        // A non-streaming reply, from an older deployment of the function.
        const result = (await response.json()) as { reply?: unknown };
        if (typeof result.reply !== "string" || !result.reply.trim()) throw new Error("");
        answer = result.reply;
      } else if (response.body) {
        for await (const event of readEvents(response.body)) {
          if (event.type === "delta") {
            answer += event.text;
            setDraft(answer);
          } else if (event.type === "error") {
            throw new Error(
              answer
                ? "The answer was cut short. You can ask again."
                : "We couldn’t complete that response. Please try again.",
            );
          }
        }
      }
      if (!answer.trim()) throw new Error("No response was received. Please try again.");
      keepAnswer();
      setAnnouncement("Aestrox has replied.");
    } catch (reason) {
      const stopped = controller.signal.aborted && !timedOut;
      // Whatever already arrived stays in the conversation.
      if (answer.trim()) keepAnswer();
      const message = stopped
        ? answer.trim()
          ? "Response stopped."
          : "Response stopped. You can retry your question."
        : timedOut
          ? "The response took too long. Try again or contact our team."
          : reason instanceof Error && reason.message
            ? reason.message
            : "We couldn’t complete that response. Please try again.";
      setError(message);
      setAnnouncement(message);
    } finally {
      window.clearTimeout(timeout);
      request.current = null;
      setDraft(null);
      setBusy(false);
    }
  }

  const typing = busy && !draft;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay chat-overlay" />
        <Dialog.Content
          ref={panelRef}
          className="chat-panel"
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            // On touch screens, opening the keyboard straight away hides the
            // conversation; let people read first and tap the box to type.
            if (window.matchMedia("(pointer: coarse)").matches) panelRef.current?.focus();
            else inputRef.current?.focus();
          }}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            onCloseFocus();
          }}
        >
          <div className="chat-header">
            <div>
              <Dialog.Title asChild>
                <h2>
                  <Brand />
                </h2>
              </Dialog.Title>
              <Dialog.Description>AI assistant · Product & sales questions</Dialog.Description>
            </div>
            <Dialog.Close className="icon-button" aria-label="Close assistant">
              <X size={20} />
            </Dialog.Close>
          </div>
          <div
            className="chat-messages"
            ref={scrollRef}
            onScroll={() => {
              const log = scrollRef.current;
              if (log)
                nearBottom.current = log.scrollHeight - log.scrollTop - log.clientHeight < 80;
            }}
            role="log"
            aria-label="Conversation"
            aria-live="off"
            tabIndex={0}
          >
            <div className="chat-bubble welcome">
              Hi, how can I help? Ask me about Aestrox POS, pricing or getting started.
            </div>
            {messages.map((message, index) => (
              <div className={`chat-bubble ${message.role}`} key={index}>
                <span className="sr-only">{message.role === "user" ? "You" : "Aestrox"}: </span>
                {message.content}
              </div>
            ))}
            {draft ? (
              <div className="chat-bubble streaming" aria-hidden="true">
                {draft}
                <span className="chat-caret" />
              </div>
            ) : null}
            {typing ? (
              <div className="chat-typing" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
            ) : null}
            {!messages.length && !busy && (
              <div className="chat-suggestions">
                {suggestions.map((question) => (
                  <button key={question} onClick={() => void send(question)}>
                    {question}
                  </button>
                ))}
              </div>
            )}
            {error && (
              <div className="chat-error" role="alert">
                {error}
                <div>
                  {pendingHistory.current && (
                    <button
                      onClick={() => void send(pendingHistory.current?.at(-1)?.content ?? "", true)}
                    >
                      Try again
                    </button>
                  )}
                  <a href={`mailto:${site.email}`}>Email our team</a>
                </div>
              </div>
            )}
          </div>
          <div className="sr-only" role="status" aria-live="polite">
            {announcement}
          </div>
          <div className="chat-composer">
            <form
              noValidate
              onSubmit={(event) => {
                event.preventDefault();
                void send(input);
              }}
            >
              <label className="sr-only" htmlFor="chat-question">
                Your question
              </label>
              <textarea
                ref={inputRef}
                id="chat-question"
                rows={1}
                maxLength={1200}
                value={input}
                enterKeyHint="send"
                autoComplete="off"
                onChange={(event) => setInput(event.target.value)}
                onFocus={() => {
                  nearBottom.current = true;
                  window.setTimeout(scrollToEnd, 300);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
                    event.preventDefault();
                    if (!busy) void send(input);
                  }
                }}
                placeholder="Ask about Aestrox…"
              />
              {busy ? (
                <button
                  type="button"
                  className="chat-send"
                  aria-label="Stop response"
                  onClick={() => request.current?.abort()}
                >
                  <Square size={15} fill="currentColor" />
                </button>
              ) : (
                <button
                  className="chat-send"
                  type="submit"
                  disabled={!input.trim()}
                  aria-label="Send question"
                >
                  <ArrowUp size={20} />
                </button>
              )}
            </form>
            <p className="chat-privacy">
              AI answers can be mistaken. Don’t share sensitive details. Messages are processed by
              Groq. <Link to="/privacy">Privacy</Link>
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
