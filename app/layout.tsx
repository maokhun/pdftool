import "./globals.css";
import type { Metadata } from "next";
import { Sora, Work_Sans } from "next/font/google";
import Layout from "@/components/Layout";

const bodyFont = Work_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

const headingFont = Sora({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Nimbus PDF Tools",
  description: "Modern PDF tools dashboard with AI-powered features."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${bodyFont.variable} ${headingFont.variable} text-slate-900 dark:text-slate-100`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
