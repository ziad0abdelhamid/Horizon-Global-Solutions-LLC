// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 py-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <p>&copy; {new Date().getFullYear()} Horizon Global Solutions LLC</p>
        <nav className="flex gap-6 text-sm">
          <a href="#services" className="hover:text-white">Services</a>
          <a href="#about" className="hover:text-white">About</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </nav>
      </div>
    </footer>
  );
}
