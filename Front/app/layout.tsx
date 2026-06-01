import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";


//Import custom hook for validation of user permisions
import { usePermissions } from "@/hooks/AuthUserPermissions";

//Remove this after
import { MotionConfig } from "framer-motion";

import "./globals.css";

import { AuthProvider } from "@/context/Auth";
import { DocProvider } from "@/context/Doc";


import Header from "@/app/components/Structure/Header/Header";
import Footer from "@/app/components/Structure/Footer/Footer";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Godoc",
  description: "Gerenciador de consultas",
  icons: {
    icon: '/godoc-icon.svg',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

    <html lang="pt-BR">
      <body>
        <AuthProvider>
          <DocProvider>
            <div className="app">
            <Header />
            <main className="main">{children}</main>
            <Footer />
          </div>
          </DocProvider>
      </AuthProvider>
    </body>
    </html >
  );
}
