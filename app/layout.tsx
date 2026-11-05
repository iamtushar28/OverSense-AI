import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DashboardLayout from "./components/DashboardLayout";
import ReduxProviderClient from "@/lib/redux/ReduxProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OverSense AI | Live Cricket Intelligence",
  description: "AI-powered live cricket intelligence and match analysis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-full overflow-hidden bg-[#fafaff] font-sans">
        <ReduxProviderClient>
          <DashboardLayout>
            {children}
          </DashboardLayout>
        </ReduxProviderClient>
      </body>
    </html>
  );
}