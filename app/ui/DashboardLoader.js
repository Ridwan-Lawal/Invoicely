import { Skeleton } from "@/components/ui/skeleton";

function DashboardLoader() {
  return (
    <div>
      {/* dashboard head */}
      <div className="flex justify-between items-center">
        <div className="space-y-4">
          <Skeleton className="h-8 md:h-11 w-28 md:w-36 rounded-sm" />
          <Skeleton className="h-5 w-36 md:w-44 rounded-sm" />
        </div>

        <div className="flex gap-12 items-center">
          <Skeleton className="h-7 w-28 rounded-sm md:w-28" />

          <Skeleton className="h-12 w-24 md:w-36 rounded-3xl" />
        </div>
      </div>

      {/* invoices */}
      <div className="space-y-8 mt-10 md:mt-12">
        {Array.from({ length: 4 }, (_, i) => i + 1).map((num) => (
          <Skeleton
            key={num}
            className="h-[134px] md rounded-[8px] md:h-[72px]"
          />
        ))}
      </div>
    </div>
  );
}

export default DashboardLoader;
