"use client";
import DatePicker from "@/components/date-picker";
import IssuePrioritySelect from "@/components/issue-priority-select";
import IssueStatusSelect from "@/components/issue-status-select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import getIssueById from "@/lib/supabase/get-issue-by-id";
import updateIssue from "@/lib/supabase/update-issue";
import { IssuePriority } from "@/lib/types/issue-priority.enum";
import { IssueStatus } from "@/lib/types/issue-status.enum";
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
      // TODO: update the issues state?
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
        className={`border-none text-2xl font-bold focus-visible:ring-0 focus-visible:ring-transparent`}
      />
      <Textarea
        value={issue.description || ""}
        onChange={(e) =>
          setIssue((prev) =>
            prev ? { ...prev, description: e.target.value } : undefined,
          )
        }
        placeholder="Add description here"
        className={`border-none text-base focus-visible:ring-0 focus-visible:ring-transparent`}
      />
      <div className="flex gap-x-2">
        <IssueStatusSelect
          value={issue.status}
          onValueChange={(value) => {
            setIssue((prev) =>
              prev ? { ...prev, status: value as IssueStatus } : undefined,
            );
          }}
        />
        <IssuePrioritySelect
          value={issue.priority || undefined}
          onValueChange={(value) => {
            setIssue((prev) =>
              prev ? { ...prev, priority: value as IssuePriority } : undefined,
            );
          }}
        />
        <DatePicker
          value={issue.planned_start_date || undefined}
          onValueChange={(value) => {
            setIssue((prev) =>
              prev ? { ...prev, planned_start_date: value || null } : undefined,
            );
          }}
        />
      </div>
    </div>
  );
}
