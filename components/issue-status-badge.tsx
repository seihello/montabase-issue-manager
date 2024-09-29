import { IssueStatus } from "@/lib/types/issue-status.enum";

type Props = {
  status: IssueStatus;
  scale?: number;
};

export default function IssueStatusBadge({ status, scale }: Props) {
  switch (status) {
    case IssueStatus.Backlog:
      return (
        <div
          className="size-4 rounded-full border-2 border-dotted border-gray-700"
          style={{ scale: scale }}
        />
      );

    case IssueStatus.Todo:
      return (
        <div
          className="size-4 rounded-full border-2 border-gray-700"
          style={{ scale: scale }}
        />
      );

    case IssueStatus.InProgress:
      return (
        <div
          className="relative flex size-4 items-center justify-center rounded-full border-2 border-blue-500"
          style={{ scale: scale }}
        >
          <div className="absolute left-1/2 top-1/2 h-[10px] w-[5px] -translate-y-1/2 rounded-br-full rounded-tr-full bg-blue-500" />
        </div>
      );

    case IssueStatus.Done:
      return (
        <div
          className="relative flex size-4 items-center justify-center rounded-full border-2 border-green-500"
          style={{ scale: scale }}
        >
          <div className="absolute left-1/2 top-1/2 size-[8px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500" />
        </div>
      );

    case IssueStatus.Canceled:
      return (
        <div
          className="relative size-4 rounded-full border-2 border-red-500"
          style={{ scale: scale }}
        >
          <div className="absolute left-1/2 top-1/2 h-[2px] w-4 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-red-500" />
        </div>
      );

    default:
      return (
        <div
          className="size-4 rounded-full bg-gray-500"
          style={{ scale: scale }}
        />
      );
  }
}
