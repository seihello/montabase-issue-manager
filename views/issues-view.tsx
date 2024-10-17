"use client";
import StatusIssues from "@/components/status-issues";
import updateIssueStatus from "@/lib/supabase/update-issue-status";
import { IssueStatus } from "@/lib/types/issue-status.enum";
import { issuesState } from "@/states/issues-state";
import { userState } from "@/states/user-state";
import {
  DndContext,
  PointerSensor,
  pointerWithin,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toast } from "sonner";

type Props = {
  projectId?: string;
  isLoading: boolean;
};

export default function IssuesView({ projectId, isLoading }: Props) {
  const issues = useRecoilValue(issuesState);
  const setIssues = useSetRecoilState(issuesState);
  const user = useRecoilValue(userState);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  return (
    <div className="flex flex-1 gap-x-2">
      <DndContext
        sensors={sensors}
        collisionDetection={pointerWithin}
        onDragEnd={async (event) => {
          if (event.over === null) return;
          const targetIssueStatus = event.over.id;
          const droppedIssueId = event.active.id;

          let targetIssue = issues.find((issue) => issue.id === droppedIssueId);
          if (!targetIssue) return;

          if (targetIssueStatus === targetIssue.status) return;

          setIssues((oldIssues) =>
            oldIssues.map((issue) =>
              issue.id === droppedIssueId
                ? {
                    ...issue,
                    status: targetIssueStatus as IssueStatus,
                  }
                : issue,
            ),
          );

          // Save the status to the database if the user is signed in
          if (user) {
            await updateIssueStatus(
              droppedIssueId.toString(),
              targetIssueStatus as IssueStatus,
            );
          }

          toast.success("Status updated", {
            description: `${targetIssue.title} - ${targetIssueStatus}`,
            duration: 3000,
          });
        }}
      >
        {Object.values(IssueStatus).map((status) => (
          <StatusIssues
            key={status}
            projectId={projectId}
            status={status}
            isLoading={isLoading}
          />
        ))}
      </DndContext>
    </div>
  );
}
