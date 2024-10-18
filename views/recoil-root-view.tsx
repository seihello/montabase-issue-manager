"use client";
import Auth from "@/components/auth";
import Sidebar from "@/components/sidebar";
import { RecoilRoot } from "recoil";

type Props = {
  children: React.ReactNode;
};

export default function RecoilRootView({ children }: Props) {
  return (
    <RecoilRoot>
      <Auth />
      <Sidebar />
      {children}
    </RecoilRoot>
  );
}
