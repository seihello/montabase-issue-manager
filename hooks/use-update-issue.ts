import updateIssuePlannedStartDate from "@/lib/supabase/update-issue-planned-start-date";
import updateIssuePriority from "@/lib/supabase/update-issue-priority";
import updateIssueStatus from "@/lib/supabase/update-issue-status";
import { IssuePriority } from "@/lib/types/issue-priority.enum";
import { IssueStatus } from "@/lib/types/issue-status.enum";
import { issuesState } from "@/states/issues-state";
import { userState } from "@/states/user-state";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toast } from "sonner";

export default function useUpdateIssue() {
  const user = useRecoilValue(userState);
  const setIssues = useSetRecoilState(issuesState);

  const setIssueStatus = async (
    issueId: string,
    issueTitle: string,
    newStatus: IssueStatus,
  ) => {
    try {
      if (user) await updateIssueStatus(issueId, newStatus);
      setIssues((oldIssues) =>
        oldIssues.map((oldIssue) =>
          oldIssue.id === issueId
            ? {
                ...oldIssue,
                status: newStatus,
              }
            : oldIssue,
        ),
      );
      toast.success("Status updated", {
        description: `${issueTitle} - ${status}`,
        duration: 3000,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const setIssuePriority = async (
    issueId: string,
    issueTitle: string,
    newPriority: IssuePriority,
  ) => {
    try {
      if (user) await updateIssuePriority(issueId, newPriority);
      setIssues((oldIssues) =>
        oldIssues.map((oldIssue) =>
          oldIssue.id === issueId
            ? {
                ...oldIssue,
                priority: newPriority,
              }
            : oldIssue,
        ),
      );
      toast.success("Priority updated", {
        description: `${issueTitle} - ${newPriority}`,
        duration: 3000,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const setIssuePlannedStartDate = async (
    issueId: string,
    issueTitle: string,
    newPlannedStartDate: Date | null,
  ) => {
    try {
      if (user) await updateIssuePlannedStartDate(issueId, newPlannedStartDate);
      setIssues((oldIssues) =>
        oldIssues.map((oldIssue) =>
          oldIssue.id === issueId
            ? {
                ...oldIssue,
                planned_start_date: newPlannedStartDate,
              }
            : oldIssue,
        ),
      );
      toast.success("Planned start date updated", {
        description: `${issueTitle} - ${
          newPlannedStartDate
            ? newPlannedStartDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "Not set"
        }`,
        duration: 3000,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return { setIssueStatus, setIssuePriority, setIssuePlannedStartDate };
}
