"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { useTranslations } from 'next-intl';
import { projects, Project } from "@/app/data/projects";
import HeroWithNavbar from "@/components/Navbar";

export default function ProjectsPage() {
  const t = useTranslations('projects');

  const categories = [
    "all",
    "webDevelopment",
    "design",
    "dataAnalytics",
    "marketing",
    "software"
  ];

  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((p) => t(`categories.${selectedCategory}`) === t(`categories.${p.category}`));

  return (
    <div id="scroll-container" className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      <HeroWithNavbar />

      <main className="bg-[#faf8f4] min-h-screen font-['Sono'] py-24 px-6">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#D4AF37] mb-4">
            {t('title')}
          </h1>
          <p className="max-w-2xl mx-auto text-gray-700">
            {t('subtitle')}
          </p>

          {/* Category Filter */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-semibold transition ${
                  selectedCategory === cat
                    ? "bg-[#D4AF37] text-black"
                    : "bg-white text-gray-700 hover:bg-[#D4AF37]/30"
                }`}
              >
                {t(`categories.${cat}`)}
              </button>
            ))}
          </div>
        </header>

        {/* Projects Grid */}
        <section className="max-w-7xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project: Project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl hover:scale-[1.03] transition-transform duration-500"
            >
              <div className="relative w-full h-64">
                <Image src={project.image} alt={t(`details.${project.id}.title`)} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-70 transition-opacity duration-300 flex items-center justify-center">
                  <Link
                    href={`/projects/${project.id}`}
                    className="text-white font-semibold bg-[#D4AF37]/90 px-4 py-2 rounded-lg hover:bg-[#e0c562] transition"
                  >
                    {t('viewProject')}
                  </Link>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-[#D4AF37] transition-colors">
                  {t(`details.${project.id}.title`)}
                </h3>
                <p className="text-gray-600 text-sm">{t(`details.${project.id}.desc`)}</p>
              </div>
            </motion.div>
          ))}
        </section>
      </main>
    </div>
  );
}
