import DatePicker from "@/components/date-picker";
import DeleteIssueDialog from "@/components/delete-issue-dialog";
import IssuePrioritySelect from "@/components/issue-priority-select";
import IssueStatusSelect from "@/components/issue-status-select";
import useUpdateIssue from "@/hooks/use-update-issue";
import { IssuePriority } from "@/lib/types/issue-priority.enum";
import { IssueStatus } from "@/lib/types/issue-status.enum";
import { Issue } from "@/lib/types/issue.type";
import { useDraggable } from "@dnd-kit/core";
import { useRouter } from "next/navigation";

type Props = {
  issue: Issue;
};

export default function IssueOverview({ issue }: Props) {
  const router = useRouter();

  const { setIssueStatus, setIssuePriority, setIssuePlannedEndDate } =
    useUpdateIssue(false);

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
      className="flex flex-col items-end justify-center gap-y-1 rounded-md border bg-white py-2 pl-3 pr-2 shadow-sm hover:bg-gray-50"
      onClick={() => {
        router.push(`/issue/${issue.id}`);
      }}
    >
      <p className="h-2 w-full text-xs font-bold text-gray-700">
        {/* TODO: Add a project name? */}
      </p>
      <div className="flex w-full items-center gap-x-1">
        {/* <div className="shrink-0">
          <IssueStatusBadge status={issue.status} scale={0.8} />
        </div> */}
        <p className="issue-overview-title flex-1 leading-4 hover:underline">
          {issue.title}
        </p>
      </div>
      <div className="flex gap-x-1">
        <IssueStatusSelect
          value={issue.status || undefined}
          onValueChange={async (value) => {
            setIssueStatus(issue.id, issue.title, value as IssueStatus);
          }}
          textHidden
        />
        <IssuePrioritySelect
          value={issue.priority || undefined}
          onValueChange={async (value) => {
            setIssuePriority(issue.id, issue.title, value as IssuePriority);
          }}
          textHidden
        />
        <DatePicker
          value={issue.planned_end_date || undefined}
          onValueChange={async (value) => {
            setIssuePlannedEndDate(issue.id, issue.title, value || null);
          }}
          yearHidden
        />
        <DeleteIssueDialog
          issueId={issue.id}
          issueTitle={issue.title}
          isOverview
        />
      </div>
    </div>
  );
}
