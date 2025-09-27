// src/components/Services.tsx
const services = [
  { title: "Web Development", desc: "Custom, scalable websites.", icon: "💻" },
  { title: "Data Analytics", desc: "Actionable insights from your data.", icon: "📊" },
  { title: "Financial Advisory", desc: "Smart strategies for growth.", icon: "💰" },
  { title: "Software Programming", desc: "Robust modern applications.", icon: "⚙️" },
  { title: "Web & Logo Design", desc: "Unique, professional branding.", icon: "🎨" },
  { title: "Marketing Solutions", desc: "Creative campaigns that convert.", icon: "📢" },
  { title: "Tech Consultancy", desc: "Expert advice for scaling tech.", icon: "🤝" },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800">
          Our Services
        </h2>
        <p className="mt-4 text-center text-slate-600 max-w-2xl mx-auto">
          We provide comprehensive digital, financial, and consulting services
          to empower your business.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
          {services.map((s) => (
            <div
              key={s.title}
              className="p-8 rounded-2xl bg-white shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <div className="h-14 w-14 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mb-6 text-2xl">
                {s.icon}
              </div>
              <h3 className="font-semibold text-lg text-slate-800">{s.title}</h3>
              <p className="mt-3 text-slate-600 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
