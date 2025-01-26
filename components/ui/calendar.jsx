"use client";
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

function Calendar({
  className,
  classNames,
  selected,
  onSelect,
  showOutsideDays = true,
  ...props
}) {
  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={onSelect}
      showOutsideDays={showOutsideDays}
      className={cn("p-3 w-full", className)}
      classNames={{
        months:
          "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 w-full",
        month: "space-y-4 w-full dark:text-white",
        caption: "flex justify-center pt-1 relative items-center w-full h-10",
        caption_label:
          "text-sm font-medium font-bold text-[15px] leading-[15px] tracking-[-0.25] flex-grow text-center",
        nav: "space-x-1 flex items-center absolute left-1 right-1 justify-between",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 border-none bg-transparent p-0 opacity-100 text-[#7C5DFA] hover:opacity-100 dark:bg-color-01 dark:text-white"
        ),
        nav_button_previous: "flex items-center justify-center",
        nav_button_next: "flex items-center justify-center",
        table: "w-full border-collapse space-y-1",
        head_row: "flex w-full justify-between",
        head_cell:
          "text-neutral-500 rounded-md flex-1 font-normal text-[0.8rem] dark:text-neutral-400 text-center",
        row: "flex w-full mt-2 justify-between",
        cell: cn(
          "relative p-0 text-center text-sm flex-1 focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-neutral-100 [&:has([aria-selected].day-outside)]:bg-neutral-100/50 [&:has([aria-selected].day-range-end)]:rounded-r-md dark:[&:has([aria-selected])]:bg-neutral-800 dark:[&:has([aria-selected].day-outside)]:bg-neutral-800/50",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-6 w-full p-0 font-bold text-[15px] leading-[15px] tracking-[-0.25] aria-selected:opacity-100 hover:text-[#7C5DFA] cursor-pointer dark:text-white dark:hover:bg-color-02"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-none text-[#7C5DFA] hover:bg-none dark:bg-color-01 dark:text-white dark:hover:bg-color-02 dark:hover:text-neutral-900 dark:focus:bg-neutral-50 dark:focus:text-neutral-900 ",
        day_today:
          "bg-neutral-100 border-none text-color-09 dark:bg-red-800 dark:text-neutral-50",
        day_outside:
          "day-outside text-neutral-500 aria-selected:bg-neutral-100/50 aria-selected:text-neutral-500 dark:text-neutral-400 dark:aria-selected:bg-neutral-800/50 dark:aria-selected:text-neutral-400",
        day_disabled: "text-neutral-500 opacity-50 dark:text-neutral-400",
        day_range_middle:
          "aria-selected:bg-neutral-100 aria-selected:text-neutral-900 dark:aria-selected:bg-neutral-800 dark:aria-selected:text-neutral-50",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("h-4 w-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("h-4 w-4", className)} {...props} />
        ),
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";
export { Calendar };
