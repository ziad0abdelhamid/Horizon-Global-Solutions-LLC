// src/components/Contact.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", form);
  };

  return (
    <section
      id="contact"
      className="relative py-32 bg-[#faf8f4] text-black font-['Sono'] overflow-hidden"
    >
      {/* Decorative Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fff7e8]/60 to-[#faf8f4]" />

      <div className="relative container mx-auto px-6 z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#D4AF37] drop-shadow-lg">
            Get in Touch
          </h2>
          <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
            Let’s build something great together. Reach out and we’ll get back
            to you as soon as possible.
          </p>
          <div className="w-16 h-1 bg-[#D4AF37] mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="relative bg-white/90 backdrop-blur-md shadow-xl border border-[#e6d8b5] rounded-2xl p-10 max-w-2xl mx-auto"
        >
          <div className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-[#e6d8b5] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/70 transition"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-[#e6d8b5] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/70 transition"
              required
            />
            <textarea
              placeholder="Your Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-[#e6d8b5] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/70 transition resize-none"
              rows={5}
              required
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="mt-8 w-full bg-gradient-to-r from-[#D4AF37] to-[#b8922a] text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
          >
            Send Message
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
