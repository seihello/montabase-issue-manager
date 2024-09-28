"use client";
import IssueOverview from "@/components/issue-overview";
import getAllIssues from "@/lib/supabase/get-all-issues";
import { issuesState } from "@/states/issues-state";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function Home() {
  const issues = useRecoilValue(issuesState);
  const setIssues = useSetRecoilState(issuesState);

  useEffect(() => {
    const fetchIssues = async () => {
      const issues = await getAllIssues();
      setIssues(issues);
    };
    fetchIssues();
  }, []);

  console.log("issues", issues);
  return (
    <div>
      <div className="flex w-96 flex-col gap-y-2 p-2">
        {issues.map((issue, index) => (
          <IssueOverview key={index} issue={issue} />
        ))}
      </div>
    </div>
  );
}
