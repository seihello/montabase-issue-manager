import { Issue } from "@/lib/types/issue.type";

type Props = {
  issue: Issue;
};

export default function IssueOverview({ issue }: Props) {
  return (
    <div className="flex flex-col rounded-md border bg-white p-2 shadow-sm">
      <div>{issue.title}</div>
      <div>{issue.status}</div>
    </div>
  );
}
