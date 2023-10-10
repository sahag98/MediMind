import Navbar from "@/components/navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ConvexClientProvider from "./ConvexClientProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MediMind",
  description:
    "Experience instant symptom analysis with our advanced AI doctor.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClientProvider>
          <main className="md:px-24 flex justify-center relative bg-white">
            <Navbar />
          </main>
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
