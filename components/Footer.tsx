"use client";

import { Link } from "@/i18n/routing";
import { Mail, MapPin, Phone, Linkedin, Facebook, Twitter } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  return (
    <footer
      id="footer"
      className="relative bg-gradient-to-b from-[#0b0b0b] via-[#111111] to-[#0b0b0b] text-gray-300 pt-20 pb-10 font-['Sono'] overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#D4AF37]/10 blur-3xl rounded-full -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none -z-10" />

      {/* Main Content */}
      <div className={`max-w-7xl mx-auto px-6 grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-12 border-b border-[#D4AF37]/20 pb-14 ${locale === "ar" ? "text-right" : "text-left"}`}>
        {/* Company Info */}
        <div className="lg:col-span-2">
          <h3 className="text-2xl font-bold text-[#D4AF37] mb-4">
            {t("companyName")}
          </h3>
          <p className="text-sm leading-relaxed text-gray-400 max-w-sm mb-6">
            {t("description")}
          </p>

          {/* Social Media */}
          <div className="flex gap-5 mt-4">
            <a
              href="#"
              className="p-2 rounded-full border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors"
            >
              <Linkedin size={18} className="text-[#D4AF37]" />
            </a>
            <a
              href="#"
              className="p-2 rounded-full border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors"
            >
              <Facebook size={18} className="text-[#D4AF37]" />
            </a>
            <a
              href="#"
              className="p-2 rounded-full border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors"
            >
              <Twitter size={18} className="text-[#D4AF37]" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-[#D4AF37] mb-4">
            {t("companyLinks")}
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about" className="hover:text-[#D4AF37] transition-colors">
                {t("team")}
              </Link>
            </li>
            <li>
              <a href="#services" className="hover:text-[#D4AF37] transition-colors">
                {t("services")}
              </a>
            </li>
            <li>
              <Link href="/projects" className="hover:text-[#D4AF37] transition-colors">
                {t("portfolio")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info & Newsletter */}
        <div>
          <h4 className="text-lg font-semibold text-[#D4AF37] mb-4">
            {t("getInTouch")}
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <MapPin size={16} className="text-[#D4AF37]" />
              <span>{t("address")}</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-[#D4AF37]" />
              <a href="mailto:info@horizonglobalsolutions.com" className="hover:text-[#D4AF37] transition-colors">
                info@horizonglobalsolutions.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-[#D4AF37]" />
              <span>{t("phone")}</span>
            </li>
          </ul>

          {/* Newsletter */}
          <div className="mt-6">
            <p className="text-sm mb-2 text-gray-400">{t("newsletter")}</p>
            <form className="flex bg-[#1a1a1a] rounded-lg overflow-hidden border border-[#D4AF37]/20 focus-within:border-[#D4AF37] transition">
              <input
                type="email"
                placeholder={t("emailPlaceholder")}
                className="w-full bg-transparent px-3 py-2 text-sm text-gray-200 outline-none"
              />
              <button
                type="submit"
                className="bg-[#D4AF37] text-black px-4 font-semibold hover:bg-[#e0c562] transition"
              >
                {t("subscribe")}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 text-center text-xs text-gray-500 tracking-wide">
        <p>
          {t("copyright")}
        </p>
      </div>
    </footer>
  );
}
