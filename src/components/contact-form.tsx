import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { Check, LoaderCircle } from "lucide-react";
import { site, type Enquiry } from "@/data/site";

export function ContactForm({ enquiry = { kind: "contact" } }: { enquiry?: Enquiry }) {
  const id = useId();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [failure, setFailure] = useState("");
  const controller = useRef<AbortController | null>(null);
  const busy = useRef(false);
  const successRef = useRef<HTMLDivElement>(null);
  useEffect(() => () => controller.current?.abort(), []);
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const invalid: Record<string, string> = {};
    if (!String(data.get("name") ?? "").trim()) invalid["name"] = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.get("email") ?? "").trim()))
      invalid["email"] = "Enter a valid email address.";
    if (!String(data.get("business") ?? "").trim())
      invalid["business"] = "Enter your business name.";
    if (!data.get("privacy-consent"))
      invalid["privacy-consent"] = "Please allow us to respond to your enquiry.";
    setErrors(invalid);
    if (Object.keys(invalid).length) {
      (form.elements.namedItem(Object.keys(invalid)[0]!) as HTMLElement)?.focus();
      return;
    }
    // A dev server can return 200 for an arbitrary POST; that is not delivery.
    if (
      ["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname) &&
      window.location.port !== "8888"
    ) {
      setFailure(
        "This is a local preview; your details have not been sent. Use the email link below to contact us.",
      );
      setStatus("error");
      return;
    }
    busy.current = true;
    setStatus("sending");
    controller.current = new AbortController();
    const timeout = window.setTimeout(() => controller.current?.abort(), 20000);
    try {
      const body = new URLSearchParams();
      data.forEach((value, key) => body.set(key, String(value).trim()));
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
        signal: controller.current.signal,
      });
      if (!response.ok) throw new Error("Submission not confirmed");
      form.reset();
      setStatus("success");
    } catch {
      setFailure(
        "We could not confirm your enquiry was received. Your details are still here. Try again or email us.",
      );
      setStatus("error");
    } finally {
      window.clearTimeout(timeout);
      busy.current = false;
      controller.current = null;
    }
  }

  if (status === "success")
    return (
      <div className="form-success" role="status" tabIndex={-1} ref={successRef}>
        <span className="success-symbol">
          <Check size={24} />
        </span>
        <h3>
          {enquiry.kind === "trial"
            ? "We’ve received your trial request."
            : "We’ve received your enquiry."}
        </h3>
        <p>Thanks for getting in touch. Our team will reply using the details you shared.</p>
        <button className="text-link" onClick={() => setStatus("idle")}>
          Send another enquiry
        </button>
      </div>
    );

  const fieldProps = (name: string) => ({
    id: `${id}-${name}`,
    name,
    "aria-labelledby": `${id}-${name}-label`,
    "aria-invalid": !!errors[name],
    "aria-describedby": errors[name] ? `${id}-${name}-error` : undefined,
  });
  const error = (name: string) =>
    errors[name] ? (
      <span id={`${id}-${name}-error`} className="field-error">
        {errors[name]}
      </span>
    ) : null;
  return (
    <form
      className="enquiry-form"
      name="aestrox-enquiry"
      method="POST"
      action="/thanks"
      noValidate
      onSubmit={submit}
      aria-busy={status === "sending"}
    >
      <input type="hidden" name="form-name" value="aestrox-enquiry" />
      <input type="hidden" name="enquiry" value={enquiry.kind} />
      <input type="hidden" name="billing-period" value={enquiry.billingPeriod ?? ""} />
      <p className="honeypot" aria-hidden="true">
        <label>
          Leave empty
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <div className="form-grid">
        <label htmlFor={`${id}-name`}>
          <span id={`${id}-name-label`}>Your name</span>
          <input
            {...fieldProps("name")}
            autoComplete="name"
            maxLength={100}
            placeholder="Full name"
            required
          />
          {error("name")}
        </label>
        <label htmlFor={`${id}-email`}>
          <span id={`${id}-email-label`}>Email address</span>
          <input
            {...fieldProps("email")}
            type="email"
            autoComplete="email"
            maxLength={180}
            placeholder="you@yourbusiness.com"
            required
          />
          {error("email")}
        </label>
        <label htmlFor={`${id}-business`}>
          <span id={`${id}-business-label`}>Business name</span>
          <input
            {...fieldProps("business")}
            autoComplete="organization"
            maxLength={140}
            placeholder="Your café or business"
            required
          />
          {error("business")}
        </label>
        <label htmlFor={`${id}-phone`}>
          <span id={`${id}-phone-label`}>
            Phone <span className="optional">Optional</span>
          </span>
          <input
            {...fieldProps("phone")}
            type="tel"
            autoComplete="tel"
            maxLength={30}
            placeholder="Include country code"
          />
        </label>
        <label className="field-full" htmlFor={`${id}-message`}>
          <span id={`${id}-message-label`}>
            Anything you’d like us to know? <span className="optional">Optional</span>
          </span>
          <textarea
            {...fieldProps("message")}
            rows={3}
            maxLength={2000}
            placeholder="Your locations, current setup, or what you’re looking for."
          />
        </label>
      </div>
      <div>
        <label className="checkbox-field" htmlFor={`${id}-privacy-consent`}>
          <input {...fieldProps("privacy-consent")} type="checkbox" value="agreed" required />
          <span id={`${id}-privacy-consent-label`}>
            You may use my details to respond to this enquiry. See the{" "}
            <Link to="/privacy">Privacy policy</Link>.
          </span>
        </label>
        {error("privacy-consent")}
      </div>
      {status === "error" && (
        <p className="form-error" role="alert">
          {failure} <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
      )}
      <button
        className="button button-primary form-submit"
        disabled={status === "sending"}
        type="submit"
      >
        {status === "sending" ? (
          <>
            Sending enquiry <LoaderCircle className="spin" size={18} />
          </>
        ) : (
          <>{enquiry.kind === "trial" ? "Request my free trial" : "Send enquiry"}</>
        )}
      </button>
    </form>
  );
}
