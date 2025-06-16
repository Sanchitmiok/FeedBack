import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './globals.css'
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Suggestion Box",
  description: "FeedBack is a simple web app where users can create a public profile link and receive anonymous messages from others. Users can view and delete their messages and create an account. The app is built with Next.js and MongoDB.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
          {children}
          <Toaster />
          </body>
      </AuthProvider>
    </html>
  );
}
