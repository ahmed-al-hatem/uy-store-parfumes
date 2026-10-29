"use client";

import { useId, useState, type FormEvent } from "react";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Underline input with a JOIN text action (DESIGN.md "Newsletter Input"). Mock: nothing is sent. */
export function NewsletterForm() {
  const id = useId();
  const [status, setStatus] = useState<"idle" | "invalid" | "joined">("idle");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email") ?? "").trim();
    setStatus(EMAIL.test(email) ? "joined" : "invalid");
  }

  if (status === "joined") {
    return (
      <p role="status" className="text-body-sm">
        You are on the list. The next letter arrives with the change of season.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <label htmlFor={id} className="sr-only">
        E-mail
      </label>
      <div className="flex items-end gap-13 rounded-input border-b border-soot">
        <input
          id={id}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="E-mail"
          aria-invalid={status === "invalid"}
          aria-describedby={status === "invalid" ? `${id}-error` : undefined}
          className="min-h-touch w-full bg-transparent text-body-sm placeholder:text-soot focus:outline-none"
          onChange={() => status === "invalid" && setStatus("idle")}
        />
        <button type="submit" className="min-h-touch text-body-sm uppercase decoration-1 underline-offset-4 hover:underline">
          Join
        </button>
      </div>
      {status === "invalid" && (
        <p id={`${id}-error`} role="alert" className="pt-7 text-caption">
          Enter an e-mail address like name@example.com.
        </p>
      )}
    </form>
  );
}
