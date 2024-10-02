import IssuePriorityBadge from "@/components/issue-priority-badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IssuePriority } from "@/lib/types/issue-priority.enum";

type Props = {
  value: IssuePriority | "" | undefined;
  onValueChange: (value: string) => void;
};

export default function IssuePrioritySelect({ value, onValueChange }: Props) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        className={`h-auto w-[120px] px-2 py-1 focus:ring-1 focus:ring-offset-0 ${value ? "" : "text-muted-foreground"}`}
      >
        <SelectValue placeholder={"Priority"} />
      </SelectTrigger>
      <SelectContent className="w-[180px]">
        <SelectItem value={"No Priority"}>
          <div className="flex items-center justify-start gap-x-1">
            <IssuePriorityBadge priority={null} scale={0.8} />
            <span>No Priority</span>
          </div>
        </SelectItem>
        {Object.values(IssuePriority).map((priority) => (
          <SelectItem key={priority} value={priority}>
            <div className="flex items-center justify-start gap-x-1">
              <IssuePriorityBadge priority={priority} scale={0.8} />
              <span>{priority}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
