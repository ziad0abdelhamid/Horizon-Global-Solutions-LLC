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
} from "lucide-react";
import { useTranslations } from 'next-intl';

export default function Services() {
  const t = useTranslations('services');

  const services = [
    { titleKey: 'webDevelopment.title', descKey: 'webDevelopment.description', icon: <Code2 className="w-6 h-6" /> },
    { titleKey: 'dataAnalytics.title', descKey: 'dataAnalytics.description', icon: <BarChart3 className="w-6 h-6" /> },
    { titleKey: 'financialAdvisory.title', descKey: 'financialAdvisory.description', icon: <DollarSign className="w-6 h-6" /> },
    { titleKey: 'softwareProgramming.title', descKey: 'softwareProgramming.description', icon: <Briefcase className="w-6 h-6" /> },
    { titleKey: 'webDesign.title', descKey: 'webDesign.description', icon: <Palette className="w-6 h-6" /> },
    { titleKey: 'marketing.title', descKey: 'marketing.description', icon: <Megaphone className="w-6 h-6" /> },
    { titleKey: 'videoEditing.title', descKey: 'videoEditing.description', icon: <Megaphone className="w-6 h-6" /> },
  ];

  return (
    <section
      id="services"
      className="relative py-[8vh] sm:py-[10vh] md:py-[12vh] bg-gradient-to-b from-[#fefdfb] to-[#f7f5ef] font-['Sono']"
    >
      {/* Section Title */}
      <div className="text-center mb-[4rem] sm:mb-[5rem] px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#D4AF37] mb-4">
          {t('title')}
        </h2>
        <p className="text-gray-700 max-w-xl sm:max-w-2xl mx-auto text-sm sm:text-base">
          {t('subtitle')}
        </p>
      </div>

      {/* Creative Staggered Grid */}
      <div className="max-w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1.5rem] sm:gap-[2rem]">
        {services.map((service, i) => (
          <motion.div
            key={service.titleKey}
            initial={{ opacity: 0, y: i % 2 === 0 ? 4 : -4, rotate: i % 2 === 0 ? -2 : 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
            className="group relative bg-white/60 backdrop-blur-md border border-[#e7d9b9] shadow-md rounded-[1.5rem] p-[1.5rem] sm:p-[2rem] md:p-[2.5rem] transition-all duration-500 hover:-translate-y-3 hover:scale-[1.05] hover:shadow-xl hover:bg-white/80"
          >
            {/* Hover Glow */}
            <div className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-r from-[#D4AF37]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

            {/* Icon */}
            <div className="w-[3rem] h-[3rem] sm:w-[3.5rem] sm:h-[3.5rem] md:w-[4rem] md:h-[4rem] flex items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#D4AF37] mb-[1rem] sm:mb-[1.25rem] md:mb-[1.5rem] transform transition-transform duration-500 group-hover:scale-[1.25] group-hover:rotate-12">
              {service.icon}
            </div>

            {/* Title */}
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-[0.5rem] group-hover:text-[#D4AF37] transition-colors">
              {t(service.titleKey)}
            </h3>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {t(service.descKey)}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Background Glow */}
      <div className="absolute -top-[30vh] left-1/2 -translate-x-1/2 w-[20rem] sm:w-[35rem] md:w-[45rem] h-[20rem] sm:h-[35rem] md:h-[45rem] bg-[#D4AF37]/10 blur-[10rem] rounded-full -z-10"></div>
    </section>
  );
}
