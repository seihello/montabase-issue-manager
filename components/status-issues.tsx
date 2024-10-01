import IssueOverview from "@/components/issue-overview";
import IssueStatusBadge from "@/components/issue-status-badge";
import { IssueStatus } from "@/lib/types/issue-status.enum";
import { issuesState } from "@/states/issues-state";
import { useDroppable } from "@dnd-kit/core";
import { useRecoilValue } from "recoil";

type Props = {
  status: IssueStatus;
};

export default function StatusIssues({ status }: Props) {
  const issues = useRecoilValue(issuesState);
  const filteredIssues = issues.filter((issue) => issue.status === status);

  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex w-80 shrink-0 flex-col gap-y-2 rounded-lg p-2 ${isOver ? "bg-gray-200" : "bg-gray-50"}`}
    >
      <div className="flex items-center gap-x-1.5">
        <IssueStatusBadge status={status} />
        <span>{status}</span>
      </div>
      <div className="flex flex-col gap-y-2">
        {filteredIssues.map((issue, index) => (
          <IssueOverview key={index} issue={issue} />
        ))}
      </div>
    </div>
  );
}
