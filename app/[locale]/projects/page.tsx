"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { useTranslations } from 'next-intl';
import { projects, Project } from "@/app/data/projects";
import HeroWithNavbar from "@/components/Navbar";
import { ArrowRight } from "lucide-react";

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

      <main className="bg-gradient-to-br from-[#0f0f1e] via-[#1a1a2e] to-[#0f0f1e] min-h-screen font-['Sono'] py-24 px-4 sm:px-6 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 right-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-[#D4AF37] to-yellow-300 bg-clip-text text-transparent">
              {t('title')}
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-300">
              {t('subtitle')}
            </p>
          </motion.header>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 flex flex-wrap justify-center gap-3 mb-16"
          >
            {categories.map((cat, index) => (
              <motion.button
                key={cat}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(cat)}
                className={selectedCategory === cat
                  ? "px-6 py-3 rounded-full font-semibold transition-all duration-300 backdrop-blur-xl border bg-gradient-to-r from-[#D4AF37] to-yellow-400 text-black border-[#D4AF37] shadow-lg shadow-[#D4AF37]/50"
                  : "px-6 py-3 rounded-full font-semibold transition-all duration-300 backdrop-blur-xl border bg-white/10 text-gray-300 border-white/20 hover:border-[#D4AF37]/50 hover:bg-white/15"
                }
              >
                {t(`categories.${cat}`)}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <section className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project: Project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
                className="group relative bg-gradient-to-br from-white/10 to-white/5 rounded-2xl overflow-hidden cursor-pointer backdrop-blur-xl border border-white/20 shadow-xl hover:border-[#D4AF37]/50 transition-all duration-500"
              >
                {/* Image Container */}
                <div className="relative w-full h-64 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={t(`details.${project.id}.title`)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4">
                    <Link
                      href={`/projects/${project.id}`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-yellow-400 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#D4AF37]/50 transition-all"
                    >
                      {t('viewProject')} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-transparent bg-gradient-to-r from-[#D4AF37] to-yellow-300 bg-clip-text group-hover:opacity-100 transition-colors">
                    {t(`details.${project.id}.title`)}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{t(`details.${project.id}.desc`)}</p>
                  <div className="flex items-center gap-2 text-[#D4AF37] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>{t('viewProject')}</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </motion.div>
            ))}
          </section>

          {/* No Projects Message */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-gray-400 text-lg">{t('noProjects') || 'No projects found'}</p>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
