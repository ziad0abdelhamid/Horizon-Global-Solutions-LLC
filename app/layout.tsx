import './globals.css'
import Navbar from '@/components/Navbar'


export const metadata = {
title: 'Horizon Global Solutions',
description: 'Full-service business & tech solutions for startups and enterprises',
}


export default function RootLayout({ children }) {
return (
<html lang="en">
<body className="bg-white text-slate-900 antialiased">
<Navbar />
<main className="pt-20">{children}</main>
</body>
</html>
)
}