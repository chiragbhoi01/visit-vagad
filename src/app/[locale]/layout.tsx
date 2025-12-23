// file: src/app/[locale]/layout.tsx
import { Inter, Playfair_Display } from "next/font/google";
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import "./globals.css";
import { getTranslations } from "next-intl/server";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'metadata' });
 
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function RootLayout({
  children,
  params: { locale }
}: Readonly<RootLayoutProps>) {
  const messages = useMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="bg-background dark:bg-dark-background font-sans text-stone-800 dark:text-stone-200">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <NextIntlClientProvider locale={locale} messages={messages}>
                <Navbar />
                <main>{children}</main>
                <Footer />
            </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
