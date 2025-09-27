import './globals.css'
import Navbar from '@components/Navbar'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Horizon Global Solutions',
  description: 'Full-service business & tech solutions for startups and enterprises',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900 antialiased">
        <Navbar />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  )
}
