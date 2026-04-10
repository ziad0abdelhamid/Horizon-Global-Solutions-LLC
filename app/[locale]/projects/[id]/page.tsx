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
import { createPortal } from "react-dom";

export default function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project: Project | undefined = projects.find((p) => p.id === id);
  const scrollByAmount = 200; // smaller scroll amount
  const containerRef = useRef<HTMLDivElement | null>(null);
  const t = useTranslations('projectsDetail'); // <--- use correct namespace
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [centerIndex, setCenterIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
    <div className="w-full min-h-screen scroll-smooth bg-gradient-to-br from-[#0f0f1e] via-[#1a1a2e] to-[#0f0f1e]">
      <HeroWithNavbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 font-['Sono'] relative">
        {/* Decorative Background */}
        <div className="fixed inset-0 opacity-5 pointer-events-none -z-10">
          <div className="absolute top-20 right-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 pt-24 pb-20">
          {/* Header Section with Back Button */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-start justify-between gap-6 mb-12"
          >
            <div className="flex-1">
              <div className="flex justify-between items-center gap-3 mb-8 flex-wrap">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-4 py-2 text-[#D4AF37] font-semibold hover:text-yellow-300 transition-all bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg hover:border-[#D4AF37]/50 hover:bg-white/10"
                >
                  ← {t("back")}
                </Link>
                {project.hasPrivacyPolicy && (
                  <Link
                    href={`/projects/${id}/privacy`}
                    className="inline-flex items-center gap-2 px-4 py-2 text-[#D4AF37] font-semibold hover:text-yellow-300 transition-all bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg hover:border-[#D4AF37]/50 hover:bg-white/10"
                  >
                    {t("viewPrivacyPolicy")}
                  </Link>
                )}
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#D4AF37] to-yellow-300 bg-clip-text text-transparent mb-4">
                  {t(`title.${project.id}`)}
                </h1>
                <p className="text-base text-gray-300 leading-relaxed max-w-2xl font-light">
                  {t(`details.${project.id}`) || t(`desc.${project.id}`) || t("noDescription")}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/30 to-[#D4AF37]/0 mb-12"></div>

          {/* Main Image Section */}
          <motion.section
            className="relative w-full rounded-2xl overflow-hidden shadow-2xl mb-16 bg-gradient-to-br from-white/5 to-white/10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="relative w-full h-72 md:h-96 lg:h-[500px] flex items-center justify-center">
              <Image
                src={project.image || "/placeholder.png"}
                alt={t(`title.${project.id}`)}
                fill
                className="object-contain p-2"
                placeholder="blur"
                blurDataURL="/placeholder.png"
                priority
              />
            </div>
          </motion.section>

          {/* Additional Images Carousel */}
          {project.images?.length && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="relative group mb-16"
            >
              <h2 className="text-xl font-semibold text-[#D4AF37] uppercase tracking-widest mb-8">
                {t("gallery") || "Gallery"}
              </h2>

              {/* Navigation Arrows */}
              <button
                onClick={() =>
                  containerRef.current?.scrollBy({
                    left: -scrollByAmount,
                    behavior: "smooth",
                  })
                }
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-r from-[#D4AF37] to-yellow-400 text-black rounded-full p-3 hover:shadow-xl hover:shadow-[#D4AF37]/60 transition-all shadow-lg hidden md:flex items-center justify-center"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() =>
                  containerRef.current?.scrollBy({
                    left: scrollByAmount,
                    behavior: "smooth",
                  })
                }
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-r from-[#D4AF37] to-yellow-400 text-black rounded-full p-3 hover:shadow-xl hover:shadow-[#D4AF37]/60 transition-all shadow-lg hidden md:flex items-center justify-center"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Carousel */}
              <motion.section
                ref={containerRef}
                className="flex gap-4 overflow-x-auto py-4 px-2 scrollbar-none scroll-smooth cursor-grab active:cursor-grabbing"
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUpOrLeave}
                onMouseLeave={onMouseUpOrLeave}
              >
                {project.images.map((img, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.08 }}
                    whileHover={{ y: -6 }}
                    onClick={() => setSelectedImage(img)}
                    className={`relative flex-shrink-0 rounded-xl overflow-hidden shadow-lg snap-center select-none transition-all cursor-pointer bg-gradient-to-br from-white/5 to-white/10
                      ${index === centerIndex
                        ? "w-56 h-80 ring-2 ring-[#D4AF37] ring-offset-2 ring-offset-[#0f0f1e] shadow-[#D4AF37]/50"
                        : "w-56 h-80 hover:shadow-xl hover:scale-105"
                      }
                    `}
                  >
                    <Image
                      src={img}
                      alt={`${t(`title.${project.id}`)} screenshot ${index + 1}`}
                      fill
                      className="object-contain p-2"
                    />
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all"></div>
                  </motion.button>
                ))}
              </motion.section>
            </motion.div>
          )}

          {/* Image Modal */}
          {isMounted && selectedImage && createPortal(
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md z-[9999] flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-6xl h-[90vh] rounded-2xl overflow-hidden border border-[#D4AF37]/30 bg-gradient-to-br from-white/5 to-white/10"
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all cursor-pointer"
                  aria-label="Close"
                >
                  ✕
                </button>
                <div className="relative w-full h-full p-4">
                  <Image
                    src={selectedImage}
                    alt="Full size project screenshot"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </motion.div>
            </motion.div>,
            document.body
          )}

          {/* Project Info Grid */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-8">
              Project Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {/* Technologies */}
              {project.technologies && (
                <div className="group bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-lg rounded-xl p-6 border border-white/15 hover:border-[#D4AF37]/50 transition-all hover:shadow-lg hover:shadow-[#D4AF37]/20">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2 rounded-lg bg-[#D4AF37]/10">
                      <Code className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37]">
                      {t("technologies")}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-[#D4AF37]/15 text-[#D4AF37] rounded-full text-xs font-semibold border border-[#D4AF37]/30 hover:bg-[#D4AF37]/25 transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Role */}
              {project.role && (
                <div className="group bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-lg rounded-xl p-6 border border-white/15 hover:border-[#D4AF37]/50 transition-all hover:shadow-lg hover:shadow-[#D4AF37]/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-[#D4AF37]/10">
                      <Target className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <h3 className="text-sm font-bold text-center uppercase tracking-wider text-[#D4AF37]">
                      {t("role")}
                    </h3>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{project.role}</p>
                </div>
              )}

              {/* Duration */}
              {project.duration && (
                <div className="group bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-lg rounded-xl p-6 border border-white/15 hover:border-[#D4AF37]/50 transition-all hover:shadow-lg hover:shadow-[#D4AF37]/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-[#D4AF37]/10">
                      <Zap className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37]">
                      {t("duration")}
                    </h3>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{project.duration}</p>
                </div>
              )}

              {/* Challenges */}
              {project.challenges && (
                <div className="group bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-lg rounded-xl p-6 border border-white/15 hover:border-[#D4AF37]/50 transition-all hover:shadow-lg hover:shadow-[#D4AF37]/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-[#D4AF37]/10">
                      <div className="w-4 h-4 rounded-full bg-[#D4AF37] flex items-center justify-center text-black text-xs font-bold">!</div>
                    </div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37]">
                      {t("challenges")}
                    </h3>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{project.challenges}</p>
                </div>
              )}

              {/* Key Learnings */}
              {project.keyLearnings && (
                <div className="group bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-lg rounded-xl p-6 border border-white/15 hover:border-[#D4AF37]/50 transition-all hover:shadow-lg hover:shadow-[#D4AF37]/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-[#D4AF37]/10">
                      <Award className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37]">
                      {t("keyLearnings")}
                    </h3>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{project.keyLearnings}</p>
                </div>
              )}

              {/* Visit Project CTA */}
              {project.link && (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-center bg-gradient-to-br from-[#D4AF37] to-yellow-400 rounded-xl p-6 border border-[#D4AF37]/50 hover:shadow-2xl hover:shadow-[#D4AF37]/40 transition-all cursor-pointer group col-span-1 sm:col-span-2 lg:col-span-1"
                >
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 text-black font-bold text-center"
                  >
                    <span>{t("visitProject")}</span>
                    <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                  </a>
                </motion.div>
              )}

            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
}
