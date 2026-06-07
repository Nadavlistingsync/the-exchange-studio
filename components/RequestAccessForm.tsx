"use client";

import { FormEvent, useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export function RequestAccessForm({ id }: { id?: string }) {
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/request-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          company: data.get("company"),
          role: data.get("role"),
          email: data.get("email"),
        }),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Something went wrong.");
      }

      setState("success");
      form.reset();
    } catch (err) {
      setState("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong."
      );
    }
  }

  return (
    <section id={id || "request-access"} className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="fade-in mb-12 max-w-2xl">
          <p className="mb-4 text-xs font-extralight tracking-[0.25em] uppercase text-white/50">
            Request Access
          </p>
          <h2 className="text-3xl font-extralight tracking-tight text-white md:text-4xl">
            Join the waitlist.
          </h2>
          <p className="mt-4 text-sm font-extralight leading-relaxed text-white/50">
            The Exchange is invitation-only. Submit your details and we will
            review your request.
          </p>
        </div>

        {state === "success" ? (
          <div className="fade-in max-w-xl border border-white/20 p-8">
            <p className="text-lg font-extralight text-white">
              Request received.
            </p>
            <p className="mt-2 text-sm font-extralight text-white/50">
              We will be in touch if there is a fit.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="fade-in fade-in-delay-1 grid max-w-xl gap-6"
          >
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-xs font-extralight tracking-wide text-white/50"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full border border-white/20 bg-transparent px-4 py-3 text-sm font-extralight text-white outline-none transition-colors focus:border-white/50"
              />
            </div>
            <div>
              <label
                htmlFor="company"
                className="mb-2 block text-xs font-extralight tracking-wide text-white/50"
              >
                Company
              </label>
              <input
                id="company"
                name="company"
                type="text"
                required
                className="w-full border border-white/20 bg-transparent px-4 py-3 text-sm font-extralight text-white outline-none transition-colors focus:border-white/50"
              />
            </div>
            <div>
              <label
                htmlFor="role"
                className="mb-2 block text-xs font-extralight tracking-wide text-white/50"
              >
                Role
              </label>
              <input
                id="role"
                name="role"
                type="text"
                required
                className="w-full border border-white/20 bg-transparent px-4 py-3 text-sm font-extralight text-white outline-none transition-colors focus:border-white/50"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-extralight tracking-wide text-white/50"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full border border-white/20 bg-transparent px-4 py-3 text-sm font-extralight text-white outline-none transition-colors focus:border-white/50"
              />
            </div>
            {state === "error" && (
              <p className="text-sm font-extralight text-red-400/80">
                {errorMessage}
              </p>
            )}
            <button
              type="submit"
              disabled={state === "submitting"}
              className="w-fit border border-white px-8 py-3 text-xs font-light tracking-[0.2em] uppercase transition-colors hover:bg-white hover:text-black disabled:opacity-50"
            >
              {state === "submitting" ? "Submitting..." : "Request Access"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
