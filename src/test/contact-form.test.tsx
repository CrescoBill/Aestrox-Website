// @vitest-environment-options {"url":"https://aestrox.com"}
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ContactForm } from "@/components/contact-form";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ to, children }: { to: string; children: ReactNode }) => <a href={to}>{children}</a>,
}));
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
function fill() {
  fireEvent.change(screen.getByLabelText("Your name"), { target: { value: "Test visitor" } });
  fireEvent.change(screen.getByLabelText("Email address"), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Business name"), { target: { value: "Sample café" } });
  fireEvent.click(screen.getByRole("checkbox"));
}
describe("Website enquiries", () => {
  it("records a trial request without claiming an account was created", async () => {
    const fetch = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetch);
    render(<ContactForm enquiry={{ kind: "trial" }} />);
    fill();
    fireEvent.click(screen.getByRole("button", { name: "Request my free trial" }));
    expect(await screen.findByRole("status")).toHaveTextContent("trial request");
    const payload = new URLSearchParams(fetch.mock.calls[0]![1].body);
    expect(payload.get("enquiry")).toBe("trial");
  });
  it("focuses the invalid field without changing its accessible name or submitting", () => {
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    render(<ContactForm />);
    fireEvent.click(screen.getByRole("button", { name: "Send enquiry" }));
    expect(screen.getByLabelText("Your name")).toHaveFocus();
    expect(screen.getByLabelText("Your name")).toHaveAttribute("aria-invalid", "true");
    expect(fetch).not.toHaveBeenCalled();
  });
  it("sends encoded Netlify fields and confirms only an accepted response", async () => {
    const fetch = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetch);
    render(<ContactForm enquiry={{ kind: "pricing", billingPeriod: "Annual" }} />);
    fill();
    fireEvent.click(screen.getByRole("button", { name: "Send enquiry" }));
    expect(await screen.findByRole("status")).toHaveTextContent("We’ve received your enquiry.");
    const payload = new URLSearchParams(fetch.mock.calls[0]![1].body);
    expect(fetch.mock.calls[0]![0]).toBe("/__forms.html");
    expect(payload.get("form-name")).toBe("aestrox-enquiry");
    expect(payload.get("billing-period")).toBe("Annual");
    expect(payload.get("business")).toBe("Sample café");
    expect(screen.getByRole("status")).toHaveFocus();
  });
  it("preserves values on failure and allows retry", async () => {
    const fetch = vi.fn().mockResolvedValueOnce({ ok: false }).mockResolvedValueOnce({ ok: true });
    vi.stubGlobal("fetch", fetch);
    render(<ContactForm />);
    fill();
    fireEvent.click(screen.getByRole("button", { name: "Send enquiry" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("could not confirm");
    expect(screen.getByLabelText("Business name")).toHaveValue("Sample café");
    fireEvent.click(screen.getByRole("button", { name: "Send enquiry" }));
    await screen.findByRole("status");
    expect(fetch).toHaveBeenCalledTimes(2);
  });
  it("blocks duplicate submissions while a request is in flight", async () => {
    let resolve!: (value: { ok: boolean }) => void;
    const fetch = vi.fn(
      () =>
        new Promise<{ ok: boolean }>((done) => {
          resolve = done;
        }),
    );
    vi.stubGlobal("fetch", fetch);
    const { container } = render(<ContactForm />);
    fill();
    fireEvent.submit(container.querySelector("form")!);
    fireEvent.submit(container.querySelector("form")!);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: "Sending enquiry" })).toBeDisabled();
    resolve({ ok: true });
    await waitFor(() => expect(screen.getByRole("status")).toBeInTheDocument());
  });
});
