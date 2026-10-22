import { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Link } from "@tanstack/react-router";
import { LoaderCircle, Send, Square, X } from "lucide-react";
import { site } from "@/data/site";
import { Brand } from "./brand";

type Message = { role: "user" | "assistant"; content: string };
const suggestions = ["What is Aestrox POS?", "How does pricing work?", "Can I use my printer?"];

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
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const request = useRef<AbortController | null>(null);
  const pendingHistory = useRef<Message[] | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const nearBottom = useRef(true);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => () => request.current?.abort(), []);
  useEffect(() => {
    if (!open) request.current?.abort();
  }, [open]);
  useEffect(() => {
    if (nearBottom.current && scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, busy, error]);

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
    setAnnouncement("Aestrox is preparing a response.");
    nearBottom.current = true;
    const controller = new AbortController();
    request.current = controller;
    let timedOut = false;
    const timeout = window.setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, 26000);
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
      const result: unknown = await response.json();
      if (
        !result ||
        typeof result !== "object" ||
        !("reply" in result) ||
        typeof result.reply !== "string" ||
        !result.reply.trim()
      )
        throw new Error("No response was received. Please try again.");
      setMessages([...history, { role: "assistant", content: result.reply }]);
      pendingHistory.current = null;
      setAnnouncement("Aestrox has replied.");
    } catch (reason) {
      const message = controller.signal.aborted
        ? timedOut
          ? "The response took too long. Try again or contact our team."
          : "Response stopped. You can retry your question."
        : reason instanceof Error
          ? reason.message
          : "We couldn’t complete that response. Please try again.";
      setError(message);
      setAnnouncement(message);
    } finally {
      window.clearTimeout(timeout);
      request.current = null;
      setBusy(false);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content
          className="chat-panel"
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            inputRef.current?.focus();
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
              const el = scrollRef.current;
              if (el) nearBottom.current = el.scrollHeight - el.scrollTop - el.clientHeight < 70;
            }}
            role="log"
            aria-label="Conversation"
            aria-live="off"
            tabIndex={0}
          >
            <div className="chat-bubble">
              Hi, how can I help? Ask me about Aestrox POS, pricing or getting started.
            </div>
            {messages.map((message, index) => (
              <div className={`chat-bubble ${message.role}`} key={index}>
                <span className="sr-only">{message.role === "user" ? "You" : "Aestrox"}: </span>
                {message.content}
              </div>
            ))}
            {!messages.length && (
              <div className="chat-suggestions">
                {suggestions.map((question) => (
                  <button key={question} onClick={() => void send(question)}>
                    {question}
                  </button>
                ))}
              </div>
            )}
            {busy && (
              <div className="chat-busy">
                <LoaderCircle size={15} className="spin" /> Preparing a response…
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
                className="resize-none"
                ref={inputRef}
                id="chat-question"
                rows={1}
                maxLength={1200}
                value={input}
                onChange={(event) => setInput(event.target.value)}
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
                  <Square size={18} />
                </button>
              ) : (
                <button
                  className="chat-send"
                  type="submit"
                  disabled={!input.trim()}
                  aria-label="Send question"
                >
                  <Send size={18} />
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
