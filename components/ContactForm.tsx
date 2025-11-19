"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import pool from "../lib/neon"; // for API we will call route /api/requests
import { useRouter } from "next/navigation";

const SERVICES = [
  { id: "webDev", label: "Web Development" },
  { id: "dataAnalytics", label: "Data Analytics" },
  { id: "financialAdvisory", label: "Financial Advisory" },
  { id: "softwareProgramming", label: "Software Programming" },
  { id: "webDesign", label: "Web Design" },
  { id: "marketing", label: "Marketing" },
];

export default function ContactFormSplit() {
  const t = useTranslations("contact");
  const [selectedService, setSelectedService] = useState("");
  const [step, setStep] = useState<"choose" | "form">("choose");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    idNumber: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleContinue = () => {
    if (!selectedService) return alert("Please select a service");
    setStep("form");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, serviceId: selectedService }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong");
        setStatus("error");
        return;
      }

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        idNumber: "",
        company: "",
        message: "",
      });
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

        {/* LEFT SIDE */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white rounded-3xl shadow-2xl p-10">
          {step === "choose" && (
            <>
              <h2 className="text-3xl font-bold mb-6 text-[#D4AF37] text-center">Select a Service</h2>
              <select
                className="w-full border border-gray-300 rounded-lg p-3 text-black mb-4"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
              >
                <option value="">Choose your service</option>
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
              <button
                className="bg-yellow-500 text-white py-3 rounded-lg font-semibold shadow-md w-full hover:bg-yellow-600 transition-colors"
                onClick={handleContinue}
              >
                Continue
              </button>
            </>
          )}

          {step === "form" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">Filling info for: {SERVICES.find(s => s.id === selectedService)?.label}</h2>
            </motion.div>
          )}
        </div>

        {/* RIGHT SIDE: FORM */}
        {step === "form" && (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-1/2 bg-white shadow-2xl rounded-3xl p-10 space-y-4 relative z-10 border border-gray-200"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                placeholder="First Name"
                required
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                className="border p-3 rounded"
              />
              <input
                placeholder="Last Name"
                required
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                className="border p-3 rounded"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="email"
                placeholder="Email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="border p-3 rounded"
              />
              <input
                placeholder="Phone"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="border p-3 rounded"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                placeholder="ID Number"
                value={form.idNumber}
                onChange={(e) => setForm({ ...form, idNumber: e.target.value })}
                className="border p-3 rounded"
              />
              <input
                placeholder="Company"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="border p-3 rounded"
              />
            </div>

            <textarea
              placeholder="Message"
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="border p-3 w-full rounded"
            />

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white py-3 rounded-lg font-semibold shadow-xl hover:scale-105 transition-transform"
            >
              {status === "loading" ? "Sending..." : "Submit Request"}
            </button>

            {status === "success" && <p className="text-green-600 text-center">Request sent successfully!</p>}
            {status === "error" && <p className="text-red-600 text-center">{errorMsg}</p>}
          </motion.form>
        )}
      </div>
    </section>
  );
}
