"use client";
import StatusIssues from "@/components/status-issues";
import getAllIssues from "@/lib/supabase/get-all-issues";
import updateIssueStatus from "@/lib/supabase/update-issue-status";
import { IssueStatus } from "@/lib/types/issue-status.enum";
import { issuesState } from "@/states/issues-state";
import { userState } from "@/states/user.state";
import { DndContext, pointerWithin } from "@dnd-kit/core";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function Home() {
  const setIssues = useSetRecoilState(issuesState);
  const user = useRecoilValue(userState);

  useEffect(() => {
    const fetchIssues = async () => {
      const issues = await getAllIssues();
      setIssues(issues);
    };
    if (user) fetchIssues();
  }, [user]);

  return (
    <div className="flex gap-x-2">
      <DndContext
        collisionDetection={pointerWithin}
        onDragEnd={async (event) => {
          if (event.over === null) return;
          const targetIssueStatus = event.over.id;
          const droppedIssueId = event.active.id;

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
        }}
      >
        {Object.values(IssueStatus).map((status) => (
          <StatusIssues key={status} status={status} />
        ))}
      </DndContext>
    </div>
  );
}
