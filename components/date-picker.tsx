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
};

export default function DatePicker({ value, onValueChange }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[140px] pl-3 text-left font-normal hover:bg-transparent",
            !value && "text-muted-foreground",
          )}
        >
          {value ? (
            value.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          ) : (
            <span>Due date</span>
          )}
          <IconCalendarFilled className="ml-auto h-4 w-4 text-red-500" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
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
