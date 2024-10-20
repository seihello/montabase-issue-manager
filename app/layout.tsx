import ServerView from "@/views/server-view";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Montabase",
  description: "Manage your tasks",
};

const rubik = Rubik({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${rubik.className} flex w-screen bg-white text-sm text-gray-900 antialiased`}
      >
        <ServerView>{children}</ServerView>
      </body>
    </html>
  );
}
