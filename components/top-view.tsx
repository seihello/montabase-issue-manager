"use client";
import createClient from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";
import Sidebar from "./sidebar";

type Props = {
  children: React.ReactNode;
};

export default function TopView({ children }: Props) {
  const [user, setUser] = useState<any>();
  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getSession();
      console.log("user", data.session?.user);
      setUser(user);
    };
    fetchUser();
  }, []);

  return (
    <RecoilRoot>
      <Sidebar />
      <main className="flex-1 bg-white p-4">{children}</main>
    </RecoilRoot>
  );
}
