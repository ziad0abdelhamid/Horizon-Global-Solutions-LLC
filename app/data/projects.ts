export interface Project {
  id: string;
  title: string;
  desc: string;
  image: string;
  category: string;
  link?: string;
  details?: string;
  images?: string[]; // optional additional screenshots
  technologies?: string[]; // optional tech stack
  role?: string; // your role in the project
  duration?: string; // duration of the project
  challenges?: string; // challenges faced
  keyLearnings?: string; // key learnings
}

export const projects: Project[] = [
  {
    id: "corporate-website",
    title: "Corporate Website",
    desc: "Custom-built website for a real estate company",
    image: "/projects/real-estate.jpg",
    category: "Web Development",
    details: "Developed a fully responsive, SEO-optimized corporate website.",
    link: "https://example-corp.com",
    images: [
      "/projects/real-estate-1.jpg",
      "/projects/real-estate-2.jpg",
    ],
    technologies: ["React", "Next.js", "Tailwind CSS", "SEO Optimization"],
    role: "Full-stack Developer",
    duration: "3 months",
    challenges: "Integrating dynamic listings with external API.",
    keyLearnings: "Learned advanced Next.js SSR and responsive design.",
  },
  {
    id: "data-dashboard",
    title: "Data Dashboard",
    desc: "Interactive analytics dashboard for a football data website",
    image: "/projects/football.jpg",
    category: "Data Analytics",
    details:
      "Designed a dashboard with real-time data of on-going matches, news, and players' statistics",
    link: "https://example-dashboard.com",
    images: ["/projects/football-1.jpg", "/projects/football-2.jpg"],
    technologies: ["React", "D3.js", "Node.js", "REST API"],
    role: "Frontend & Data Engineer",
    duration: "2 months",
    challenges: "Handling live data streaming without performance lags.",
    keyLearnings: "Optimized data visualization for real-time updates.",
  },
];
