import AddIssueDialog from "@/components/add-issue-dialog";
import IssueOverview from "@/components/issue-overview";
import IssueStatusBadge from "@/components/issue-status-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { IssueStatus } from "@/lib/types/issue-status.enum";
import { issuesState } from "@/states/issues-state";
import { DragOverlay, useDroppable } from "@dnd-kit/core";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";

type Props = {
  projectId?: string;
  status: IssueStatus;
  isLoading: boolean;
  activeId: string | null;
};

export default function StatusIssues({
  projectId,
  status,
  isLoading,
  activeId,
}: Props) {
  const issues = useRecoilValue(issuesState);
  const filteredIssues = useMemo(
    () =>
      issues.filter((issue) =>
        projectId
          ? issue.status === status && issue.project_id === projectId
          : issue.status === status,
      ),
    [projectId, status, issues],
  );

  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  const draggedIssue = filteredIssues.find((issue) => issue.id === activeId);

  return (
    <div
      ref={setNodeRef}
      className={`flex min-h-0 w-80 shrink-0 flex-col gap-y-2 rounded-lg p-2 ${isOver ? "bg-gray-200" : "bg-gray-50"}`}
    >
      <div className="flex items-center gap-x-1.5">
        <IssueStatusBadge status={status} />
        <span className="font-medium">{status}</span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-y-2 overflow-y-scroll">
        {isLoading ? (
          [...Array(3)].map((_, index) => (
            <Skeleton key={index} className="!h-16 rounded-md shadow-sm" />
          ))
        ) : filteredIssues.length === 0 ? (
          <div className="flex w-full flex-1 flex-col items-center justify-center gap-y-2">
            <div>No issues</div>
            <AddIssueDialog
              type="text"
              initialProjectId={projectId}
              initialStatus={status}
            />
          </div>
        ) : (
          <>
            {filteredIssues.map((issue) => (
              <IssueOverview key={issue.id} issue={issue} />
            ))}
            {activeId && draggedIssue && (
              <DragOverlay key={draggedIssue.id}>
                <IssueOverview issue={draggedIssue} />
              </DragOverlay>
            )}
          </>
        )}
      </div>
    </div>
  );
}
