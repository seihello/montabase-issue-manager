"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "px-2 text-left font-normal hover:bg-transparent",
            yearHidden ? (value ? "w-[86px]" : "w-[36px]") : "w-[140px]",
            !value && "text-muted-foreground",
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {value ? (
            value.toLocaleDateString("en-US", {
              year: yearHidden ? undefined : "numeric",
              month: "short",
              day: "numeric",
            })
          ) : (
            <span>{yearHidden ? "" : "Due date"}</span>
          )}
          <IconCalendarFilled className="ml-auto h-4 w-4 text-red-500" />
        </Button>
      </PopoverTrigger>
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
