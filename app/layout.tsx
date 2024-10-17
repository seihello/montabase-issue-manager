import { Toaster } from "@/components/ui/toaster";
import RecoilRootView from "@/views/recoil-root-view";
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
        <RecoilRootView>{children}</RecoilRootView>
        <Toaster richColors closeButton />
      </body>
    </html>
  );
}
