"use client";

import { useState, useEffect, useMemo } from "react";
import Prism from "./Prism";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import LanguageSwitcher from "./LanguageSwitcher";

export default function HeroWithNavbar() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === `/${locale}` || pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = useMemo(
    () => [
      { label: t("navigation.home"), href: "/" },
      { label: t("navigation.services"), href: "#services" },
      { label: t("navigation.contact"), href: "#contact" },
      { label: t("navigation.projects"), href: "/projects" },
      { label: t("navigation.about"), href: "/about" },
    ],
    [t]
  );

  const [activeSection, setActiveSection] = useState<string>(pathname);

  // Scroll listener
  useEffect(() => {
    const container = document.getElementById("scroll-container") || window;

    const handleScroll = () => {
      if (container instanceof Window) {
        setScrolled(window.scrollY > 0);
      } else {
        setScrolled(container.scrollTop > 0);
      }
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation handler
  const goToSection = (href: string) => {
    setActiveSection(href);

    if (href.startsWith("#")) {
      if (isHome) {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(`/${href}`);
      }
    } else {
      router.push(href);
    }

    setMenuOpen(false);
  };

  // Section highlighting on scroll (home only)
  useEffect(() => {
    if (!isHome) return;

    const sectionIds = navItems
      .filter((i) => i.href.startsWith("#"))
      .map((i) => i.href);

    const handleScroll = () => {
      let current = "/";

      for (const id of sectionIds) {
        const element = document.querySelector(id);
        if (!element) continue;

        const top = element.getBoundingClientRect().top;

        if (top <= 200) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome, navItems]);

  return (
    <section className="relative font-sans">
      {/* ================= NAVBAR ================= */}
      <nav
        className={`fixed top-0 left-0 right-4 z-40 px-4 sm:px-6 py-2 sm:py-4 transition-all duration-300 border-transparent
          ${scrolled || !isHome
            ? "bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-xl shadow-lg border-b border-gray-300/40"
            : "bg-transparent"}`}
      >
        <div className="max-w-screen-xl mx-auto flex justify-between items-center gap-2 sm:gap-4">
          {/* Logo */}
          <div
            onClick={() => {
              const container = document.getElementById("scroll-container");
              if (container) {
                container.scrollTo({ top: 0, behavior: "smooth" });
              } else if (pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                router.push("/");
              }
            }}
            className="cursor-pointer flex items-center flex-shrink-0"
          >
            {scrolled || !isHome ? (
              <span className="text-base sm:text-2xl font-bold bg-gradient-to-r from-[#D4AF37] to-yellow-400 bg-clip-text text-transparent whitespace-nowrap">
                Horizon Global Solutions LLC
              </span>
            ) : (
              <Image
                src="/logo-2.png"
                alt="Horizon Global Solutions"
                width={260}
                height={60}
                className="transition-all duration-300 max-w-[160px] sm:max-w-[260px] w-auto h-auto"
              />
            )}
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-5 lg:space-x-8">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href;

              return (
                <li key={index}>
                  <button
                    onClick={() => goToSection(item.href)}
                    className={`relative font-medium transition-all duration-300 text-sm lg:text-base hover:cursor-pointer
                      ${scrolled || !isHome ? "text-gray-800" : "text-white"}
                      ${isActive ? "text-yellow-500 font-bold after:w-full" : ""}
                      after:block after:h-[2px] after:w-0 after:bg-yellow-600 after:transition-all hover:after:w-full`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}

            <li>
              <LanguageSwitcher />
            </li>
          </ul>

          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center gap-2">
            <button
              className={`p-2 rounded-lg transition-all ${scrolled || !isHome
                ? "text-gray-800 hover:bg-white/20"
                : "text-white hover:bg-white/10"
                }`}
              onClick={() => setMenuOpen(true)}
              aria-label="Menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-gradient-to-br from-[#0f0f1e] via-[#1a1a2e] to-[#0f0f1e] backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center overflow-y-auto pt-20">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-lg transition-all text-[#D4AF37] hover:text-yellow-300"
          >
            <X size={32} />
          </button>

          <ul className="space-y-6 mb-12 max-w-sm w-full">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href;
              return (
                <li key={index}>
                  <button
                    onClick={() => goToSection(item.href)}
                    className={`w-full px-6 py-3 rounded-lg font-bold text-lg transition-all ${isActive
                      ? "bg-gradient-to-r from-[#D4AF37] to-yellow-400 text-black shadow-lg shadow-[#D4AF37]/50"
                      : "text-white hover:bg-white/10 border border-white/20 hover:border-[#D4AF37]/50"
                      }`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Language Switcher in Mobile Menu */}
          <div className="border-t border-white/20 pt-6 w-full max-w-sm">
            <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-4">Language</p>
            <div className="flex gap-3">
              {[{ code: 'en', name: 'English', flag: '🇬🇧' }, { code: 'ar', name: 'العربية', flag: '🇸🇦' }].map((lang) => {
                const handleLangChange = (newLocale: string) => {
                  router.push(pathname, { locale: newLocale });
                  setMenuOpen(false);
                };
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleLangChange(lang.code)}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${locale === lang.code
                      ? "bg-gradient-to-r from-[#D4AF37] to-yellow-400 text-black shadow-lg shadow-[#D4AF37]/50"
                      : "bg-white/10 text-white border border-white/20 hover:border-[#D4AF37]/50 hover:bg-white/15"
                      }`}
                  >
                    <span>{lang.flag} {lang.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu language change handler */}

      {/* ================= HERO SECTION ================= */}
      {isHome && (
        <div className="relative h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20">
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <Prism
              colorStops={["#000000", "#FFD700", "#B8860B"]}
              blend={0.5}
              amplitude={1.0}
              speed={0.5}
            />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
          </div>

          {/* HERO TEXT */}
          <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 max-w-xl sm:max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-xl animate-fadeInUp leading-tight">
              {t("hero.title")}
            </h1>

            <p className="mt-3 sm:mt-5 text-sm sm:text-lg text-gray-300 animate-fadeInUp delay-200">
              {t("hero.description")}
            </p>

            <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fadeInUp delay-400">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  goToSection("#contact");
                }}
                className="px-7 sm:px-8 py-3 rounded-full bg-yellow-400 text-white font-semibold shadow-lg hover:bg-yellow-600 transition transform hover:scale-105 text-center text-sm sm:text-base"
              >
                {t("navigation.contact")}
              </a>

              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  goToSection("#services");
                }}
                className="px-7 sm:px-8 py-3 rounded-full border border-white text-white font-semibold hover:bg-white/10 transition transform hover:scale-105 text-center text-sm sm:text-base"
              >
                {t("navigation.services")}
              </a>
            </div>
          </div>

          {/* Animations */}
          <style jsx>{`
            @keyframes fadeInUp {
              0% {
                opacity: 0;
                transform: translateY(20px);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .animate-fadeInUp {
              animation: fadeInUp 0.8s ease forwards;
            }
            .animate-fadeInUp.delay-200 {
              animation-delay: 0.2s;
            }
            .animate-fadeInUp.delay-400 {
              animation-delay: 0.4s;
            }
          `}</style>
        </div>
      )}
    </section>
  );
}
