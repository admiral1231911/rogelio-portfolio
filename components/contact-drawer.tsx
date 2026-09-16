"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Drawer } from "vaul";
import { submitContactInquiry, type ContactFormState } from "@/app/actions/contact";

const EMPTY: ContactFormState = { status: "idle" };

function FieldError({ messages }: { messages?: string[] }) {
  if (!messages?.length) return null;
  return (
    <p className="mt-1 text-xs font-medium text-danger" role="alert">
      {messages[0]}
    </p>
  );
}

const inputClass =
  "w-full rounded-lg border border-border-strong bg-surface px-3 py-2.5 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted hover:border-accent focus:border-accent focus:outline-none";
const labelClass = "text-xs font-semibold uppercase tracking-wide text-muted";

export function ContactDrawer({ children }: { children: React.ReactNode }) {
  const [state, formAction, pending] = useActionState(submitContactInquiry, EMPTY);
  const formRef = useRef<HTMLFormElement>(null);
  // Controlled explicitly: a server action re-render must never reset this
  // (an uncontrolled Drawer.Root can lose its open state across the RSC
  // refresh a server action triggers).
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <Drawer.Root direction="right" open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>{children}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-foreground/20" />
        <Drawer.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-surface p-6 outline-none sm:p-8">
          <Drawer.Title className="text-lg font-semibold">Get in touch</Drawer.Title>
          <Drawer.Description className="mt-1 text-sm text-muted">
            Reach out about SDET / QA automation roles, or just to say hello.
          </Drawer.Description>

          {state.status === "success" ? (
            <p className="mt-6 rounded-lg bg-live-soft px-4 py-3 text-sm font-medium text-live" role="status">
              {state.message}
            </p>
          ) : (
            <form ref={formRef} action={formAction} className="mt-6 flex flex-1 flex-col gap-4" noValidate>
              <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="company">Company</label>
                <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div>
                <label htmlFor="name" className={labelClass}>
                  Name
                </label>
                <input id="name" name="name" type="text" required className={`mt-1.5 ${inputClass}`} />
                <FieldError messages={state.errors?.name} />
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>
                  Email
                </label>
                <input id="email" name="email" type="email" required className={`mt-1.5 ${inputClass}`} />
                <FieldError messages={state.errors?.email} />
              </div>

              <div className="flex flex-1 flex-col">
                <label htmlFor="message" className={labelClass}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className={`mt-1.5 flex-1 resize-none ${inputClass}`}
                  placeholder="What role or opportunity did you have in mind?"
                />
                <FieldError messages={state.errors?.message} />
              </div>

              {state.status === "error" && state.message ? (
                <p className="text-xs font-medium text-danger" role="alert">
                  {state.message}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={pending}
                className="mt-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover disabled:opacity-60"
              >
                {pending ? "Sending…" : "Send message"}
              </button>
            </form>
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
