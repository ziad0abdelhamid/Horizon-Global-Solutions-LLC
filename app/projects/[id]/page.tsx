"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import { projects } from "@/app/data/projects";
import HeroWithNavbar from "@/components/Navbar"; // ✅ Scroll-aware navbar

interface Params {
  params: { id: string };
}

export default function ProjectDetail({ params }: Params) {
  const project = projects.find((p) => p.id === params.id);

  if (!project) return notFound();

  return (
    <div id="scroll-container" className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      {/* Navbar */}
      <HeroWithNavbar />

      <main className="bg-[#faf8f4] min-h-screen font-['Sono'] py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#D4AF37] mb-6">
            {project.title}
          </h1>
          <p className="text-gray-700 mb-8">{project.details || project.desc}</p>

          <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-lg">
            <Image src={project.image} alt={project.title} fill className="object-cover" />
          </div>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              className="mt-6 inline-block px-6 py-3 bg-[#D4AF37] text-black font-semibold rounded-lg hover:bg-[#e0c562] transition"
            >
              Visit Project
            </a>
          )}
        </div>
      </main>
    </div>
  );
}
