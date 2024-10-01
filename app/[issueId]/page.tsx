"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import getIssueById from "@/lib/supabase/get-issue-by-id";
import updateIssue from "@/lib/supabase/update-issue";
import { Issue } from "@/lib/types/issue.type";
import { useCallback, useEffect, useRef, useState } from "react";

export default function CourseSlugPage({
  params,
}: {
  params: { issueId: string };
}) {
  const [issue, setIssue] = useState<Issue>();

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchIssue = async () => {
      const issue = await getIssueById(params.issueId);
      setIssue(issue);
    };
    fetchIssue();
  }, [params.issueId]);

  const saveIssue = useCallback(async (issue: Issue) => {
    try {
      await updateIssue(issue);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (!issue || !issue.title) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      saveIssue(issue);
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [issue, saveIssue, timerRef]);

  if (!issue) return;

  return (
    <div className="flex flex-col gap-y-4 p-16">
      <Input
        value={issue.title}
        onChange={(e) =>
          setIssue((prev) =>
            prev ? { ...prev, title: e.target.value } : undefined,
          )
        }
        placeholder="Issue title"
        className={`border-none text-xl font-medium focus-visible:ring-0 focus-visible:ring-transparent`}
      />
      <Textarea
        value={issue.description || ""}
        onChange={(e) =>
          setIssue((prev) =>
            prev ? { ...prev, description: e.target.value } : undefined,
          )
        }
        placeholder="Add description here"
        className={`border-none focus-visible:ring-0 focus-visible:ring-transparent`}
      />
    </div>
  );
}
