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
    desc: "Custom-built website for a financial consultancy.",
    image: "/projects/1.jpg",
    category: "Web Development",
    details:
      "Developed a fully responsive, SEO-optimized corporate website with CMS integration and analytics tracking.",
  },
  {
    id: "ecommerce-platform",
    title: "E-commerce Platform",
    desc: "Scalable online store with payment integration.",
    image: "/projects/2.jpg",
    category: "Web Development",
    details:
      "Built a robust e-commerce platform with product management, checkout system, and inventory automation.",
  },
  {
    id: "branding-logo-design",
    title: "Branding & Logo Design",
    desc: "Professional visual identity and branding solutions.",
    image: "/projects/3.jpg",
    category: "Design",
    details:
      "Created a unique brand identity including logo, typography, and style guide for consistent marketing.",
  },
  {
    id: "data-dashboard",
    title: "Data Dashboard",
    desc: "Interactive analytics dashboard for business insights.",
    image: "/projects/4.jpg",
    category: "Data Analytics",
    details:
      "Designed a dashboard with real-time data visualization, charts, and KPIs for actionable insights.",
  },
  {
    id: "marketing-campaign",
    title: "Marketing Campaign",
    desc: "Creative campaign that increased client engagement.",
    image: "/projects/5.jpg",
    category: "Marketing",
    details:
      "Executed a targeted digital marketing campaign, increasing engagement by 45% across social channels.",
  },
  {
    id: "mobile-app",
    title: "Mobile App",
    desc: "Cross-platform mobile app for e-commerce and services.",
    image: "/projects/6.jpg",
    category: "Software",
    details:
      "Developed a cross-platform mobile app with smooth UX, push notifications, and backend integration.",
  },
];
