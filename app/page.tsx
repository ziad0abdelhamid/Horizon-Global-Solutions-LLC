"use client"
import './globals.css';
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Services />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
