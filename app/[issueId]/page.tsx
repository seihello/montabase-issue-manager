"use client";
import DatePicker from "@/components/date-picker";
import IssuePrioritySelect from "@/components/issue-priority-select";
import IssueStatusSelect from "@/components/issue-status-select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useUpdateIssue from "@/hooks/use-update-issue";
import getIssueById from "@/lib/supabase/get-issue-by-id";
import { IssuePriority } from "@/lib/types/issue-priority.enum";
import { IssueStatus } from "@/lib/types/issue-status.enum";
import { issueState } from "@/states/issue-state";
import { useEffect, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function CourseSlugPage({
  params,
}: {
  params: { issueId: string };
}) {
  const issue = useRecoilValue(issueState);
  const setIssue = useSetRecoilState(issueState);

  const { setIssueStatus, setIssuePriority, setIssuePlannedEndDate } =
    useUpdateIssue(true);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchIssue = async () => {
      const issue = await getIssueById(params.issueId);
      setIssue(issue);
    };
    fetchIssue();
  }, [params.issueId, setIssue]);

  // const saveIssue = useCallback(async (issue: Issue) => {
  //   try {
  //     await updateIssue(issue);

  //     toast.success("Issue updated", {
  //       description: issue.title,
  //       duration: 3000,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (!issue || !issue.title) return;

  //   if (timerRef.current) {
  //     clearTimeout(timerRef.current);
  //   }

  //   timerRef.current = setTimeout(() => {
  //     // TODO: update the issues state?
  //     saveIssue(issue);
  //   }, 1000);

  //   return () => {
  //     if (timerRef.current) {
  //       clearTimeout(timerRef.current);
  //     }
  //   };
  // }, [issue, saveIssue, timerRef]);

  if (!issue) return;

  return (
    <div className="flex flex-col gap-y-4 p-16">
      <Input
        value={issue.title}
        onChange={(e) =>
          setIssue((prev) => (prev ? { ...prev, title: e.target.value } : null))
        }
        placeholder="Issue title"
        className={`border-none text-2xl font-bold focus-visible:ring-0 focus-visible:ring-transparent`}
      />
      <Textarea
        value={issue.description || ""}
        onChange={(e) =>
          setIssue((prev) =>
            prev ? { ...prev, description: e.target.value } : null,
          )
        }
        placeholder="Add description here"
        className={`border-none text-base focus-visible:ring-0 focus-visible:ring-transparent`}
      />
      <div className="flex gap-x-2">
        <IssueStatusSelect
          value={issue.status}
          onValueChange={(value) => {
            setIssueStatus(issue.id, issue.title, value as IssueStatus);
          }}
        />
        <IssuePrioritySelect
          value={issue.priority || undefined}
          onValueChange={(value) => {
            setIssuePriority(issue.id, issue.title, value as IssuePriority);
          }}
        />
        <DatePicker
          value={issue.planned_end_date || undefined}
          onValueChange={(value) => {
            setIssuePlannedEndDate(issue.id, issue.title, value || null);
          }}
        />
      </div>
    </div>
  );
}
