import Image from "next/image";
import NoInvoiceIcon from "@/public/illustration-empty.svg";

function NoInvoice() {
  return (
    <div className="flex flex-col justify-center items-center gap-11 mt-12">
      <div>
        <Image src={NoInvoiceIcon} alt="no-invoice" quality={100} />
      </div>

      <div className="flex flex-col items-center gap-6">
        <h2 className="">There is nothing here</h2>{" "}
        <p className="variant-2 max-w-[200px] mx-auto text-center">
          Create an invoice by clicking the{" "}
          <span className="font-bold">
            New <span className="hidden md:inline">Invoice</span>
          </span>{" "}
          and get started{" "}
        </p>
      </div>
    </div>
  );
}

export default NoInvoice;
