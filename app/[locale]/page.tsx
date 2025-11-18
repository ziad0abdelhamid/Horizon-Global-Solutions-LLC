"use client";

import { useEffect } from "react";
import "../globals.css";
import Services from "@/components/Services";
import Contact from "@/components/ContactForm";
import Footer from "@/components/Footer";
import HeroWithNavbar from "@/components/Navbar"; // ✅ your existing Navbar component

export default function Home() {
  useEffect(() => {
    const container = document.getElementById("scroll-container");

    const handleScroll = () => {
      // 🔥 Simulate window scroll for Navbar’s useEffect
      window.dispatchEvent(new Event("scroll"));
    };

    if (container) container.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main
      id="scroll-container"
      className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth"
    >
      {/* Hero Section with Navbar */}
      <section id="home" className="snap-start h-screen">
        <HeroWithNavbar />
      </section>

      {/* Services Section */}
      <section id="services" className="snap-start h-screen">
        <Services />
      </section>

      {/* Contact + Footer Section */}
      <section id="contact" className="snap-start">
        <div className="min-h-screen flex flex-col">
          {/* Contact Form */}
          <div className="flex-1">
            <Contact />
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </section>
    </main>
  );
}
