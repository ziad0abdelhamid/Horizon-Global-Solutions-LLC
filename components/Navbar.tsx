"use client";

import { useState, useEffect, useMemo } from "react";
import Prism from "./Prism";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import LanguageSwitcher from './LanguageSwitcher';

export default function HeroWithNavbar() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === `/${locale}` || pathname === '/';

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = useMemo(() => [
    { label: t('navigation.home'), href: "/" },
    { label: t('navigation.services'), href: "#services" },
    { label: t('navigation.contact'), href: "#contact" },
    { label: t('navigation.projects'), href: "/projects" },
    { label: t('navigation.about'), href: "/about" },
  ], [t]);
  // ⭐ Active section state
  const [activeSection, setActiveSection] = useState<string>(pathname);

  // Navbar scroll shadow
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
  }, [navItems]);

  // ⭐ Update activeSection when clicking an item
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

  // ⭐ Scroll-based active section detection on homepage
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

        if (top <= 180) {
          current = id;
        }
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  return (
    <section className="relative font-sans">
      {/* ================= NAVBAR ================= */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 transition-all duration-300 ${
          scrolled || !isHome ? "bg-white/95 shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
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
          className="cursor-pointer"
         >
          {scrolled || !isHome ? (
            <span className="text-xl sm:text-2xl font-bold text-gray-800">
              Horizon Global Solutions
            </span>
          ) : (
            <Image
              src="/logo-2.png"
              alt="Horizon Global Solutions"
              width={400}
              height={100}
              className="transition-all duration-300 max-w-[300px] sm:max-w-[300px]"
            />
          )}
         </div>
          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 lg:space-x-8">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href;

              return (
                <li key={index}>
                  <button
                    onClick={() => goToSection(item.href)}
                    className={`relative inline-block font-medium transition-all duration-300
                      ${scrolled || !isHome ? "text-gray-800" : "text-white"}
                      ${isActive ? "text-yellow-500 font-bold after:w-full" : ""}
                      hover:scale-105 hover:drop-shadow-lg
                      after:content-[''] after:block after:h-[2px] after:w-0 after:bg-yellow-600 after:transition-all after:duration-300 hover:after:w-full cursor-pointer`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Mobile Menu: Language Switcher + Hamburger */}
          <div className="md:hidden flex items-center" style={{ gap: '0.75rem' }}>
            {/* Language Switcher for Mobile */}
            <div>
              <LanguageSwitcher />
            </div>
            
            {/* Mobile Hamburger */}
            <button
              className={`transition-colors z-50 ${
                scrolled || !isHome ? "text-gray-800" : "text-white"
              }`}
              onClick={() => setMenuOpen(true)}
              aria-label="Toggle menu"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center text-center transition-all">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 text-white"
            aria-label="Close menu"
          >
            <X size={36} />
          </button>

          <ul className="space-y-8">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href;

              return (
                <li key={index}>
                  <button
                    onClick={() => goToSection(item.href)}
                    className={`font-bold text-2xl transition 
                      ${isActive ? "text-yellow-400 underline underline-offset-8" : "text-white"}
                      hover:text-yellow-400`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* ================= HERO SECTION ================= */}
      {isHome && (
        <div className="relative min-h-screen overflow-hidden flex items-center">
          <div className="absolute inset-0 z-0 w-full h-full">
            <Prism colorStops={["#000000", "#FFD700", "#B8860B"]} blend={0.5} amplitude={1.0} speed={0.5} />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
          </div>

          <div className="relative z-10 flex flex-col justify-center items-center text-center px-4 sm:px-6 max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white drop-shadow-2xl animate-fadeInUp">
              {t('hero.title')}
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-300 animate-fadeInUp delay-200">
              {t('hero.description')}
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center gap-4 animate-fadeInUp delay-400 w-full">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  goToSection("#contact");
                }}
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-yellow-400 text-white font-semibold shadow-lg hover:bg-yellow-600 transition transform hover:scale-105 text-center"
              >
                {t('navigation.contact')}
              </a>
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  goToSection("#services");
                }}
                className="w-full sm:w-auto px-8 py-3 rounded-full border border-white text-white font-semibold hover:bg-white/10 transition transform hover:scale-105 text-center"
              >
                {t('navigation.services')}
              </a>
            </div>
          </div>

          {/* Animation Keyframes */}
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
