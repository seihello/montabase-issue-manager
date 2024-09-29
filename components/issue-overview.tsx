import IssueStatusBadge from "@/components/issue-status-badge";
import { Issue } from "@/lib/types/issue.type";
import { useDraggable } from "@dnd-kit/core";

type Props = {
  issue: Issue;
};

export default function IssueOverview({ issue }: Props) {
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
      className="flex h-16 flex-col justify-center rounded-md border bg-white p-2 shadow-sm"
    >
      <div className="flex items-center gap-x-1">
        <IssueStatusBadge status={issue.status} />
        <span>{issue.title}</span>
      </div>
    </div>
  );
}
