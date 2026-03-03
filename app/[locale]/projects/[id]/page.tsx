"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import { projects, Project } from "@/app/data/projects";
import HeroWithNavbar from "@/components/Navbar";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';
import React, { use, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight, Zap, Target, Award, Code } from "lucide-react";
import { useRef } from "react";

export default function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project: Project | undefined = projects.find((p) => p.id === id);
  const scrollByAmount = 320; // slightly more than w-80
  const containerRef = useRef<HTMLDivElement | null>(null);
  const t = useTranslations('projectsDetail'); // <--- use correct namespace
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [centerIndex, setCenterIndex] = useState(0);

  const updateCenterIndex = () => {
    if (!containerRef.current) return;
    const children = Array.from(containerRef.current.children) as HTMLElement[];
    const center = containerRef.current.scrollLeft + containerRef.current.offsetWidth / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    children.forEach((child, i) => {
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const distance = Math.abs(center - childCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    });

    setCenterIndex(closestIndex);
  };


  // call on scroll
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateCenterIndex);
    updateCenterIndex(); // initialize
    return () => el.removeEventListener("scroll", updateCenterIndex);
  }, []);

  if (!project) return notFound();

  const onMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // drag speed
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const onMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-gradient-to-br from-[#0f0f1e] via-[#1a1a2e] to-[#0f0f1e]">
      <HeroWithNavbar />

      <main className="max-w-6xl mx-auto py-16 sm:py-24 px-4 sm:px-6 font-['Sono'] space-y-16 relative mt-12 sm:mt-0">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-32 right-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-4 py-2 text-[#D4AF37] font-semibold hover:text-yellow-300 transition-colors bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg hover:border-[#D4AF37]/50"
            >
              ← {t("back")}
            </Link>
          </motion.div>

          {/* Title & Description */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-[#D4AF37] to-yellow-300 bg-clip-text text-transparent">
                {t(`title.${project.id}`)}
              </h1>
            </div>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
              {t(`details.${project.id}`) || t(`desc.${project.id}`) || t("noDescription")}
            </p>
          </motion.section>

          {/* Main Image */}
          <motion.section
            className="relative w-full h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Image
              src={project.image || "/placeholder.png"}
              alt={t(`title.${project.id}`)}
              fill
              className="object-cover"
              placeholder="blur"
              blurDataURL="/placeholder.png"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </motion.section>

          {/* Additional Images Carousel */}
          {project.images?.length && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative group"
            >
              <div className="text-sm font-semibold text-[#D4AF37] uppercase tracking-widest mb-4">Gallery</div>

              {/* Navigation Arrows */}
              <button
                onClick={() =>
                  containerRef.current?.scrollBy({
                    left: -scrollByAmount,
                    behavior: "smooth",
                  })
                }
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-r from-[#D4AF37] to-yellow-400 text-black rounded-full p-3 hover:shadow-lg hover:shadow-[#D4AF37]/50 transition-all shadow-lg"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={() =>
                  containerRef.current?.scrollBy({
                    left: scrollByAmount,
                    behavior: "smooth",
                  })
                }
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-r from-[#D4AF37] to-yellow-400 text-black rounded-full p-3 hover:shadow-lg hover:shadow-[#D4AF37]/50 transition-all shadow-lg"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Carousel */}
              <motion.section
                ref={containerRef}
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory py-4 px-12 scrollbar-none scroll-smooth cursor-grab active:cursor-grabbing"
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUpOrLeave}
                onMouseLeave={onMouseUpOrLeave}
              >
                {project.images.map((img, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -8 }}
                    className={index === centerIndex
                      ? "relative flex-shrink-0 w-80 h-60 rounded-xl overflow-hidden shadow-lg snap-center select-none border border-white/20 transition-all ring-2 ring-[#D4AF37] shadow-[#D4AF37]/50"
                      : "relative flex-shrink-0 w-80 h-60 rounded-xl overflow-hidden shadow-lg snap-center select-none border border-white/20 transition-all"
                    }
                  >
                    <Image
                      src={img}
                      alt={`${t(`title.${project.id}`)} screenshot ${index + 1}`}
                      fill
                      className="object-cover pointer-events-none"
                    />
                  </motion.div>
                ))}
              </motion.section>
            </motion.div>
          )}

          {/* Project Details Grid */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Technologies */}
            {project.technologies && (
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-[#D4AF37]/50 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <Code className="w-5 h-5 text-[#D4AF37]" />
                  <h3 className="text-sm font-bold uppercase tracking-widest text-[#D4AF37]">{t("technologies")}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] rounded-full text-sm font-medium border border-[#D4AF37]/30">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Role */}
            {project.role && (
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-[#D4AF37]/50 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-5 h-5 text-[#D4AF37]" />
                  <h3 className="text-sm font-bold uppercase tracking-widest text-[#D4AF37]">{t("role")}</h3>
                </div>
                <p className="text-gray-300 text-lg font-semibold">{project.role}</p>
              </div>
            )}

            {/* Duration */}
            {project.duration && (
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-[#D4AF37]/50 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-5 h-5 text-[#D4AF37]" />
                  <h3 className="text-sm font-bold uppercase tracking-widest text-[#D4AF37]">{t("duration")}</h3>
                </div>
                <p className="text-gray-300 text-lg font-semibold">{project.duration}</p>
              </div>
            )}
          </motion.section>

          {/* Challenges & Key Learnings */}
          {(project.challenges || project.keyLearnings) && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {project.challenges && (
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-[#D4AF37]/50 transition-all">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-[#D4AF37] mb-4">{t("challenges")}</h3>
                  <p className="text-gray-300 leading-relaxed">{project.challenges}</p>
                </div>
              )}

              {project.keyLearnings && (
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-[#D4AF37]/50 transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="w-5 h-5 text-[#D4AF37]" />
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#D4AF37]">{t("keyLearnings")}</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{project.keyLearnings}</p>
                </div>
              )}
            </motion.section>
          )}

          {/* Visit Project CTA */}
          {project.link && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-yellow-400 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#D4AF37]/50 transition-all transform hover:scale-105"
              >
                {t("visitProject")} <ArrowUpRight className="w-5 h-5" />
              </a>
            </motion.section>
          )}
        </div>
      </main>
    </div>
  );
}
