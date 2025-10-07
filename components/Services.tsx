// src/components/Services.tsx
"use client";

import { motion } from "framer-motion";
import {
  Code2,
  BarChart3,
  DollarSign,
  Briefcase,
  Palette,
  Megaphone,
  Users,
} from "lucide-react";

const services = [
  { title: "Web Development", desc: "Custom-built websites optimized for performance, security, and user experience.", icon: <Code2 className="w-6 h-6" /> },
  { title: "Data Analytics", desc: "We turn complex data into clear insights that drive smart business decisions.", icon: <BarChart3 className="w-6 h-6" /> },
  { title: "Financial Advisory", desc: "Strategic financial guidance to help you grow, invest, and scale confidently.", icon: <DollarSign className="w-6 h-6" /> },
  { title: "Software Programming", desc: "Reliable, scalable, and modern software tailored precisely to your needs.", icon: <Briefcase className="w-6 h-6" /> },
  { title: "Web & Logo Design", desc: "Elegant digital identities and brand visuals that leave a lasting impression.", icon: <Palette className="w-6 h-6" /> },
  { title: "Marketing Solutions", desc: "Creative digital campaigns designed to engage and convert your audience.", icon: <Megaphone className="w-6 h-6" /> },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative py-20 sm:py-20 md:py-32 bg-gradient-to-b from-[#fefdfb] to-[#f7f5ef] font-['Sono']"
    >
      {/* Section Title */}
      <div className="text-center mb-12 sm:mb-16 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#D4AF37] mb-4">
          Our Services
        </h2>
        <p className="text-slate-600 max-w-xl sm:max-w-2xl mx-auto text-sm sm:text-base">
          Empowering your business through innovative technology, data-driven decisions, and exceptional design.
        </p>
      </div>

      {/* Animated Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              delay: i * 0.1,
              duration: 0.6,
              ease: [0.25, 0.8, 0.25, 1],
            }}
            className="group relative bg-white/60 backdrop-blur-md border border-[#e7d9b9] shadow-md rounded-2xl p-4 sm:p-6 md:p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:bg-white/80"
          >
            {/* Accent Line */}
            <div className="absolute top-0 left-0 w-full h-1 rounded-t-2xl bg-gradient-to-r from-[#D4AF37] to-transparent opacity-80"></div>

            {/* Icon */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#D4AF37] mb-4 sm:mb-5 md:mb-6 group-hover:scale-110 transition-transform duration-300">
              {service.icon}
            </div>

            {/* Title */}
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 mb-2 sm:mb-2 md:mb-3 group-hover:text-[#D4AF37] transition-colors">
              {service.title}
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm md:text-sm text-gray-600 leading-relaxed">
              {service.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Background Glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] md:w-[700px] h-[400px] sm:h-[600px] md:h-[700px] bg-[#D4AF37]/10 blur-3xl rounded-full -z-10"></div>
    </section>
  );
}
