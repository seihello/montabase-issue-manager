"use client";
import { useRouter } from "next/navigation";

export default function TopPage() {
  const router = useRouter();
  router.replace("/project/all");
}
