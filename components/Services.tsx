interface Service {
title: string
desc: string
}


const services: Service[] = [
{ title: 'Web Development', desc: 'Custom websites, e-commerce, CMS and web apps.' },
{ title: 'Software & Programming', desc: 'Custom software, mobile apps and APIs.' },
{ title: 'Data Analytics', desc: 'Dashboards, BI and predictive analytics.' },
{ title: 'Financial Advisory', desc: 'Business planning, forecasts, investment advice.' },
{ title: 'Tech Consultancy', desc: 'Cloud, infra, security, and digital transformation.' },
{ title: 'Design & Branding', desc: 'Logos, UI/UX and marketing creatives.' },
{ title: 'Digital Marketing', desc: 'SEO, social, paid ads and content strategy.' },
]


export default function Services() {
return (
<section id="services" className="mt-8">
<h2 className="text-3xl font-semibold">Our Services</h2>
<div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
{services.map((s) => (
<div key={s.title} className="p-6 border rounded-lg hover:shadow">
<h3 className="font-semibold">{s.title}</h3>
<p className="mt-2 text-sm text-slate-600">{s.desc}</p>
</div>
))}
</div>
</section>
)
}