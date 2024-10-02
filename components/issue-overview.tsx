import IssueStatusBadge from "@/components/issue-status-badge";
import { Issue } from "@/lib/types/issue.type";
import { useDraggable } from "@dnd-kit/core";
import { useRouter } from "next/navigation";

type Props = {
  issue: Issue;
};

export default function IssueOverview({ issue }: Props) {
  const router = useRouter();
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
      onClick={() => {
        router.push(`/${issue.id}`);
      }}
    >
      <div className="flex items-center gap-x-1">
        <div className="shrink-0">
          <IssueStatusBadge status={issue.status} scale={0.8} />
        </div>
        <span className="flex-1 overflow-hidden overflow-ellipsis whitespace-nowrap hover:underline">
          {issue.title}
        </span>
      </div>
    </div>
  );
}
