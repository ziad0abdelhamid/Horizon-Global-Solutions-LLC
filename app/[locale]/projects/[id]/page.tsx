"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import { projects, Project } from "@/app/data/projects";
import HeroWithNavbar from "@/components/Navbar";
import { FaExternalLinkAlt, FaArrowLeft } from "react-icons/fa";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';
import React, { use, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-[#faf8f4]">
      <HeroWithNavbar />

      <main className="max-w-6xl mx-auto py-24 px-6 font-['Sono'] space-y-12">
        {/* Back Button */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-[#D4AF37] font-semibold hover:underline"
        >
          <FaArrowLeft /> {t("back")}
        </Link>

        {/* Title & Description */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#D4AF37] mb-4">
            {t(`title.${project.id}`)}
          </h1>
          <p className="text-black text-lg md:text-xl leading-relaxed">
            {t(`details.${project.id}`) || t(`desc.${project.id}`) || t("noDescription")}
          </p>
        </motion.section>

        {/* Main Image */}
        <motion.section
          className="relative w-full h-96 rounded-2xl overflow-hidden shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
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
        </motion.section>

        {/* Additional Images Carousel */}

        {project.images?.length && (
          <div className="relative group">
            {/* LEFT ARROW */}
            <button
              onClick={() =>
                containerRef.current?.scrollBy({
                  left: -scrollByAmount,
                  behavior: "smooth",
                })
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20
                 bg-black/70 text-white rounded-full p-3
                 hover:bg-black transition shadow-lg"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* RIGHT ARROW */}
            <button
              onClick={() =>
                containerRef.current?.scrollBy({
                  left: scrollByAmount,
                  behavior: "smooth",
                })
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20
                 bg-black/70 text-white rounded-full p-3
                 hover:bg-black transition shadow-lg"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <motion.section
              ref={containerRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory py-4
                 scrollbar-none scroll-smooth cursor-grab active:cursor-grabbing"
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUpOrLeave}
              onMouseLeave={onMouseUpOrLeave}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {project.images.map((img, index) => (
                <div
                  key={index}
                  className="relative flex-shrink-0 w-80 h-60
                     rounded-xl overflow-hidden shadow-md snap-center
                     select-none"
                >
                  <Image
                    src={img}
                    alt={`${t(`title.${project.id}`)} screenshot ${index + 1}`}
                    fill
                    className="object-cover pointer-events-none"
                  />
                </div>
              ))}
            </motion.section>
          </div>
        )}


        {/* Project Details */}
        <motion.section
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {project.technologies && (
            <p>
              <span className="font-semibold uppercase tracking-wide text-black">{t("technologies")}:</span>{" "}
              <span className="text-black">{project.technologies.join(", ")}</span>
            </p>
          )}
          {project.role && (
            <p>
              <span className="font-semibold uppercase tracking-wide text-black">{t("role")}:</span>{" "}
              <span className="text-black">{project.role}</span>
            </p>
          )}
          {project.duration && (
            <p>
              <span className="font-semibold uppercase tracking-wide text-black">{t("duration")}:</span>{" "}
              <span className="text-black">{project.duration}</span>
            </p>
          )}
          {project.challenges && (
            <p>
              <span className="font-semibold uppercase tracking-wide text-black">{t("challenges")}:</span>{" "}
              <span className="text-black">{project.challenges}</span>
            </p>
          )}
          {project.keyLearnings && (
            <p>
              <span className="font-semibold uppercase tracking-wide text-black">{t("keyLearnings")}:</span>{" "}
              <span className="text-black">{project.keyLearnings}</span>
            </p>
          )}
        </motion.section>

        {/* Visit Project */}
        {project.link && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-black font-semibold rounded-lg hover:bg-[#e0c562] transition"
            >
              {t("visitProject")} <FaExternalLinkAlt />
            </a>
          </motion.section>
        )}
      </main>
    </div>
  );
}
