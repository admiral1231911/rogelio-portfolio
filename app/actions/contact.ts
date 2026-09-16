"use server";

import * as z from "zod";
import { notifyNewInquiry } from "@/lib/email";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.email("Please enter a valid email address.").max(200),
  message: z.string().trim().min(10, "Say a little more — a few sentences is plenty.").max(4000),
});

export interface ContactFormState {
  status: "idle" | "success" | "error";
  errors?: Partial<Record<"name" | "email" | "message", string[]>>;
  message?: string;
}

export async function submitContactInquiry(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Honeypot: hidden from humans via CSS, bots fill it in.
  if ((formData.get("company") as string | null)?.trim()) {
    return { status: "error", message: "Your message could not be sent." };
  }

  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { status: "error", errors: z.flattenError(parsed.error).fieldErrors };
  }

  const result = await notifyNewInquiry(parsed.data);
  if (!result.ok) {
    return {
      status: "error",
      message: "Something went wrong sending that. Please email ibacarrajr.rogelio@gmail.com directly.",
    };
  }

  return { status: "success", message: "Thanks — that landed in my inbox. I'll get back to you soon." };
}
