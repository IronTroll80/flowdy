import type { Metadata } from "next";
import localFont from "next/font/local";
// @ts-ignore: allow side-effect import for global CSS without type declarations
import "./globals.css";
import { AuthProvider } from '@/context/AuthProvider';
import WelcomeModal from "./components/welcomeModal";

const dmsans = localFont({
  src: [
    {
      path: "./fonts/DMSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/DMSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/DMSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-dmsans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Flowdy",
  description: "Logistics made better with Flowdy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmsans.variable} antialiased`}>
        <AuthProvider>{children}<WelcomeModal /></AuthProvider>
      </body>
    </html>
  );
}
