export default function Navbar() {
return (
<header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b z-40">
<div className="container flex items-center justify-between h-16">
<div className="flex items-center gap-3">
<img src="/logo.svg" alt="logo" className="h-8 w-8" />
<span className="font-semibold">Horizon Global Solutions</span>
</div>
<nav className="hidden md:flex gap-6 text-sm">
<a href="#services" className="hover:underline">Services</a>
<a href="#about" className="hover:underline">About</a>
<a href="#contact" className="hover:underline">Contact</a>
</nav>
</div>
</header>
)
}