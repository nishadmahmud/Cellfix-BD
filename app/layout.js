import { Geist, Geist_Mono } from "next/font/google";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import MobileBottomNav from "../components/MobileBottomNav/MobileBottomNav";
import Providers from "../components/Providers";
import { getCategoriesFromServer } from "../lib/api";
import { Suspense } from "react";
import MetaPixel from "../components/MetaPixel";
import WhatsAppButton from "../components/Shared/WhatsAppButton";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Cellfix BD - Premium Device Repair & E-commerce",
  description: "Professional mobile, gadget repair, and e-commerce shop in Dhaka, Bangladesh.",
};

export default async function RootLayout({ children }) {
  let categories = [];
  try {
    const res = await getCategoriesFromServer();
    if (res?.success && res?.data) {
      categories = res.data;
    }
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-800 pb-16 md:pb-0`}
      >
        <Providers>
          <Header categories={categories} />
          <main className="min-h-screen flex flex-col bg-white">
            <Suspense fallback={null}>
              <MetaPixel />
            </Suspense>
            {children}
          </main>
          <MobileBottomNav />
          <WhatsAppButton />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
