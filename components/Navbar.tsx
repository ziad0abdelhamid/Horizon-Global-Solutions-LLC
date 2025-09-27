"use client";

import { useState, useEffect } from "react";
import Prism from "./Prism";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#properties" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function HeroWithNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden font-sans">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 backdrop-blur-md ${
          scrolled ? "bg-white/95 shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="#" className="transition-all duration-300">
          {scrolled ? (
            <span className="text-xl md:text-2xl font-bold text-gray-800">
              Horizon Global Solutions
            </span>
          ) : (
            <Image
              src="/logo-2.png" // Your logo path
              alt="Horizon Global Solutions"
              width={400}
              height={100}
              className="transition-all duration-300"
            />
          )}
        </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className={`relative inline-block font-medium transition-all duration-300
                    ${scrolled ? "text-gray-800" : "text-white"}
                    hover:scale-105 hover:drop-shadow-lg
                    after:content-[''] after:block after:h-[2px] after:w-0 after:bg-yellow-600 after:transition-all after:duration-300 hover:after:w-full`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Hamburger */}
          <button
            className={`md:hidden transition-colors ${
              scrolled ? "text-gray-800" : "text-white"
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <ul className="md:hidden flex flex-col items-center mt-4 space-y-4 bg-white/90 backdrop-blur-md py-4 rounded-b-lg shadow-lg transition-all">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-800 hover:text-yellow-600 font-medium text-lg transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>

      {/* Prism Background */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Prism
          colorStops={scrolled ? ["#000000", "#FFD700", "#B8860B"] : ["#000000", "#FFD700", "#B8860B"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-2xl animate-fadeInUp">
          Horizon Global Solutions
        </h1>
        <p className="mt-6 text-lg text-gray-300 animate-fadeInUp delay-200">
          We help startups and enterprises thrive with cutting-edge digital
          solutions.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4 animate-fadeInUp delay-400">
          <a
            href="#contact"
            className="px-8 py-3 rounded-full bg-yellow-400 text-white font-semibold shadow-lg hover:bg-yellow-600 transition transform hover:scale-105"
          >
            Get Started
          </a>
          <a
            href="#services"
            className="px-8 py-3 rounded-full border border-white text-white font-semibold hover:bg-white/10 transition transform hover:scale-105"
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
    </section>
  );
}
