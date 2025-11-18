"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';

export default function ContactFormSplit() {
  const t = useTranslations('contact');
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
    <section id="contact" className="py-24 bg-[#f7f5ef] font-['Sono'] relative overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-6 z-10 flex flex-col md:flex-row gap-10">
        
        {/* ================= Left Half: Dropdown / Placeholder ================= */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white rounded-3xl shadow-2xl p-10">
          <h2 className="text-3xl font-bold mb-6 text-[#D4AF37] text-center">
            Select a Service
          </h2>
          <select className="w-full border border-gray-300 rounded-lg p-3 text-black mb-4">
            <option>Service 1</option>
            <option>Service 2</option>
            <option>Service 3</option>
          </select>
          <button className="bg-yellow-500 text-white py-3 rounded-lg font-semibold shadow-md w-full hover:bg-yellow-600 transition-colors">
            Go to Pricing
          </button>
        </div>

        {/* ================= Right Half: Contact Form ================= */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full md:w-1/2 bg-white shadow-2xl rounded-3xl p-10 space-y-5 relative z-10 border border-gray-200"
        >
          <h2 className="text-3xl font-bold mb-4 text-[#D4AF37] text-center">Contact Us</h2>
          <input
            type="text"
            placeholder={t('namePlaceholder')}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] placeholder-black placeholder-opacity-80 text-black"
            required
          />
          <input
            type="email"
            placeholder={t('emailPlaceholder')}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] placeholder-black placeholder-opacity-80 text-black"
            required
          />
          <textarea
            placeholder={t('messagePlaceholder')}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] placeholder-black placeholder-opacity-80 text-black"
            rows={5}
            required
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white py-3 rounded-lg font-semibold shadow-xl hover:scale-105 transition-transform cursor-pointer"
            disabled={status === "loading"}
          >
            {status === "loading" ? t('sending') : t('send')}
          </button>

          {status === "success" && (
            <p className="text-green-600 text-center mt-4 font-medium">
              {t('success')}
            </p>
          )}
          {status === "error" && (
            <p className="text-red-600 text-center mt-4 font-medium">{errorMsg}</p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
