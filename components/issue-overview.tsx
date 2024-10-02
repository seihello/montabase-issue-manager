import IssuePrioritySelect from "@/components/issue-priority-select";
import IssueStatusBadge from "@/components/issue-status-badge";
import updateIssuePriority from "@/lib/supabase/update-issue-priority";
import { IssuePriority } from "@/lib/types/issue-priority.enum";
import { Issue } from "@/lib/types/issue.type";
import { issuesState } from "@/states/issues-state";
import { userState } from "@/states/user.state";
import { useDraggable } from "@dnd-kit/core";
import { useRouter } from "next/navigation";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toast } from "sonner";

type Props = {
  issue: Issue;
};

export default function IssueOverview({ issue }: Props) {
  const router = useRouter();

  const user = useRecoilValue(userState);
  const setIssues = useSetRecoilState(issuesState);

  const { setNodeRef, listeners, attributes, transform, isDragging } =
    useDraggable({
      id: issue.id,
    });
  const transformStyle = transform
    ? `translate(${transform.x}px, ${transform.y}px)`
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: transformStyle,
      }}
      className="flex h-20 flex-col items-end justify-center gap-y-2 rounded-md border bg-white p-2 shadow-sm"
      onClick={() => {
        router.push(`/${issue.id}`);
      }}
    >
      <div className="flex w-full items-center gap-x-1">
        <div className="shrink-0">
          <IssueStatusBadge status={issue.status} scale={0.8} />
        </div>
        <p className="issue-overview-title flex-1 hover:underline">
          {issue.title}
        </p>
      </div>
      <IssuePrioritySelect
        value={issue.priority || undefined}
        onValueChange={async (value) => {
          try {
            if (user)
              await updateIssuePriority(issue.id, value as IssuePriority);
            setIssues((oldIssues) =>
              oldIssues.map((oldIssue) =>
                oldIssue.id === issue.id
                  ? {
                      ...oldIssue,
                      priority: value as IssuePriority,
                    }
                  : oldIssue,
              ),
            );
            toast.success("Priority updated", {
              description: `${issue.title} - ${value}`,
              duration: 3000,
            });
          } catch (error) {
            console.error(error);
          }
        }}
        textHidden
      />
    </div>
  );
}
