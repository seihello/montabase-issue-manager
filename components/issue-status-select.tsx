import IssueStatusBadge from "@/components/issue-status-badge";
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
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <SelectTrigger
              className={`${textHidden ? "chevron-hidden h-6 w-[32px] justify-center" : "w-[144px]"} py-1 focus:ring-1 focus:ring-offset-0`}
            >
              <div className="flex items-center justify-start gap-x-1">
                <IssueStatusBadge status={value as IssueStatus} scale={0.8} />
                {!textHidden && <span>{value}</span>}
              </div>
            </SelectTrigger>
          </TooltipTrigger>
          {textHidden && (
            <TooltipContent className="text-xs">{`Status: ${value}`}</TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
      <SelectContent
        className="w-[180px]"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
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
