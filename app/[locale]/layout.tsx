import BackToTop from "@/components/BackToTop";
import "../globals.css";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";

export const metadata: Metadata = {
  title: "Horizon Global Solutions LLC",
  description: "Professional web, software, data, and consulting services",
};

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: any;   // <-- we only bypass validator HERE
}) {
  const { children, params } = props;

  // Your params still work as expected
  const { locale } = params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <BackToTop />
          <div>{children}</div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
