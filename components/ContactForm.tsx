// src/components/ContactForm.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';

export default function ContactForm() {
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
      {/* Animated background frame */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute inset-0 border-4 border-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-3xl pointer-events-none animate-pulse-slow"
      />

      <div className="relative max-w-xl mx-auto px-6 z-10">
        <h2 className="text-4xl font-extrabold text-center text-[#D4AF37] mb-4">
          {t('title')}
        </h2>
        <p className="text-center text-gray-600 mb-10">
          {t('subtitle')}
        </p>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white shadow-2xl rounded-3xl p-10 space-y-5 relative z-10 border border-gray-200"
        >
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

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(0.98); }
          50% { opacity: 0.6; transform: scale(1.02); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
