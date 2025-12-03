"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import { projects, Project } from "@/app/data/projects";
import HeroWithNavbar from "@/components/Navbar";
import React from "react";
import { FaExternalLinkAlt, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";

interface Props {
  params: { id: string };
}

export default function ProjectDetail({ params }: Props) {
  const { id } = params;
  const project: Project | undefined = projects.find((p) => p.id === id);

  if (!project) return notFound();

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-[#faf8f4]">
      {/* Navbar */}
      <HeroWithNavbar />

      <main className="max-w-6xl mx-auto py-24 px-6 font-['Sono'] space-y-12">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#D4AF37] font-semibold hover:underline"
        >
          <FaArrowLeft /> Back to Projects
        </Link>

        {/* Title & Description */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#D4AF37] mb-4">
            {project.title}
          </h1>
          <p className="text-gray-900 text-lg md:text-xl leading-relaxed">
            {project.details || project.desc || "No description available."}
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
            alt={project.title}
            fill
            className="object-cover"
            placeholder="blur"
            blurDataURL="/placeholder.png"
          />
        </motion.section>

        {/* Additional Images Carousel */}
        {project.images?.length ? (
          <motion.section
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory py-4 scrollbar-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {project.images.map((img, index) => (
              <div
                key={index}
                className="relative flex-shrink-0 w-80 h-60 rounded-xl overflow-hidden shadow-md snap-center"
              >
                <Image
                  src={img}
                  alt={`${project.title} screenshot ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </motion.section>
        ) : null}

        {/* Project Details */}
        <motion.section
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {project.technologies && (
            <p>
              <span className="font-semibold uppercase tracking-wide text-[#555]">
                Technologies:
              </span>{" "}
              <span className="text-gray-900">{project.technologies.join(", ")}</span>
            </p>
          )}
          {project.role && (
            <p>
              <span className="font-semibold uppercase tracking-wide text-[#555]">
                Role:
              </span>{" "}
              <span className="text-gray-900">{project.role}</span>
            </p>
          )}
          {project.duration && (
            <p>
              <span className="font-semibold uppercase tracking-wide text-[#555]">
                Duration:
              </span>{" "}
              <span className="text-gray-900">{project.duration}</span>
            </p>
          )}
          {project.challenges && (
            <p>
              <span className="font-semibold uppercase tracking-wide text-[#555]">
                Challenges:
              </span>{" "}
              <span className="text-gray-900">{project.challenges}</span>
            </p>
          )}
          {project.keyLearnings && (
            <p>
              <span className="font-semibold uppercase tracking-wide text-[#555]">
                Key Learnings:
              </span>{" "}
              <span className="text-gray-900">{project.keyLearnings}</span>
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
              Visit Project <FaExternalLinkAlt />
            </a>
          </motion.section>
        )}
      </main>
    </div>
  );
}
