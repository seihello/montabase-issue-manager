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
        height: "fit-content",
      }}
      className="flex flex-col rounded-md border bg-white p-2 shadow-sm"
    >
      <div>{issue.title}</div>
      <div>{issue.status}</div>
    </div>
  );
}
