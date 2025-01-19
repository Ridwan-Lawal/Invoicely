import { formatCurrency, paymentDue } from "@/app/_lib/helpers";
import Status from "@/app/ui/Status";
import { add, format } from "date-fns";
import { ChevronRight } from "lucide-react";
import { GoDotFill } from "react-icons/go";

function InvoiceCard({ invoice }) {
  const {
    id,
    status,
    invoice: { paymentTerms, issueDate },
    items,
    client: { name },
  } = invoice ?? {};

  const totalItemPrice = items.reduce(
    (acc, cur) => acc + +cur?.price * +cur?.quantity,
    0
  );

  const paymentDueDate = paymentDue(issueDate, paymentTerms);

  return (
    <div className="invoice-card">
      {/* id and name */}
      <div className="flex justify-between items-center md:gap-8 lgl:gap-10">
        <p className="uppercase variant-3">
          <span className="text-color-07">#</span>
          {id}
        </p>

        <p className="variant-2 capitalize dark:text-white md:hidden">{name}</p>

        {/* for tab and desktop */}
        <p className="variant-2 hidden md:block">Due {paymentDueDate}</p>
      </div>

      {/* date, price, status */}
      <div className="flex items-center justify-between md:gap-8 lgl:gap-11">
        {/* date and price */}
        <div className="flex flex-col md:flex-row gap-[9px] md:gap-16 lgl:gap-24">
          <p className="variant-2 md:hidden">Due {paymentDueDate}</p>

          <p className="variant-2 capitalize dark:text-white hidden md:block">
            {name}
          </p>

          <p className="variant-3">{formatCurrency(totalItemPrice)}</p>
        </div>

        {/* status */}
        <div className="flex gap-3 items-center">
          <Status status={status} />

          <ChevronRight className="text-color-01 size-5 hidden md:block" />
        </div>
      </div>
    </div>
  );
}

export default InvoiceCard;
