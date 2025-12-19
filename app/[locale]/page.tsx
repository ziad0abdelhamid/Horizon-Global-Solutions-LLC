"use client";

import { useEffect } from "react";
import "../globals.css";
import Services from "@/components/Services";
import Contact from "@/components/ContactForm";
import Footer from "@/components/Footer";
import HeroWithNavbar from "@/components/Navbar"; // your existing Navbar component

export default function Home() {
  useEffect(() => {
    const container = document.getElementById("scroll-container");

    const handleScroll = () => {
      // Simulate window scroll for Navbar’s useEffect
      window.dispatchEvent(new Event("scroll"));
    };

    if (container) container.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main
      id="scroll-container"
      className="h-screen overflow-y-scroll scroll-smooth lg:snap-y lg:snap-mandatory"
    >
      {/* Hero Section with Navbar */}
      <section id="home" className="snap-start relative h-screen flex flex-col justify-center">
        <HeroWithNavbar />

        {/* SVG Divider to Services */}
        <div className="absolute bottom-0 w-full overflow-hidden leading-[0]">

        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="snap-start relative min-h-screen flex flex-col justify-center bg-[#bb8c00]">
        <Services />

        {/* SVG Divider to Contact */}
        <div className="absolute bottom-0 w-full overflow-hidden leading-[0] rotate-180">
          <svg
            className="relative block w-[calc(100%+1.3px)] h-20"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 1200 120"
          >
            <path
              d="M0,0 V60 C150,120 350,0 600,60 S1050,0 1200,60 V0 H0 Z"
              fill="#ffffff"
            ></path>
          </svg>
        </div>
      </section>

      {/* Contact + Footer Section */}
      <section id="contact" className="snap-start relative min-h-screen flex flex-col justify-between bg-[#bb8c00]">
        <div className="flex-1 flex flex-col justify-center">
          <Contact />
        </div>
        <Footer />
      </section>
    </main>
  );
}
