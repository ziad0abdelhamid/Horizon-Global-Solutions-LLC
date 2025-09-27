import Hero from '../components/Hero'
import Services from '../components/Services'
import ContactForm from '../components/ContactForm'
import Footer from '../components/Footer'


export default function Home() {
return (
<>
<Hero />
<div className="container mt-12">
<Services />
<section id="about" className="mt-16">
<h2 className="text-2xl font-semibold">About Horizon Global Solutions</h2>
<p className="mt-3 max-w-3xl">We provide end-to-end digital, financial, and technology services designed to launch and scale startups and modernize established businesses.</p>
</section>


<section id="contact" className="mt-16">
<h2 className="text-2xl font-semibold">Contact Us</h2>
<p className="mt-2">Send us a message and we'll get back within one business day.</p>
<ContactForm />
</section>
</div>
<Footer />
</>
)
}