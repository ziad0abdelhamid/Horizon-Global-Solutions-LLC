"use client";

import { useState, useEffect } from "react";
import Prism from "./Prism";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "/projects" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "#contact" },
];

export default function HeroWithNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const goToSection = (href: string) => {
    if (href.startsWith("#")) {
      if (isHome) {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push("/" + href);
      }
    } else {
      router.push(href);
    }
    setMenuOpen(false);
  };

  return (
    <section className="relative font-sans">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 transition-all duration-300 ${
          scrolled || !isHome ? "bg-white/95 shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
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
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 lg:space-x-8">
            {navItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => goToSection(item.href)}
                  className={`relative inline-block font-medium transition-all duration-300
                    ${scrolled || !isHome ? "text-gray-800" : "text-white"}
                    hover:scale-105 hover:drop-shadow-lg
                    after:content-[''] after:block after:h-[2px] after:w-0 after:bg-yellow-600 after:transition-all after:duration-300 hover:after:w-full cursor-pointer`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Hamburger */}
          <button
            className={`md:hidden transition-colors z-50 ${
              scrolled || !isHome ? "text-gray-800" : "text-white"
            }`}
            onClick={() => setMenuOpen(true)}
            aria-label="Toggle menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Fullscreen Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center text-center transition-all">
          {/* Close Button */}
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 text-white"
            aria-label="Close menu"
          >
            <X size={36} />
          </button>

          {/* Menu Items */}
          <ul className="space-y-8">
            {navItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => goToSection(item.href)}
                  className="text-white font-bold text-2xl hover:text-yellow-400 transition"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Hero Section - only show on home page */}
      {isHome && (
        <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden flex items-center">
          <div className="absolute inset-0 z-0 w-full h-full">
            <Prism colorStops={["#000000", "#FFD700", "#B8860B"]} blend={0.5} amplitude={1.0} speed={0.5} />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
          </div>

          <div className="relative z-10 flex flex-col justify-center items-center text-center px-4 sm:px-6 max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white drop-shadow-2xl animate-fadeInUp">
              Horizon Global Solutions
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-300 animate-fadeInUp delay-200">
              We help startups and enterprises thrive with cutting-edge digital solutions.
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
                Get Started
              </a>
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  goToSection("#services");
                }}
                className="w-full sm:w-auto px-8 py-3 rounded-full border border-white text-white font-semibold hover:bg-white/10 transition transform hover:scale-105 text-center"
              >
                Explore Services
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
