import { Issue } from "@/lib/types/issue.type";

type Props = {
  issue: Issue;
};

export default function IssueOverview({ issue }: Props) {
  return (
    <div className="flex flex-col border bg-white p-2 shadow-sm">
      {issue.title}
    </div>
  );
}
