import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { firstName, lastName, email, message } = await request.json();

  if (!firstName || !lastName || !email || !message) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Contact Form <onboarding@ehann.dev>",
    to: process.env.CONTACT_TO_EMAIL as string,
    replyTo: email,
    subject: `New message from ${firstName} ${lastName}`,
    text: `Name: ${firstName} ${lastName}\nEmail: ${email}\n\n${message}`,
  });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ success: true });
}