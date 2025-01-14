"use client";

import { Calendar as CalenderIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { useCloseModalOnBlur } from "@/app/_hooks/useCloseModalOnBlur";

function InvoiceIssueDate({
  children,
  isIssueDateInputOnFocus,
  selected,
  onSelect,
}) {
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);

  const onOpenCalendar = () => setIsCalenderOpen((cur) => !cur);

  useCloseModalOnBlur(setIsCalenderOpen);

  return (
    <div className="field">
      <div className="label_and_error">
        <label htmlFor={children?.props?.name}>Issue Date</label>
      </div>

      <div className="payment-terms space-y-3  dropdown">
        {/* select */}
        <div
          onClick={onOpenCalendar}
          className={`password ${
            isIssueDateInputOnFocus
              ? "border border-color-01"
              : "dark:border-color-04"
          }`}
        >
          {children}

          <CalenderIcon className="size-5 text-color-01 cursor-pointer" />
        </div>

        {/* options */}
        {isCalenderOpen && (
          <div className="relative z-30">
            <div className="calendar ">
              <Calendar
                className="w-full"
                mode="single"
                selected={selected}
                onSelect={onSelect}
                initialFocus
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default InvoiceIssueDate;
