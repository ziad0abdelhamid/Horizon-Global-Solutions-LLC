export interface Project {
  id: string;
  title: string;
  titleAr?: string; // Arabic title
  desc: string;
  descAr?: string; // Arabic description
  image: string;
  category: string[] | string;
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
    id: "beirut-bites",
    title: "Beirut Bites",
    titleAr: "بيروت بايتس",
    desc: "Food blog website for Beirut's culinary scene.",
    descAr: "موقع مدونة للأطعمة لمشهد المطاعم في بيروت",
    image: "/projects/beirut-bites/bb1.jpg",
    category: ["webDevelopment"], // updated
    details:
      "Developed a full working webapp that can manage restaurant orders, menu, and reservations.",
    detailsAr:
      "تم تطوير تطبيق ويب كامل يمكنه إدارة طلبات المطاعم والقائمة وحجوزات الطعام.",
    link: "https://beirut-bites.vercel.app/",
    images: [
      "/projects/beirut-bites/bb1.jpg",
      "/projects/beirut-bites/bb2.jpg",
      "/projects/beirut-bites/bb3.jpg",
      "/projects/beirut-bites/bb4.jpg",
      "/projects/beirut-bites/bb5.jpg",
      "/projects/beirut-bites/bb6.jpg",
      "/projects/beirut-bites/bb7.jpg",
    ],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "CSS"],
    role: "Full-stack Developer",
    duration: "1 month",
    challenges:
      "Creating a user-friendly interface for both customers and restaurant staff.",
    keyLearnings:
      "Enhanced skills in full-stack development and database management.",
  },
  {
    id: "histology",
    title: "Histology",
    titleAr: "هستولوجي",
    desc: "Teaching website for studying World's History and Prophet's History.",
    descAr: "موقع تعليمي لدراسة تاريخ العالم وتاريخ النبي.",
    image: "/projects/histology/h1.jpg",
    category: ["software"],
    details:
      "Developed a teaching platform with interactive lessons and quizzes on historical topics.",
    detailsAr:
      "تم تطوير منصة تعليمية تفاعلية مع دروس واختبارات حول المواضيع التاريخية.",
    link: "https://histology.vercel.app/",
    images: [
      "/projects/histology/h1.jpg",
      "/projects/histology/h2.jpg",
      "/projects/histology/h3.jpg",
      "/projects/histology/h4.jpg",
      "/projects/histology/h5.jpg",
      "/projects/histology/h6.jpg",
      "/projects/histology/h7.jpg",
      "/projects/histology/h8.jpg",
    ],
    technologies: [
      "React.js",
      "TypeScript",
      "PostgreSQL",
      "Vite",
      "Android Development",
    ],
    role: "Full-stack Developer",
    duration: "3 month",
    challenges:
      "Designing interactive content that engages users in learning history.",
    keyLearnings:
      "Gained experience in educational technology and user engagement strategies.",
  },
  {
    id: "qwsain",
    title: "Qwsain",
    titleAr: "قوسين",
    desc: "Blog website for learning programming.",
    descAr: "موقع مدونة لتعلم البرمجة",
    image: "/projects/qwsain/1.png",
    category: "software", // updated
    details:
      "Developed a blog platform to share programming tutorials and articles, with a custom dashboard and roles for managing posts.",
    detailsAr:
      "تم تطوير منصة مدونة لمشاركة دروس ومقالات البرمجة، مع لوحة تحكم مخصصة وأدوار لإدارة المشاركات.",
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
    challenges:
      "Dashboard with multiple roles (admin, editor, reviewer) with a post lifecycle system and integrated chat.",
    keyLearnings: "Improved skills in content management and SEO strategies.",
  },
  {
    id: "corporate-website",
    title: "Corporate Website",
    titleAr: "موقع الشركة",
    desc: "Custom-built website for a real estate company",
    descAr: "موقع ويب مخصص لشركة عقارات",
    image: "/projects/real-estate/real-estate.jpg",
    category: "webDevelopment", // updated
    details: "Developed a fully responsive, SEO-optimized corporate website.",
    detailsAr: "تم تطوير موقع شركة متجاوب بالكامل ومحسن لمحركات البحث.",
    link: "https://www.immo-design.at",
    images: [
      "/projects/real-estate/real-estate.jpg",
      "/projects/real-estate/real-estate-2.jpg",
      "/projects/real-estate/real-estate-3.jpg",
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
    titleAr: "لوحة بيانات",
    desc: "Interactive analytics dashboard for a football data website",
    descAr: "لوحة تحليلات تفاعلية لموقع بيانات كرة القدم",
    image: "/projects/fel-maqas/football.jpg",
    category: "dataAnalytics", // updated
    details:
      "Designed a dashboard with real-time data of on-going matches, news, and players' statistics",
    detailsAr:
      "تم تصميم لوحة بيانات تحتوي على بيانات مباشرة للمباريات الجارية والأخبار وإحصائيات اللاعبين",
    link: "http://www.fel-maqas.com",
    images: [
      "/projects/fel-maqas/football.jpg",
      "/projects/fel-maqas/football-2.jpg",
      "/projects/fel-maqas/football-3.jpg",
    ],
    technologies: ["React", "D3.js", "Node.js", "REST API"],
    role: "Frontend & Data Engineer",
    duration: "2 months",
    challenges: "Handling live data streaming without performance lags.",
    keyLearnings: "Optimized data visualization for real-time updates.",
  },
  {
    id: "em-russia",
    title: "EM Russia",
    titleAr: "الاتحاد الروسي",
    desc: "Marketing campaign for a tourism company that included a website, social media campaigns and promotional videos.",
    descAr:
      "حملة تسويقية لشركة سياحة شملت موقعًا إلكترونيًا وحملات على وسائل التواصل الاجتماعي وفيديوهات ترويجية.",
    image: "/projects/em-russia/r1.jpg",
    category: ["marketing"], // updated
    details:
      "Developed a comprehensive marketing campaign to boost tourism to Russia, including a responsive website, targeted social media ads, and engaging promotional videos.",
    detailsAr:
      "تم تطوير حملة تسويقية شاملة لتعزيز السياحة إلى روسيا، بما في ذلك موقع إلكتروني متجاوب، وإعلانات مستهدفة على وسائل التواصل الاجتماعي، وفيديوهات ترويجية جذابة.",
    link: "https://em-russia.vercel.app/",
    images: [
      "/projects/em-russia/r1.jpg",
      "/projects/em-russia/r2.jpg",
      "/projects/em-russia/r3.jpg",
    ],
    technologies: [
      "React",
      "TypeScript",
      "CSS",
      "Facebook Ads",
      "Adobe Premiere Pro",
    ],
    role: "Marketing Specialist & Web Developer",
    duration: "3 month",
    challenges:
      "Managing multiple marketing channels and coordinating with external agencies.",
    keyLearnings:
      "Gained experience in digital marketing strategies and cross-platform promotion.",
  },
];
