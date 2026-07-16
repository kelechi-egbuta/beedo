import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CrmProvider } from "@/lib/store";
import Sidebar from "@/components/Sidebar";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata = {
  title: "beedo — Leads & Sales CRM",
  description: "A simple, intuitive CRM for managing leads and sales.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${mono.variable}`}>
      <body className="font-body bg-paper text-ink">
        <CrmProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 min-w-0">{children}</main>
          </div>
        </CrmProvider>
      </body>
    </html>
  );
}
