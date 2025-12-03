"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function ContactFormSplit() {
  const t = useTranslations("contact");

  const SERVICES = [
    { id: "webDev", label: t("services.webDev") },
    { id: "dataAnalytics", label: t("services.dataAnalytics") },
    { id: "financialAdvisory", label: t("services.financialAdvisory") },
    { id: "softwareProgramming", label: t("services.softwareProgramming") },
    { id: "webDesign", label: t("services.webDesign") },
    { id: "marketing", label: t("services.marketing") }
  ];

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
    if (!selectedService) return alert(t("chooseService"));
    setStep("form");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, serviceId: selectedService })
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(t("error"));
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
        message: ""
      });

      setStatus("success");
    } catch (err) {
      setErrorMsg(t("error"));
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#f7f5ef] font-['Sono'] text-black">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row gap-10">

        {/* LEFT SIDE */}
        <div className="w-full md:w-1/2 bg-white rounded-3xl shadow-2xl p-10 text-center text-black">
          
          <h1 className="text-4xl font-bold mb-4 text-[#D4AF37]">
            {t("title")}
          </h1>
          <p className="mb-6">
            {t("subtitle")}
          </p>

          {step === "choose" && (
            <>
              <h2 className="text-3xl font-bold mb-6 text-[#D4AF37]">
                {t("selectService")}
              </h2>

              <select
                className="w-full border rounded-lg p-3 mb-4 text-black"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
              >
                <option value="">{t("chooseService")}</option>
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>

              <button
                className="bg-yellow-500 text-white py-3 rounded-lg w-full hover:bg-yellow-600"
                onClick={handleContinue}
              >
                {t("continue")}
              </button>
            </>
          )}

          {step === "form" && (
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-bold text-[#D4AF37] mb-4"
            >
              {t("fillingInfoFor")}: {SERVICES.find(s => s.id === selectedService)?.label}
            </motion.h2>
          )}
        </div>

        {/* RIGHT SIDE FORM */}
        {step === "form" && (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full md:w-1/2 bg-white shadow-2xl rounded-3xl p-10 space-y-4 text-black"
          >

            <div className="grid grid-cols-2 gap-4">
              <input
                placeholder={t("firstName")}
                required
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                className="border p-3 rounded text-black"
              />
              <input
                placeholder={t("lastName")}
                required
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                className="border p-3 rounded text-black"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="email"
                placeholder={t("email")}
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="border p-3 rounded text-black"
              />
              <input
                placeholder={t("phone")}
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="border p-3 rounded text-black"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                placeholder={t("idNumber")}
                value={form.idNumber}
                onChange={(e) => setForm({ ...form, idNumber: e.target.value })}
                className="border p-3 rounded text-black"
              />
              <input
                placeholder={t("company")}
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="border p-3 rounded text-black"
              />
            </div>

            <textarea
              placeholder={t("message")}
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="border p-3 w-full rounded text-black"
            />

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600"
            >
              {status === "loading" ? t("sending") : t("submit")}
            </button>

            {status === "success" && <p className="text-green-600 text-center">{t("success")}</p>}
            {status === "error" && <p className="text-red-600 text-center">{t("error")}</p>}
          </motion.form>
        )}
      </div>
    </section>
  );
}
