"use client";
import StatusIssues from "@/components/status-issues";
import getAllIssues from "@/lib/supabase/get-all-issues";
import { IssueStatus } from "@/lib/types/issue-status.enum";
import { issuesState } from "@/states/issues-state";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

export default function Home() {
  const setIssues = useSetRecoilState(issuesState);

  useEffect(() => {
    const fetchIssues = async () => {
      const issues = await getAllIssues();
      setIssues(issues);
    };
    fetchIssues();
  }, []);

  return (
    <div className="flex">
      <StatusIssues status={IssueStatus.Backlog} />
      <StatusIssues status={IssueStatus.Todo} />
      <StatusIssues status={IssueStatus.InProgress} />
      <StatusIssues status={IssueStatus.Done} />
      <StatusIssues status={IssueStatus.Canceled} />
    </div>
  );
}
