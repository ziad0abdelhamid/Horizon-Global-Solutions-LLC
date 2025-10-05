import "./globals.css";
import type { Metadata } from "next";
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
        
        {/* 👇 This pushes all content below the sticky navbar */}
        <div>{children}</div>
      </body>
    </html>
  );
}
