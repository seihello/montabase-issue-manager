import IssuePriorityBadge from "@/components/issue-priority-badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IssuePriority } from "@/lib/types/issue-priority.enum";

type Props = {
  value: IssuePriority;
  onValueChange: (value: string) => void;
  textHidden?: boolean;
};

export default function IssuePrioritySelect({
  value,
  onValueChange,
  textHidden = false,
}: Props) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger>
            <SelectTrigger
              className={`${textHidden ? "chevron-hidden h-6 w-[32px] justify-center" : "w-[132px]"} py-1 focus:ring-1 focus:ring-offset-0 ${value ? "" : "text-muted-foreground"}`}
            >
              <div className="flex items-center justify-start gap-x-1">
                <IssuePriorityBadge
                  priority={value as IssuePriority}
                  scale={0.8}
                />
                {!textHidden && <span>{value}</span>}
              </div>
            </SelectTrigger>
          </TooltipTrigger>
          {textHidden && (
            <TooltipContent className="text-xs">{`Priority: ${value}`}</TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
      <SelectContent className="w-[180px]">
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
