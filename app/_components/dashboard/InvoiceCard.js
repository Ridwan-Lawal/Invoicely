import { ChevronRight } from "lucide-react";
import { GoDotFill } from "react-icons/go";

function InvoiceCard() {
  return (
    <div className="invoice-card">
      {/* id and name */}
      <div className="flex justify-between items-center md:gap-8 lgl:gap-10">
        <p className="uppercase variant-3">
          <span className="text-color-07">#</span>RT3080
        </p>

        <p className="variant-2 capitalize dark:text-white md:hidden">
          Jensen Huang
        </p>

        {/* for tab and desktop */}
        <p className="variant-2 hidden md:block">Due 19 Aug 2021</p>
      </div>

      {/* date, price, status */}
      <div className="flex items-center justify-between md:gap-8 lgl:gap-11">
        {/* date and price */}
        <div className="flex flex-col md:flex-row gap-[9px] md:gap-16 lgl:gap-24">
          <p className="variant-2 md:hidden">Due 19 Aug 2021</p>

          <p className="variant-2 capitalize dark:text-white hidden md:block">
            Jensen Huang
          </p>

          <p className="variant-3">N 1,800.90</p>
        </div>

        {/* status */}
        <div className="flex gap-3 items-center">
          <div className="status paid flex items-center justify-center gap-2">
            <GoDotFill className="text-sm" />
            <span className=" capitalize">paid</span>
          </div>

          <ChevronRight className="text-color-01 size-5 hidden md:block" />
        </div>
      </div>
    </div>
  );
}

export default InvoiceCard;
