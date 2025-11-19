import BackToTop from "@/components/BackToTop";
import "../globals.css";
import type { Metadata } from "next";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '../../i18n/routing';

export const metadata: Metadata = {
  title: "Horizon Global Solutions LLC",
  description: "Professional web, software, data, and consulting services",
};

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const { children, params } = props;
  const { locale } = await params;
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as 'en' | 'ar')) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          {/* 👇 This pushes all content below the sticky navbar */}
          <BackToTop/>
          <div>{children}</div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
