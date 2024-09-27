"use client";
import IssueOverview from "@/components/issue-overview";
import getAllIssues from "@/lib/supabase/get-all-issues";
import { Issue } from "@/lib/types/issue.type";
import { useEffect, useState } from "react";

export default function Home() {
  const [issues, setIssues] = useState<Issue[]>([]);
  useEffect(() => {
    const fetchIssues = async () => {
      const issues = await getAllIssues();
      setIssues(issues);
    };
    fetchIssues();
  }, []);

  return (
    <div className="flex w-96 flex-col p-2">
      {issues.map((issue, index) => (
        <IssueOverview key={index} issue={issue}></IssueOverview>
      ))}
    </div>
  );
}
