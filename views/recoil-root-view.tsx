"use client";
import { RecoilRoot } from "recoil";

type Props = {
  children: React.ReactNode;
};

export default function RecoilRootView({ children }: Props) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
