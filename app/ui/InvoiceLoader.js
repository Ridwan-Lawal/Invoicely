import { Skeleton } from "@/components/ui/skeleton";

function InvoiceLoader() {
  return (
    <div className="pb-36 md:pb-20">
      <div className="flex items-center mt-2  gap-2">
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-16" />
      </div>
      {/*status and button  */}
      <Skeleton className=" flex items-center justify-between px-8 h-[88px] mt-8">
        <div className="flex gap-10 items-center">
          <Skeleton className="h-5 w-16" />

          <Skeleton className="w-24 h-10 rounded-md hidden md:block" />
        </div>

        <div>
          <Skeleton className="w-24 h-10 rounded-md block md:hidden" />

          <div className="gap-4 items-center   hidden md:flex">
            {Array.from({ length: 3 }).map((num, i) => (
              <Skeleton key={i} className="h-12 w-[80px] rounded-3xl" />
            ))}
          </div>
        </div>
      </Skeleton>
      {/* body */}
      <div className="mt-8">
        <Skeleton className="px-8 py-6 rounded-xl">
          <div className="flex flex-col gap-[30px] md:flex-row md:justify-between md:items-center">
            <div className="space-y-1 md:space-y-[7px]">
              <Skeleton className="h-6 w-[58px]" />

              <Skeleton className="h-[15px] w-[82px]" />
            </div>

            <div className="  flex flex-col gap-1 text-right md:items-end ">
              <Skeleton className="h-4 w-[95px]" />
              <Skeleton className="h-4 w-[50px]" />
              <Skeleton className="h-4 w-[52px]" />
              <Skeleton className="h-4 w-[85px]" />
            </div>
          </div>

          <div className="grid grid-cols-2 items-center gap-[32px] md:grid-cols-3 mt-8">
            {/* date */}
            <div className="flex flex-col gap-[13px]">
              <Skeleton className="h-[15px] w-[66px]" />
              <Skeleton className="h-[20px] w-[77px]" />
            </div>

            {/* Bill to */}
            <div className="flex flex-col gap-[13px]">
              <Skeleton className="h-[15px] w-[66px]" />
              <Skeleton className="h-[20px] w-[77px]" />
            </div>

            {/* payment due */}
            <div className="flex flex-col gap-[13px] order-4">
              <Skeleton className="h-[15px] w-[66px]" />
              <Skeleton className="h-[20px] w-[77px]" />
            </div>

            {/* address */}
            <div className="variant-2  flex flex-col gap-1 order-5">
              <Skeleton className="h-4 w-[95px]" />
              <Skeleton className="h-4 w-[50px]" />
              <Skeleton className="h-4 w-[52px]" />
              <Skeleton className="h-4 w-[85px]" />
            </div>

            {/* sent to  */}
            <div className="flex flex-col gap-[13px] md:order-3">
              <Skeleton className="h-[15px] w-[66px]" />
              <Skeleton className="h-[20px] w-[120px]" />
            </div>
          </div>

          {/* price breakdown */}
          <div className="mt-12">
            <Skeleton className="price-breakdown  h-[120px] rounded-t-lg py-9 px-7">
              {/* items */}
              <div className="flex flex-col gap-6">
                <div className=" items-center justify-between hidden md:flex">
                  <Skeleton className="variant-2 w-[50px] h-[18px]" />
                  <div className="grid grid-cols-3  md:w-[60%] justify-items-end">
                    <Skeleton className="h-[18px] w-[26px]" />
                    <Skeleton className="h-[18px] w-[27px]" />{" "}
                    <Skeleton className="h-[18px] w-[27px]" />
                  </div>
                </div>
                {/* each item */}
                {Array.from({ length: 1 }).map((item, id) => (
                  <div key={id} className="flex items-center justify-between">
                    <div className="flex flex-col gap-2  md:w-[40%]">
                      <Skeleton className="h-[15px] w-[92px]" />
                      <Skeleton className="h-[15px] w-[100px] md:hidden" />
                    </div>

                    <div className="grid md:grid-cols-3  md:w-[60%] md:justify-items-end">
                      <Skeleton className="h-[15px] w-[5px] md:block hidden  mr-2" />

                      <Skeleton className="h-[15px] w-[56px] md:block hidden " />

                      <Skeleton className="h-[15px] w-[56px] " />
                    </div>
                  </div>
                ))}
              </div>
            </Skeleton>
            {/*================== ground total ===============*/}
            <Skeleton className="grand-total bg-color-13 dark:bg-color-08 rounded-b-lg h-[80px] flex items-center justify-between px-7">
              <Skeleton className="h-[18px] w-[66px]" />
              <Skeleton className="h-[32px] w-[93px]" />
            </Skeleton>
          </div>
        </Skeleton>
      </div>
      ;
    </div>
  );
}

export default InvoiceLoader;
