"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Link } from "@/i18n/routing";
import HeroWithNavbar from "@/components/Navbar";
import { FaGlobe } from "react-icons/fa";
import Footer from "@/components/Footer";
import { useTranslations, useLocale } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("aboutPage");
  const locale = useLocale();

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } },
  };

  const teamMembers = [
    {
      image: "/zeyad.jpg",
      name: t("teamSection.members.0.name"),
      role: t("teamSection.members.0.role"),
      description: t("teamSection.members.0.description"),
      website: "https://www.linkedin.com/in/zeyad-abdelhamid-a76a561b6/",
      websiteLabel: t("teamSection.members.0.websiteLabel"),
    },
    {
      image: "/moustafa.jpg",
      name: t("teamSection.members.1.name"),
      role: t("teamSection.members.1.role"),
      description: t("teamSection.members.1.description"),
      website: "https://github.com/Moustafa-H",
      websiteLabel: t("teamSection.members.1.websiteLabel"),
    },
    {
      image: "/dito.jpg",
      name: t("teamSection.members.2.name"),
      role: t("teamSection.members.2.role"),
      description: t("teamSection.members.2.description"),
      website: "",
      websiteLabel: "",
    },
    {
      image: "/sharko.jpg",
      name: t("teamSection.members.3.name"),
      role: t("teamSection.members.3.role"),
      description: t("teamSection.members.3.description"),
      website: "",
      websiteLabel: "",
    },
  ];

  return (
    <div id="scroll-container" className="w-full min-h-screen overflow-y-scroll scroll-smooth bg-white pt-5">
      {/* Hero Section */}
      <HeroWithNavbar />

      {/* Team Section */}
      <section className="relative snap-start min-h-screen bg-gray-50 py-16 px-4 sm:px-6 md:px-10">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-extrabold mb-12 sm:mb-16 text-center text-gray-900"
        >
          {t("teamSection.title")}
        </motion.h2>

        <div className="max-w-6xl mx-auto grid gap-10 sm:gap-12">
          {teamMembers.map((member, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className={`flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-md overflow-hidden ${
                locale === "ar" ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Member Image */}
              <div className="relative w-full md:w-1/3 aspect-[4/3] md:aspect-square">
                <Image src={member.image} alt={member.name} fill className="object-cover" />
              </div>

              {/* Member Info (Selective RTL) */}
              <div
                className={`w-full md:w-2/3 p-6 sm:p-8 text-center md:text-left ${
                  locale === "ar" ? "text-right" : "text-left"
                }`}
              >
                <h3 className={`text-2xl sm:text-3xl font-bold mb-2 text-gray-900`}>
                  {member.name}
                </h3>
                <p className="text-md sm:text-lg text-yellow-600 font-medium mb-3 sm:mb-4">
                  {member.role}
                </p>
                <p className="text-gray-700 text-base sm:text-lg mb-5 sm:mb-6 leading-relaxed">
                  {member.description}
                </p>

                {member.website && member.websiteLabel && (
                  <a
                    href={member.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-yellow-600 font-semibold hover:text-yellow-800 transition-colors"
                  >
                    <FaGlobe /> {member.websiteLabel}
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
        className="relative snap-start min-h-[70vh] sm:min-h-screen flex flex-col justify-center items-center text-center bg-yellow-500 text-white px-4 sm:px-6"
      >
        <h2 className="text-4xl sm:text-5xl font-bold mb-6 sm:mb-8">{t("ctaSection.title")}</h2>
        <p className="max-w-2xl mx-auto mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">{t("ctaSection.subtitle")}</p>
        <Link
          href="/#contact"
          className="inline-block px-6 sm:px-8 py-3 rounded-full bg-white text-yellow-700 font-semibold shadow-md hover:bg-yellow-100 transition-transform transform hover:scale-105"
        >
          {t("ctaSection.button")}
        </Link>
      </motion.section>

      <Footer />
    </div>
  );
}
