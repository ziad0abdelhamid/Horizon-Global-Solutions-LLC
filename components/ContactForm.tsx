// src/components/ContactForm.tsx
"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong");
        setStatus("error");
        return;
      }

      setForm({ name: "", email: "", message: "" });
      setStatus("success");
    } catch (err) {
      console.error(err);
      setErrorMsg("Something went wrong");
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#f7f5ef] font-['Sono']">
      <div className="max-w-xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center text-[#D4AF37] mb-4">
          Contact Us
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Let’s build something great together. Reach out to our team and we’ll get back to you shortly.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-10 space-y-5"
        >
          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            required
          />
          <textarea
            placeholder="Your Message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            rows={5}
            required
          />

          <button
            type="submit"
            className="w-full bg-[#D4AF37] text-white py-3 rounded-lg font-semibold hover:bg-[#b8912f] transition"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>

          {status === "success" && (
            <p className="text-green-600 text-center mt-4">Message sent successfully!</p>
          )}
          {status === "error" && (
            <p className="text-red-600 text-center mt-4">{errorMsg}</p>
          )}
        </form>
      </div>
    </section>
  );
}
