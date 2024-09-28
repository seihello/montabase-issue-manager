"use client";
import GoogleSignInButton from "@/components/google-sign-in-button";
import IssueOverview from "@/components/issue-overview";
import createClient from "@/lib/supabase/client";
import getAllIssues from "@/lib/supabase/get-all-issues";
import { Issue } from "@/lib/types/issue.type";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<any>();
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getSession();
      console.log("user", data.session?.user);
      setUser(user);
    };
    fetchUser();
  }, []);
  
  useEffect(() => {
    const fetchIssues = async () => {
      const issues = await getAllIssues();
      setIssues(issues);
    };
    fetchIssues();
  }, []);

  return (
    <div>
      <GoogleSignInButton />
      <div className="flex w-96 flex-col gap-y-2 p-2">
        {issues.map((issue, index) => (
          <IssueOverview key={index} issue={issue} />
        ))}
      </div>
    </div>
  );
}
