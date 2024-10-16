import IssueOverview from "@/components/issue-overview";
import IssueStatusBadge from "@/components/issue-status-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { IssueStatus } from "@/lib/types/issue-status.enum";
import { issuesState } from "@/states/issues-state";
import { useDroppable } from "@dnd-kit/core";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";

type Props = {
  status: IssueStatus;
  isLoading: boolean;
};

export default function StatusIssues({ status, isLoading }: Props) {
  const issues = useRecoilValue(issuesState);
  const filteredIssues = useMemo(
    () => issues.filter((issue) => issue.status === status),
    [status, issues],
  );

  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex w-[22rem] shrink-0 flex-col gap-y-2 rounded-lg p-2 ${isOver ? "bg-gray-200" : "bg-gray-50"}`}
    >
      <div className="flex items-center gap-x-1.5">
        <IssueStatusBadge status={status} />
        <span className="font-semibold">{status}</span>
      </div>
      <div className="flex flex-col gap-y-2">
        {isLoading
          ? [...Array(3)].map((_, index) => (
              <Skeleton key={index} className="!h-16 rounded-md shadow-sm" />
            ))
          : filteredIssues.map((issue, index) => (
              <IssueOverview key={index} issue={issue} />
            ))}
      </div>
    </div>
  );
}
