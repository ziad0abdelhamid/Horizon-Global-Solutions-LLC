"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import Prism from "@/components/Prism";
import HeroWithNavbar from "@/components/Navbar"; // Use your existing navbar
import { FaGlobe } from "react-icons/fa";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/projects" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/#contact" },
];

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    description:
      "Sarah leads Horizon Global Solutions with over a decade of experience in business strategy and technology integration. Her vision drives the company’s commitment to innovation and excellence.",
    image: "/team1.jpg",
    website: "https://linkedin.com/in/sarahjohnson",
  },
  {
    name: "Michael Chen",
    role: "Chief Technology Officer",
    description:
      "Michael oversees product development and software architecture, ensuring our solutions are scalable, secure, and cutting-edge. He’s passionate about AI and sustainable tech.",
    image: "/team2.jpg",
    website: "https://github.com/michaelchen",
  },
  {
    name: "Emily Davis",
    role: "Lead Designer",
    description:
      "Emily creates intuitive and engaging designs for digital platforms, blending aesthetics with user-centric functionality to deliver outstanding experiences.",
    image: "/team3.jpg",
    website: "https://dribbble.com/emilydavis",
  },
  {
    name: "Ahmed Ali",
    role: "Operations Manager",
    description:
      "Ahmed manages operations and logistics, optimizing workflows and maintaining project efficiency from start to finish.",
    image: "/team4.jpg",
  },
];

export default function AboutPage() {
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } },
  };

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth" id="scroll-container">
      
      {/* 🔹 Navbar */}
      <HeroWithNavbar />

      {/* Hero Section */}
      <section className="relative snap-start h-screen flex flex-col justify-center items-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Prism colorStops={["#000000", "#FFD700", "#B8860B"]} blend={0.5} amplitude={1.0} speed={0.5} />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={{ once: true }}
          className="relative z-10 max-w-4xl px-6"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">About Horizon Global Solutions</h1>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
            We are a multidisciplinary team dedicated to building digital ecosystems that empower innovation, efficiency, and sustainable growth worldwide.
          </p>
        </motion.div>
      </section>

      {/* Mission & Vision Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        viewport={{ once: true, amount: 0.4 }}
        className="relative snap-start h-screen bg-white flex flex-col justify-center items-center px-6 md:px-16 lg:px-32 text-center"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-16">
            To deliver innovative, technology-driven solutions that help businesses adapt and thrive in an ever-changing digital world — blending creativity, precision, and strategic thinking to achieve lasting impact.
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Our Vision</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            To be a trusted global partner in technology and strategy — shaping the future of business through sustainable innovation, collaboration, and excellence.
          </p>
        </div>
      </motion.section>

      {/* Team Section */}
      <section className="relative snap-start h-screen overflow-y-auto bg-gray-50 py-24 px-6">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={{ once: true }}
          className="text-5xl font-extrabold text-gray-900 text-center mb-16"
        >
          Meet Our Team
        </motion.h2>

        <div className="max-w-6xl mx-auto grid gap-12">
          {teamMembers.map((member, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-md overflow-hidden"
            >
              <div className="relative w-full md:w-1/3 h-72">
                <Image src={member.image} alt={member.name} fill className="object-cover" />
              </div>

              <div className="w-full md:w-2/3 p-8 text-center md:text-left">
                <h3 className="text-3xl font-bold mb-2 text-gray-900">{member.name}</h3>
                <p className="text-lg text-yellow-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-700 text-lg mb-6">{member.description}</p>
                {member.website && (
                  <a
                    href={member.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-yellow-600 font-semibold hover:text-yellow-800 transition-colors"
                  >
                    <FaGlobe /> Visit Profile
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        viewport={{ once: true }}
        className="relative snap-start h-screen flex flex-col justify-center items-center text-center bg-yellow-500 text-white px-6"
      >
        <h2 className="text-5xl font-bold mb-8">Let’s Build Something Great Together</h2>
        <p className="max-w-2xl mx-auto mb-8 text-lg">
          Partner with us to bring your ideas to life through innovation and technology.
        </p>
        <Link
          href="/#contact"
          className="inline-block px-8 py-3 rounded-full bg-white text-yellow-600 font-semibold shadow-md hover:bg-yellow-100 transition-transform transform hover:scale-105"
        >
          Contact Us
        </Link>
      </motion.section>
    </div>
  );
}
