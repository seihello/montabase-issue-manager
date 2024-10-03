import updateIssuePlannedEndDate from "@/lib/supabase/update-issue-planned-end-date";
import updateIssuePriority from "@/lib/supabase/update-issue-priority";
import updateIssueStatus from "@/lib/supabase/update-issue-status";
import updateIssueTitle from "@/lib/supabase/update-issue-title";
import { IssuePriority } from "@/lib/types/issue-priority.enum";
import { IssueStatus } from "@/lib/types/issue-status.enum";
import { issueState } from "@/states/issue-state";
import { issuesState } from "@/states/issues-state";
import { userState } from "@/states/user-state";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toast } from "sonner";

export default function useUpdateIssue(isIndividual: boolean) {
  const user = useRecoilValue(userState);
  const setIssue = useSetRecoilState(issueState);
  const setIssues = useSetRecoilState(issuesState);

  const setIssueTitle = async (issueId: string, newTitle: string) => {
    try {
      if (user) await updateIssueTitle(issueId, newTitle);
      if (isIndividual) {
        setIssue((oldIssue) =>
          oldIssue
            ? {
                ...oldIssue,
                title: newTitle,
              }
            : null,
        );
      } else {
        setIssues((oldIssues) =>
          oldIssues.map((oldIssue) =>
            oldIssue.id === issueId
              ? {
                  ...oldIssue,
                  title: newTitle,
                }
              : oldIssue,
          ),
        );
      }

      toast.success("Title updated", {
        description: `${newTitle}`,
        duration: 3000,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const setIssueStatus = async (
    issueId: string,
    issueTitle: string,
    newStatus: IssueStatus,
  ) => {
    try {
      if (user) await updateIssueStatus(issueId, newStatus);
      if (isIndividual) {
        setIssue((oldIssue) =>
          oldIssue
            ? {
                ...oldIssue,
                status: newStatus,
              }
            : null,
        );
      } else {
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
      }

      toast.success("Status updated", {
        description: `${issueTitle} - ${newStatus}`,
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

      if (isIndividual) {
        setIssue((oldIssue) =>
          oldIssue
            ? {
                ...oldIssue,
                priority: newPriority,
              }
            : null,
        );
      } else {
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
      }

      toast.success("Priority updated", {
        description: `${issueTitle} - ${newPriority}`,
        duration: 3000,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const setIssuePlannedEndDate = async (
    issueId: string,
    issueTitle: string,
    newPlannedStartDate: Date | null,
  ) => {
    try {
      if (user) await updateIssuePlannedEndDate(issueId, newPlannedStartDate);

      if (isIndividual) {
        setIssue((oldIssue) =>
          oldIssue
            ? {
                ...oldIssue,
                planned_end_date: newPlannedStartDate,
              }
            : null,
        );
      } else {
        setIssues((oldIssues) =>
          oldIssues.map((oldIssue) =>
            oldIssue.id === issueId
              ? {
                  ...oldIssue,
                  planned_end_date: newPlannedStartDate,
                }
              : oldIssue,
          ),
        );
      }
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

  return {
    setIssueTitle,
    setIssueStatus,
    setIssuePriority,
    setIssuePlannedEndDate,
  };
}
