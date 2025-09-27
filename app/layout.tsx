import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
export const metadata: Metadata = {
  title: "Horizon Global Solutions LLC",
  description: "Professional web, software, data, and consulting services",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        {/* 👇 This pushes all content below the sticky navbar */}
        <div className="pt-24">{children}</div>
      </body>
    </html>
  );
}
