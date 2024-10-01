"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import getIssueById from "@/lib/supabase/get-issue-by-id";
import { Issue } from "@/lib/types/issue.type";
import { useEffect, useState } from "react";

export default function CourseSlugPage({
  params,
}: {
  params: { issueId: string };
}) {
  const [issue, setIssue] = useState<Issue>();

  useEffect(() => {
    const fetchIssue = async () => {
      const issue = await getIssueById(params.issueId);
      setIssue(issue);
    };
    fetchIssue();
  }, [params.issueId]);

  if (!issue) return;

  return (
    <div className="flex flex-col gap-y-4 p-16">
      <Input
        value={issue.title}
        placeholder="Issue title"
        className={`border-none text-xl font-medium focus-visible:ring-0 focus-visible:ring-transparent`}
      />
      <Textarea
        value={issue.description || ""}
        placeholder="Add description here"
        className={`border-none focus-visible:ring-0 focus-visible:ring-transparent`}
      />
    </div>
  );
}
