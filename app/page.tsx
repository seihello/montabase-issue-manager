"use client";
import StatusIssues from "@/components/status-issues";
import getAllIssues from "@/lib/supabase/get-all-issues";
import { IssueStatus } from "@/lib/types/issue-status.enum";
import { issuesState } from "@/states/issues-state";
import { DndContext, pointerWithin } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

export default function Home() {
  const setIssues = useSetRecoilState(issuesState);
  const [activeIssueId, setActiveIssueId] = useState<string | null>(null);

  useEffect(() => {
    const fetchIssues = async () => {
      const issues = await getAllIssues();
      setIssues(issues);
    };
    fetchIssues();
  }, []);

  return (
    <div className="flex gap-x-2">
      <DndContext
        collisionDetection={pointerWithin}
        onDragEnd={(event) => {
          console.log("Dropped Issue", event.active.id);
          if (event.over === null) return;
          console.log("Dropped Status", event.over.id);
        }}
      >
        <StatusIssues
          status={IssueStatus.Backlog}
          activeIssueId={activeIssueId}
          setActiveIssueId={setActiveIssueId}
        />
        <StatusIssues
          status={IssueStatus.Todo}
          activeIssueId={activeIssueId}
          setActiveIssueId={setActiveIssueId}
        />
        <StatusIssues
          status={IssueStatus.InProgress}
          activeIssueId={activeIssueId}
          setActiveIssueId={setActiveIssueId}
        />
        <StatusIssues
          status={IssueStatus.Done}
          activeIssueId={activeIssueId}
          setActiveIssueId={setActiveIssueId}
        />
        <StatusIssues
          status={IssueStatus.Canceled}
          activeIssueId={activeIssueId}
          setActiveIssueId={setActiveIssueId}
        />
      </DndContext>
    </div>
  );
}
