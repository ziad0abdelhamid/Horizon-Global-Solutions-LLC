export interface Project {
  id: string;
  title: string;
  titleAr?: string; // Arabic title
  desc: string;
  descAr?: string; // Arabic description
  image: string;
  category: string;
  link?: string;
  details?: string;
  detailsAr?: string; // Arabic details
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
    titleAr: "موقع الشركة",
    desc: "Custom-built website for a real estate company",
    descAr: "موقع ويب مخصص لشركة عقارات",
    image: "/projects/real-estate.jpg",
    category: "Web Development",
    details: "Developed a fully responsive, SEO-optimized corporate website.",
    detailsAr: "تم تطوير موقع شركة متجاوب بالكامل ومحسن لمحركات البحث.",
    link: "https://www.immo-design.at",
    images: ["/projects/real-estate-1.jpg", "/projects/real-estate-2.jpg"],
    technologies: ["React", "Next.js", "Tailwind CSS", "SEO Optimization"],
    role: "Full-stack Developer",
    duration: "3 months",
    challenges: "Integrating dynamic listings with external API.",
    keyLearnings: "Learned advanced Next.js SSR and responsive design.",
  },
  {
    id: "data-dashboard",
    title: "Data Dashboard",
    titleAr: "لوحة بيانات",
    desc: "Interactive analytics dashboard for a football data website",
    descAr: "لوحة تحليلات تفاعلية لموقع بيانات كرة القدم",
    image: "/projects/football.jpg",
    category: "Data Analytics",
    details:
      "Designed a dashboard with real-time data of on-going matches, news, and players' statistics",
    detailsAr:
      "تم تصميم لوحة بيانات تحتوي على بيانات مباشرة للمباريات الجارية والأخبار وإحصائيات اللاعبين",
    link: "http://www.fel-maqas.com",
    images: ["/projects/football-1.jpg", "/projects/football-2.jpg"],
    technologies: ["React", "D3.js", "Node.js", "REST API"],
    role: "Frontend & Data Engineer",
    duration: "2 months",
    challenges: "Handling live data streaming without performance lags.",
    keyLearnings: "Optimized data visualization for real-time updates.",
  },
  {
    id: "qwsain",
    title: "Qwsain",
    titleAr: "قوسين",
    desc: "Blog website for learning programming.",
    descAr: "موقع مدونة لتعلم البرمجة",
    image: "/projects/qwsain/1.png",
    category: "Software Development",
    details: "Developed a blog platform to share programming tutorials and articles, with a custom dashboard and roles for managing posts.",
    detailsAr: "تم تطوير منصة مدونة لمشاركة دروس ومقالات البرمجة، مع لوحة تحكم مخصصة وأدوار لإدارة المشاركات.",
    link: "https://qwsain.com",
    images: [
      "/projects/qwsain/2.png",
      "/projects/qwsain/3.png",
      "/projects/qwsain/4.png",
      "/projects/qwsain/5.png",
      "/projects/qwsain/6.png",
      "/projects/qwsain/7.png",
      "/projects/qwsain/8.png",
      "/projects/qwsain/9.png",
      "/projects/qwsain/10.png",
      "/projects/qwsain/11.png",
      "/projects/qwsain/12.png",
      "/projects/qwsain/13.png",
      "/projects/qwsain/14.png",
      "/projects/qwsain/15.png",
      "/projects/qwsain/16.png",
      "/projects/qwsain/17.png",
      "/projects/qwsain/18.png",
      "/projects/qwsain/19.png",
      "/projects/qwsain/20.png",
      "/projects/qwsain/21.png",
      "/projects/qwsain/22.png",
      "/projects/qwsain/23.png",
    ],
    technologies: ["WordPress", "PHP", "MySQL", "CSS"],
    role: "Full-stack Developer",
    duration: "1 month",
    challenges: "Dashboard with multiple roles (admin, editor, reviewer) with a post lifecycle system and integrated chat.",
    keyLearnings: "Improved skills in content management and SEO strategies.",
  },
];
