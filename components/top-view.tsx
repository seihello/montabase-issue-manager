"use client";
import Auth from "@/components/auth";
import { RecoilRoot } from "recoil";
import Sidebar from "./sidebar";

type Props = {
  children: React.ReactNode;
};

export default function TopView({ children }: Props) {
  return (
    <RecoilRoot>
      <Auth />
      <Sidebar />
      <main className="flex-1 overflow-x-scroll bg-white p-4">{children}</main>
    </RecoilRoot>
  );
}
