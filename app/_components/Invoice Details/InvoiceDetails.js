"use client";

import { getInvoice } from "@/app/_lib/data-service-client";
import { paymentDue } from "@/app/_lib/helpers";
import Status from "@/app/ui/Status";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

function InvoiceDetails({ invoiceId }) {
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["invoice", invoiceId],
    queryFn: () => getInvoice(invoiceId),
  });

  const { status, id, user, invoice, name, client } = data?.at(0) ?? {};

  console.log(data, invoiceId);

  const invoiceIssueDate =
    invoice?.issueDate && format(new Date(invoice?.issueDate), "dd MMM yyyy");

  const paymentDueDate = paymentDue(invoice?.issueDate, invoice?.paymentTerms);

  return (
    <div>
      {/* back-button */}
      <button onClick={() => router.back()} className="btn btn-back">
        <ChevronLeft className="size-4 text-color-01" /> <span>Go back</span>
      </button>

      {/* header */}
      <div className="invoice-details-header">
        {/* status */}
        <div className="flex items-center justify-between w-full md:justify-normal md:gap-5 ">
          <p className="variant-2">Status</p>
          <Status status={status} />
        </div>

        {/* buttons */}
        <div className="buttons  top-shadow-small ">
          <button className="btn btn-edit">Edit</button>
          <button className="btn btn-delete">Delete</button>
          <button className="btn btn-paid">Mark as Paid</button>
        </div>
      </div>

      {/* main */}
      <div className="shadow-md shadow-gray-100 bg-white py-6 px-6 rounded-[8px] mt-6 ">
        <div className=" space-y-8">
          {/*==== first section ====*/}
          <div className="flex flex-col gap-[30px] md:flex-row md:justify-between md:items-center">
            {/* id and product */}
            <div className="space-y-1 md:space-y-[7px]">
              <p className="variant-3">
                <span className="text-color-07">#</span>
                {id}
              </p>
              <p className="variant-2">Graphic Design</p>
            </div>

            {/* user address */}
            <p className="variant-2  flex flex-col gap-1">
              <span>{user?.address}</span> <span>{user?.city}</span>{" "}
              <span>{user?.postCode}</span>
              <span>{user?.country}</span>
            </p>
          </div>

          {/* ===== second section ===== */}

          <div className="grid grid-cols-2 items-center gap-[32px] md:grid-cols-3">
            {/* date */}
            <div className="flex flex-col gap-[13px]">
              <p className="capitalize variant-2">invoice date</p>
              <p className="variant-3">{invoiceIssueDate}</p>
            </div>

            {/* Bill to */}
            <div className="flex flex-col gap-[13px]">
              <p className="capitalize variant-2">bill to</p>
              {/* <p className="variant-3">{name}</p> */}
              <p className="variant-3">Lawal Ridwan</p>
            </div>

            {/* payment due */}
            <div className="flex flex-col gap-[13px] order-4">
              <p className="capitalize variant-2">Payment Due</p>
              <p className="variant-3">{paymentDueDate}</p>
            </div>

            {/* address */}
            <p className="variant-2  flex flex-col gap-1 order-5">
              <span>{client?.address}</span> <span>{client?.city}</span>{" "}
              <span>{client?.postCode}</span>
              <span>{client?.country}</span>
            </p>

            {/* sent to  */}
            <div className="flex flex-col gap-[13px] md:order-3">
              <p className="capitalize variant-2">sent to</p>
              <p className="variant-3">{client?.email}</p>
            </div>
          </div>
        </div>

        {/* price breakdown */}
      </div>
    </div>
  );
}

export default InvoiceDetails;
