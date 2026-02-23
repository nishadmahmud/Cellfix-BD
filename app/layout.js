import { Geist, Geist_Mono } from "next/font/google";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-800`}
      >
        <Header />
        <main className="min-h-screen flex flex-col bg-white">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
