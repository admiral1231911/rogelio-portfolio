import { Resend } from "resend";

const OWNER_EMAIL = "ibacarrajr.rogelio@gmail.com";

/**
 * Without RESEND_API_KEY the app still works end-to-end — the inquiry is
 * just logged instead of emailed. That keeps local/preview environments
 * functional without secrets, matching the pattern used on rj-car-rental.
 */
export async function notifyNewInquiry(input: {
  name: string;
  email: string;
  message: string;
}) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.MAIL_FROM?.trim() || "onboarding@resend.dev";

  if (!apiKey) {
    console.log("[email] RESEND_API_KEY not set — logging inquiry instead of sending:", input);
    return { ok: true as const, sent: false as const };
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: `Portfolio inquiry <${from}>`,
      to: OWNER_EMAIL,
      replyTo: input.email,
      subject: `New portfolio inquiry from ${input.name}`,
      text: `From: ${input.name} <${input.email}>\n\n${input.message}`,
    });
    return { ok: true as const, sent: true as const };
  } catch (error) {
    console.error("[email] Failed to send inquiry notification:", error);
    return { ok: false as const, sent: false as const };
  }
}
