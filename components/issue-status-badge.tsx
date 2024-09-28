import { IssueStatus } from "@/lib/types/issue-status.enum";

type Props = {
  status: IssueStatus;
};

export default function IssueStatusBadge({ status }: Props) {
  switch (status) {
    case IssueStatus.Backlog:
      return (
        <div className="size-4 rounded-full border-2 border-dotted border-gray-700" />
      );

    case IssueStatus.Todo:
      return <div className="size-4 rounded-full border-2 border-gray-700" />;

    case IssueStatus.InProgress:
      return (
        <div className="relative flex size-4 items-center justify-center rounded-full border-2 border-blue-500">
          <div className="absolute left-1/2 top-1/2 h-[10px] w-[5px] -translate-y-1/2 rounded-br-full rounded-tr-full bg-blue-500" />
        </div>
      );

    case IssueStatus.Done:
      return (
        <div className="relative flex size-4 items-center justify-center rounded-full border-2 border-green-500">
          <div className="absolute left-1/2 top-1/2 size-[8px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500" />
        </div>
      );

    case IssueStatus.Canceled:
      return <div className="size-4 rounded-full border-2 border-red-500" />;

    default:
      return <div className="size-4 rounded-full bg-gray-500" />;
  }
}
