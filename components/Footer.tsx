export default function Footer(){
return (
<footer className="mt-20 border-t py-8">
<div className="container flex flex-col md:flex-row justify-between items-center gap-4">
<div className="flex items-center gap-3">
<img src="/logo.svg" alt="logo" className="h-8 w-8" />
<div>
<div className="font-semibold">Horizon Global Solutions LLC</div>
<div className="text-sm text-slate-600">© {new Date().getFullYear()} All rights reserved.</div>
</div>
</div>
<nav className="text-sm">
<a href="#" className="mr-4">Privacy</a>
<a href="#" className="mr-4">Terms</a>
<a href="#">Contact</a>
</nav>
</div>
</footer>
)
}