"use client";

import { useId, useState, type FormEvent } from "react";
import { InputField, SelectField } from "@/components/checkout/Field";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Mock contact form: validates, pretends to send, says what happens next. */
export function ContactForm() {
  const id = useId();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    if (!String(data.get("name") ?? "").trim()) next.name = "Enter your name.";
    if (!EMAIL.test(String(data.get("email") ?? "").trim())) next.email = "Enter an email address like name@example.com.";
    if (String(data.get("message") ?? "").trim().length < 10) next.message = "Write a little more so we can help, at least 10 characters.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setState("sending");
    await new Promise((r) => setTimeout(r, 900));
    setState("sent");
  }

  if (state === "sent") {
    return (
      <p role="status" className="text-body">
        Thank you. Your message is with the studio, and a person will answer within one working day.
      </p>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="flex max-w-[560px] flex-col gap-13">
      <InputField label="Name" name="name" autoComplete="name" error={errors.name} />
      <InputField label="E-mail" name="email" type="email" autoComplete="email" error={errors.email} />
      <SelectField label="About" name="topic" defaultValue="advice">
        <option value="advice">Choosing a fragrance</option>
        <option value="order">An order</option>
        <option value="visit">Visiting the studio</option>
        <option value="other">Something else</option>
      </SelectField>
      <div>
        <label htmlFor={`${id}-msg`} className="block pb-6 text-caption uppercase">
          Message
        </label>
        <textarea
          id={`${id}-msg`}
          name="message"
          rows={6}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? `${id}-err` : undefined}
          className="block w-full rounded-input border border-soot bg-transparent p-12 text-body-sm aria-[invalid=true]:border-2"
        />
        {errors.message && (
          <p id={`${id}-err`} role="alert" className="pt-4 text-caption">
            {errors.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={state === "sending"}
        className="mt-7 min-h-[52px] bg-graphite px-16 text-body-sm text-chalk transition-transform duration-[var(--duration-fast)] active:translate-y-px disabled:opacity-60"
      >
        {state === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
