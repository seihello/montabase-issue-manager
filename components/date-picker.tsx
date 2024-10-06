"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { IconCalendarFilled } from "@tabler/icons-react";

type Props = {
  value: Date | undefined;
  onValueChange: (value: Date | undefined) => void;
  yearHidden?: boolean;
};

export default function DatePicker({
  value,
  onValueChange,
  yearHidden = false,
}: Props) {
  return (
    <Popover>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "px-2 text-left font-normal hover:bg-transparent",
                  yearHidden
                    ? value
                      ? "h-6 w-[80px] text-xs"
                      : "date-hidden h-6 w-[32px]"
                    : "w-[170px]",
                  !value && "text-muted-foreground",
                )}
                onClick={(e) => e.stopPropagation()}
              >
                {value ? (
                  value.toLocaleDateString("en-US", {
                    year: yearHidden ? undefined : "numeric",
                    month: yearHidden ? "short" : "long",
                    day: "numeric",
                  })
                ) : (
                  <span>{yearHidden ? "" : "Due date"}</span>
                )}
                <IconCalendarFilled className="ml-auto h-4 w-4 text-red-500" />
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          {yearHidden && (
            <TooltipContent className="text-xs">{`Due date: ${
              value
                ? value.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Not set"
            }`}</TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
      <PopoverContent
        className="w-auto p-0"
        align="start"
        onClick={(e) => e.stopPropagation()}
      >
        <Calendar
          mode="single"
          selected={value}
          onSelect={onValueChange}
          // disabled={(date) =>
          //   date > new Date() || date < new Date("1900-01-01")
          // }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
