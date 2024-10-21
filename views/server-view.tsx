"use client";
import Auth from "@/components/auth";
import { RecoilRoot } from "recoil";
import { Toaster } from "sonner";

type Props = {
  children: React.ReactNode;
};

export default function ServerView({ children }: Props) {
  return (
    <RecoilRoot>
      <Auth />
      <Toaster richColors closeButton />
      {children}
    </RecoilRoot>
  );
}
