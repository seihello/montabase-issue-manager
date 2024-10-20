"use client";
import Auth from "@/components/auth";
import { RecoilRoot } from "recoil";

type Props = {
  children: React.ReactNode;
};

export default function ServerView({ children }: Props) {
  return (
    <RecoilRoot>
      <Auth />
      {children}
    </RecoilRoot>
  );
}
