import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./companent/navbar";
import { Toaster } from 'react-hot-toast';
import { LanguageProvider } from "./contexts/LanguageContext";

export const metadata: Metadata = {
  title: "DeepHist",
  description: "DeepHist",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <Toaster position="top-center" />
          <Navbar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
