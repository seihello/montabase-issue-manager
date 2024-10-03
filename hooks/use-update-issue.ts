import updateIssueStatus from "@/lib/supabase/update-issue-status";
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
    status: IssueStatus,
    title: string,
  ) => {
    try {
      if (user) await updateIssueStatus(issueId, status);
      setIssues((oldIssues) =>
        oldIssues.map((oldIssue) =>
          oldIssue.id === issueId
            ? {
                ...oldIssue,
                status,
              }
            : oldIssue,
        ),
      );
      toast.success("Status updated", {
        description: `${title} - ${status}`,
        duration: 3000,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return { setIssueStatus };
}
