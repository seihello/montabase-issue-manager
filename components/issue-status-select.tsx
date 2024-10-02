import IssueStatusBadge from "@/components/issue-status-badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { IssueStatus } from "@/lib/types/issue-status.enum";

type Props = {
  value: IssueStatus;
  onValueChange: (value: string) => void;
  textHidden?: boolean;
};

export default function IssueStatusSelect({
  value,
  onValueChange,
  textHidden = false,
}: Props) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        className={`h-auto ${textHidden ? "chevron-hidden w-[36px]" : "w-[120px]"} px-2 py-1 focus:ring-1 focus:ring-offset-0 ${value ? "" : "text-muted-foreground"}`}
      >
        <div className="flex items-center justify-start gap-x-1">
          <IssueStatusBadge status={value as IssueStatus} scale={0.8} />
          {!textHidden && <span>{value}</span>}
        </div>
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
