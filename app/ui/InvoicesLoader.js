import { Skeleton } from "@/components/ui/skeleton";

function InvoicesLoader() {
  return (
    <div className="space-y-8 mt-10 md:mt-12">
      {Array.from({ length: 4 }, (_, i) => i + 1).map((num) => (
        <Skeleton
          key={num}
          className="h-[134px] md rounded-[8px] md:h-[72px] transition-all   flex flex-col   justify-between px-6 py-5    md:items-center md:flex-row"
        >
          <div className="flex justify-between items-center md:gap-8 lgl:gap-10">
            {/* ID */}
            <Skeleton className="h-4 w-20" />

            {/* Name (hidden on mobile) */}
            <Skeleton className="h-4 w-24 md:hidden" />

            {/* Payment Due Date (hidden on mobile) */}
            <Skeleton className="h-4 w-24 hidden md:block" />
          </div>

          {/* Date, Price, Status */}
          <div className="flex items-center justify-between md:gap-8 lgl:gap-11">
            {/* Date and Price */}
            <div className="flex flex-col md:flex-row gap-[9px] md:gap-16 lgl:gap-24">
              {/* Payment Due Date (hidden on desktop) */}
              <Skeleton className="h-4 w-24 md:hidden" />

              {/* Name (hidden on mobile) */}
              <Skeleton className="h-4 w-24 hidden md:block" />

              {/* Total Price */}
              <Skeleton className="h-4 w-16" />
            </div>

            {/* Status and Chevron */}
            <div className="flex gap-3 items-center">
              {/* Status */}
              <Skeleton className="h-4 w-16" />

              {/* Chevron (hidden on mobile) */}
              <Skeleton className="h-5 w-5 hidden md:block" />
            </div>
          </div>
        </Skeleton>
      ))}
    </div>
  );
}

export default InvoicesLoader;
