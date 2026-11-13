import {
  useState,
  type ChangeEvent,
  type SubmitEvent,
} from "react";
import LiquidChrome from "./LiquidChrome";


interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus("sending");

    try {
      const res = await fetch("/api/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      setFormData({ firstName: "", lastName: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-lg flex-col gap-4"
    >
        <div className="flex flex-row justify-between">
            <label className="flex w-[48%] flex-col gap-1.5 font-medium">
                First name
                <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                autoComplete="given-name"
                className="rounded-md border border-gray-400 px-3 py-2.5 font-normal focus:outline-none focus:ring-2 focus:ring-gray-800"
                />
            </label>

            <label className="flex w-[48%] flex-col gap-1.5 font-medium">
                Last name
                <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                autoComplete="family-name"
                className="rounded-md border border-gray-400 px-3 py-2.5 font-normal focus:outline-none focus:ring-2 focus:ring-gray-800"
                />
            </label>
        </div>

      <label className="flex flex-col gap-1.5 font-medium">
        Email
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="email"
          className="rounded-md border border-gray-400 px-3 py-2.5 font-normal focus:outline-none focus:ring-2 focus:ring-gray-800"
        />
      </label>

      <label className="flex flex-col gap-1.5 font-medium">
        Message
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="resize-y rounded-md border border-gray-400 px-3 py-2.5 font-normal focus:outline-none focus:ring-2 focus:ring-gray-800"
        />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="relative overflow-hidden rounded-md px-4 py-3 font-semibold text-white hover:bg-white/10 transition-colors duration-100 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <div className="absolute -z-1 inset-0"> 
            <LiquidChrome
                color="#48443e"
                speed={0.4}
                amplitude={0.5}
                detail={3}
                thickness={0.90}
                interactive={false}
                frequencyX={2}
                frequencyY={0.3}
                depth={1}
                roughness={0}
                exposure={0.95}
                rippleStrength={2}
                rippleSize={0.75}
                tilt={0.7}
                intro={false}
                lightMode={false}
                style={{ filter: 'blur(2px)' }}
                className="w-screen h-screen"/>
        </div>
        {status === "sending" ? "Sending…" : "Send message"}
      </button>

      <p role="status" aria-live="polite" className="m-0 min-h-5">
        {status === "success" && "Message sent. Thanks for reaching out."}
        {status === "error" &&
          "Your message didn't send. Check your connection and try again."}
      </p>
    </form>
  );
}