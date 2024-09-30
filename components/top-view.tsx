"use client";
import Auth from "@/components/auth";
import { useState } from "react";
import { RecoilRoot } from "recoil";
import Sidebar from "./sidebar";

type Props = {
  children: React.ReactNode;
};

export default function TopView({ children }: Props) {
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  return (
    <RecoilRoot>
      <Auth setIsLoadingUser={setIsLoadingUser} />
      <Sidebar isLoadingUser={isLoadingUser} />
      <main className="flex-1 overflow-x-scroll bg-white p-4">{children}</main>
    </RecoilRoot>
  );
}
