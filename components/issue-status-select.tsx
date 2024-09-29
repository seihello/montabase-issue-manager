import IssueStatusBadge from "@/components/issue-status-badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IssueStatus } from "@/lib/types/issue-status.enum";

type Props = {
  value: IssueStatus;
  onValueChange: (value: string) => void;
};

export default function IssueStatusSelect({ value, onValueChange }: Props) {
  return (
    <Select
      value={value}
      onValueChange={onValueChange}
    >
      <SelectTrigger className="h-auto w-[120px] p-1 focus:ring-1 focus:ring-offset-0">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="w-[180px]">
        {Object.values(IssueStatus).map((status) => (
          <SelectItem key={status} value={status}>
            <div className="flex items-center justify-start gap-x-1">
              <IssueStatusBadge status={status} scale={0.8} />
              <span>{status}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
