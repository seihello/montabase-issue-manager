import IssueOverview from "@/components/issue-overview";
import { IssueStatus } from "@/lib/types/issue-status.enum";
import { issuesState } from "@/states/issues-state";
import { useRecoilValue } from "recoil";

type Props = {
  status: IssueStatus;
};

export default function StatusIssues({ status }: Props) {
  const issues = useRecoilValue(issuesState);
  const filteredIssues = issues.filter((issue) => issue.status === status);
  return (
    <div className="flex w-96 shrink-0 flex-col gap-y-2 rounded-lg bg-gray-50 p-2">
      <div>{status}</div>
      {filteredIssues.map((issue, index) => (
        <IssueOverview key={index} issue={issue} />
      ))}
    </div>
  );
}
