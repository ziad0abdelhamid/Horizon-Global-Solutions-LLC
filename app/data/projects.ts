export interface Project {
  id: string;
  title: string;
  desc: string;
  image: string;
  category: string;
  link?: string;
  details?: string;
}

export const projects: Project[] = [
  {
    id: "corporate-website",
    title: "Corporate Website",
    desc: "Custom-built website for a real estate company",
    image: "/projects/real-estate.jpg",
    category: "Web Development",
    details:
      "Developed a fully responsive, SEO-optimized corporate website.",
  },
  {
    id: "data-dashboard",
    title: "Data Dashboard",
    desc: "Interactive analytics dashboard for a foot-ball data website",
    image: "/projects/football.jpg",
    category: "Data Analytics",
    details:
      "Designed a dashboard with real-time data of on-going matches, news and player's statistics",
  },
];
