"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Mail, Phone, User, Building, MessageSquare, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactFormSplit() {
  const t = useTranslations("contact");

  const SERVICES = [
    { id: "webDev", label: t("services.webDev") },
    { id: "dataAnalytics", label: t("services.dataAnalytics") },
    { id: "financialAdvisory", label: t("services.financialAdvisory") },
    { id: "softwareProgramming", label: t("services.softwareProgramming") },
    { id: "webDesign", label: t("services.webDesign") },
    { id: "marketing", label: t("services.marketing") },
    { id: "videoEditing", label: t("services.videoEditing") }
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

      const response = await res.json();
      if (!res.ok) {
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
    } catch (_err) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-[#0f0f1e] via-[#1a1a2e] to-[#0f0f1e] font-['Sono'] text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl sm:text-6xl font-bold mb-4 bg-gradient-to-r from-[#D4AF37] to-yellow-300 bg-clip-text text-transparent">
            {t("title")}
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* LEFT SIDE - Service Selection */}
          <AnimatePresence mode="wait">
            {step === "choose" && (
              <motion.div
                key="choose"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 sm:p-10 border border-white/20 shadow-2xl"
              >
                <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-[#D4AF37]">
                  {t("selectService")}
                </h2>
                <p className="text-gray-300 mb-8">Choose the service that best fits your needs</p>

                <div className="space-y-3">
                  {SERVICES.map((service) => (
                    <motion.button
                      key={service.id}
                      whileHover={{ scale: 1.02, x: 8 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedService(service.id)}
                      className={`w-full p-4 rounded-lg text-left transition-all cursor-pointer border-2 ${selectedService === service.id
                        ? "border-[#D4AF37] bg-[#D4AF37]/20 text-[#D4AF37] shadow-lg shadow-[#D4AF37]/50"
                        : "border-white/20 bg-white/5 text-gray-300 hover:border-[#D4AF37]/50 hover:bg-white/10"
                        }`}
                    >
                      <div className="font-semibold">{service.label}</div>
                    </motion.button>
                  ))}</div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleContinue}
                  disabled={!selectedService}
                  className="w-full cursor-pointer mt-8 bg-gradient-to-r from-[#D4AF37] to-yellow-400 text-black font-bold py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-[#D4AF37]/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t("continue")}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* RIGHT SIDE - Form */}
          <AnimatePresence mode="wait">
            {step === "form" && (
              <div className="space-y-8">
                <motion.div
                  key="form-header"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center lg:text-left"
                >
                  <h2 className="text-2xl font-bold text-[#D4AF37] mb-2">
                    {t("fillingInfoFor")}:
                  </h2>
                  <p className="text-lg text-gray-300">{SERVICES.find(s => s.id === selectedService)?.label}</p>
                </motion.div>

                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 sm:p-10 border border-white/20 shadow-2xl space-y-5"
                >
                  {/* First Name & Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-5 h-5 text-[#D4AF37] pointer-events-none" />
                      <input
                        placeholder={t("firstName")}
                        required
                        value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        className="w-full bg-white/10 border border-white/20 rounded-lg p-3 pl-10 text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:bg-white/15 transition-all"
                      />
                    </div>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-5 h-5 text-[#D4AF37] pointer-events-none" />
                      <input
                        placeholder={t("lastName")}
                        required
                        value={form.lastName}
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                        className="w-full bg-white/10 border border-white/20 rounded-lg p-3 pl-10 text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:bg-white/15 transition-all"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-5 h-5 text-[#D4AF37] pointer-events-none" />
                      <input
                        type="email"
                        placeholder={t("email")}
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-white/10 border border-white/20 rounded-lg p-3 pl-10 text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:bg-white/15 transition-all"
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-5 h-5 text-[#D4AF37] pointer-events-none" />
                      <input
                        placeholder={t("phone")}
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-white/10 border border-white/20 rounded-lg p-3 pl-10 text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:bg-white/15 transition-all"
                      />
                    </div>
                  </div>

                  {/* ID Number & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <div className="relative">
                      <Building className="absolute left-3 top-3 w-5 h-5 text-[#D4AF37] pointer-events-none" />
                      <input
                        placeholder={t("company")}
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        className="w-full bg-white/10 border border-white/20 rounded-lg p-3 pl-10 text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:bg-white/15 transition-all"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-[#D4AF37] pointer-events-none" />
                    <textarea
                      placeholder={t("message")}
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-white/10 border border-white/20 rounded-lg p-3 pl-10 text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:bg-white/15 transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-gradient-to-r cursor-pointer from-[#D4AF37] to-yellow-400 text-black font-bold py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-[#D4AF37]/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {status === "loading" ? t("sending") : t("submit")}
                  </motion.button>

                  {/* Status Messages */}
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300"
                    >
                      <CheckCircle className="w-5 h-5 flex-shrink-0" />
                      {t("success")}
                    </motion.div>
                  )}
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300"
                    >
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      {t("error")}
                    </motion.div>
                  )}
                </motion.form>
              </div>
            )}
          </AnimatePresence>

          {/* Show left side for form step on desktop */}
          {step === "form" && (
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden lg:block bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-10 border border-white/20 shadow-2xl"
            >
              <h3 className="text-3xl font-bold text-[#D4AF37] mb-8">Why Choose Us?</h3>
              <div className="space-y-6 text-gray-300">
                <div>
                  <h4 className="text-[#D4AF37] font-semibold mb-2">Expert Team</h4>
                  <p>Our experienced professionals are dedicated to delivering excellence.</p>
                </div>
                <div>
                  <h4 className="text-[#D4AF37] font-semibold mb-2">Fast Response</h4>
                  <p>We prioritize your inquiries and respond promptly.</p>
                </div>
                <div>
                  <h4 className="text-[#D4AF37] font-semibold mb-2">Custom Solutions</h4>
                  <p>Tailored approaches designed specifically for your needs.</p>
                </div>
                <div>
                  <h4 className="text-[#D4AF37] font-semibold mb-2">Support</h4>
                  <p>We&apos;re here to support you every step of the way.</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
