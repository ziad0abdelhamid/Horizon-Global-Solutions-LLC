"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Link } from "@/i18n/routing";
import HeroWithNavbar from "@/components/Navbar";
import { FaGlobe } from "react-icons/fa";
import Footer from "@/components/Footer";

const teamMembers = [
  {
    name: "Zeyad Abdelhamid",
    role: "Founder, CEO & General Manager",
    description:
      "Zeyad leads Horizon Global Solutions LLC. with a visionary approach to strategic growth, innovation, and operational excellence. As the company’s founder and chief executive, he oversees all business divisions, ensuring seamless alignment between strategy, execution, and impact.",
    image: "/zeyad.jpg",
    website: "https://www.linkedin.com/in/zeyad-abdelhamid-a76a561b6/",
  },
  {
    name: "Moustafa Hesham",
    role: "Chief Technology Officer (CTO)",
    description:
      "Moustafa heads the technology division, guiding product development, software engineering, and systems architecture. His expertise in coding and AI-driven innovation ensures every solution delivered is both scalable and future-ready.",
    image: "/moustafa.jpg",
    website: "https://github.com/Moustafa-H",
  },
  {
    name: "Mohamed El-Bakry",
    role: "Marketing & Client Acquisition Director",
    description:
      "Mohamed drives the company’s marketing strategy and oversees client acquisition initiatives. With a deep understanding of market trends and audience engagement, he connects America One Inc. with partners and customers worldwide.",
    image: "/dito.jpg",
    website: "",
  },
  {
    name: "Mohamed El Sharkawy",
    role: "Lead Data Analyst",
    description:
      "Mohamed specializes in data analytics and performance insights, transforming complex datasets into actionable intelligence. His analytical acumen supports strategic decision-making across all operational levels.",
    image: "/sharko.jpg",
  },
];

export default function AboutPage() {
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } },
  };

  return (
    <div
      id="scroll-container"
      className="w-full min-h-screen overflow-y-scroll scroll-smooth bg-white"
    >
      <HeroWithNavbar />

      {/* Team Section */}
      <section className="relative snap-start min-h-screen bg-gray-50 py-16 px-4 sm:px-6 md:px-10">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-extrabold text-gray-900 text-center mb-12 sm:mb-16"
        >
          Meet Our Team
        </motion.h2>

        <div className="max-w-6xl mx-auto grid gap-10 sm:gap-12">
          {teamMembers.map((member, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-md overflow-hidden"
            >
              {/* Image */}
              <div className="relative w-full md:w-1/3 aspect-[4/3] md:aspect-square">
                <Image src={member.image} alt={member.name} fill className="object-cover" />
              </div>

              {/* Text Content */}
              <div className="w-full md:w-2/3 p-6 sm:p-8 text-center md:text-left">
                <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900">{member.name}</h3>
                <p className="text-md sm:text-lg text-yellow-600 font-medium mb-3 sm:mb-4">
                  {member.role}
                </p>
                <p className="text-gray-700 text-base sm:text-lg mb-5 sm:mb-6 leading-relaxed">
                  {member.description}
                </p>

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
        className="relative snap-start min-h-[70vh] sm:min-h-screen flex flex-col justify-center items-center text-center bg-yellow-500 text-white px-4 sm:px-6"
      >
        <h2 className="text-4xl sm:text-5xl font-bold mb-6 sm:mb-8">
          Let’s Build Something Great Together
        </h2>
        <p className="max-w-2xl mx-auto mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
          Partner with us to bring your ideas to life through innovation and technology.
        </p>
        <Link
          href="/#contact"
          className="inline-block px-6 sm:px-8 py-3 rounded-full bg-white text-yellow-700 font-semibold shadow-md hover:bg-yellow-100 transition-transform transform hover:scale-105"
        >
          Contact Us
        </Link>
      </motion.section>

      <Footer />
    </div>
  );
}
