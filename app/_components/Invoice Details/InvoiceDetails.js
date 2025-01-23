"use client";

import { useInvoiceMutations } from "@/app/_hooks/useInvoiceMutations";
import { deleteInvoiceAction, markAsPaidAction } from "@/app/_lib/actions";
import { getInvoice } from "@/app/_lib/data-service-client";
import {
  customErrorToast,
  customSuccessToast,
  formatCurrency,
  paymentDue,
} from "@/app/_lib/helpers";
import { onToggleInvoiceForm } from "@/app/_lib/redux/formSlice";
import { editForm } from "@/app/_lib/redux/formSlice";
import Spinner from "@/app/ui/Spinner";
import Status from "@/app/ui/Status";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

function InvoiceDetails({ invoiceId }) {
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ["invoice", invoiceId],
    queryFn: () => getInvoice(invoiceId),
  });
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  // markPaid
  const { formAction: paidFormAction, isPending: isMarkingAsPaid } =
    useInvoiceMutations(markAsPaidAction, "markAsPaid");
  const { formAction: deleteAction, isPending: isDeleting } =
    useInvoiceMutations(deleteInvoiceAction, "delete");

  const invoiceData = data?.at(0);

  const invoiceIssueDate =
    invoiceData?.invoice?.issueDate &&
    format(new Date(invoiceData?.invoice?.issueDate), "dd MMM yyyy");

  const paymentDueDate = paymentDue(
    invoiceData?.invoice?.issueDate,
    invoiceData?.invoice?.paymentTerms
  );

  const totalItemPrice = invoiceData?.items?.reduce(
    (acc, cur) => acc + +cur?.quantity * +cur?.price,
    0
  );

  function handleEditInvoice() {
    dispatch(onToggleInvoiceForm());
    dispatch(editForm(invoiceData));
  }

  if (isLoading) return <Spinner />;

  return (
    <div className="pb-20">
      {/* back-button */}
      <button onClick={() => router.back()} className="btn btn-back">
        <ChevronLeft className="size-4 text-color-01" /> <span>Go back</span>
      </button>

      {/* header */}
      <div className="invoice-details-header mt-7">
        {/* status */}
        <div className="flex items-center justify-between w-full md:justify-normal md:gap-5 ">
          <p className="variant-2">Status</p>
          <Status status={invoiceData?.status} />
        </div>

        {/* buttons */}
        <div className="buttons  top-shadow-small ">
          <button onClick={() => handleEditInvoice()} className="btn btn-edit">
            Edit
          </button>
          <form action={deleteAction}>
            <input type="hidden" name="invoiceId" value={invoiceId} />
            <button
              disabled={isDeleting}
              style={{ opacity: isDeleting && 0.8 }}
              className="btn btn-delete"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </form>
          {invoiceData?.status !== "paid" &&
            invoiceData?.status !== "draft" && (
              <form action={paidFormAction}>
                <input type="hidden" name="invoiceId" value={invoiceId} />
                <button
                  disabled={isMarkingAsPaid}
                  style={{ opacity: isMarkingAsPaid && 0.8 }}
                  className="btn btn-paid"
                >
                  {isMarkingAsPaid ? "Updating..." : "Mark as Paid"}
                </button>{" "}
              </form>
            )}
        </div>
      </div>

      {/* main */}
      <div className="shadow-md shadow-gray-100 bg-white py-8 px-7 rounded-[8px] mt-6 ">
        <div className=" space-y-8">
          {/*==== first section ====*/}
          <div className="flex flex-col gap-[30px] md:flex-row md:justify-between md:items-center">
            {/* id and product */}
            <div className="space-y-1 md:space-y-[7px]">
              <p className="variant-3">
                <span className="text-color-07">#</span>
                {invoiceData?.id}
              </p>
              <p className="variant-2">Graphic Design</p>
            </div>

            {/* user address */}
            <p className="variant-2  flex flex-col gap-1">
              <span>{invoiceData?.user?.address}</span>{" "}
              <span>{invoiceData?.user?.city}</span>{" "}
              <span>{invoiceData?.user?.postCode}</span>
              <span>{invoiceData?.user?.country}</span>
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
              <p className="variant-3">{invoiceData?.name}</p>
            </div>

            {/* payment due */}
            <div className="flex flex-col gap-[13px] order-4">
              <p className="capitalize variant-2">Payment Due</p>
              <p className="variant-3">{paymentDueDate}</p>
            </div>

            {/* address */}
            <p className="variant-2  flex flex-col gap-1 order-5">
              <span>{invoiceData?.client?.address}</span>{" "}
              <span>{invoiceData?.client?.city}</span>{" "}
              <span>{invoiceData?.client?.postCode}</span>
              <span>{invoiceData?.client?.country}</span>
            </p>

            {/* sent to  */}
            <div className="flex flex-col gap-[13px] md:order-3">
              <p className="capitalize variant-2">sent to</p>
              <p className="variant-3">{invoiceData?.client?.email}</p>
            </div>
          </div>
        </div>

        {/* price breakdown */}
        <div className="mt-12">
          <div className="price-breakdown border bg-color-14 rounded-t-lg py-7 px-7">
            {/* items */}
            <div className="flex flex-col gap-6">
              <div className=" items-center justify-between hidden md:flex">
                <p className="variant-2 w-[40%]">Item Name</p>
                <div className="grid grid-cols-3 border md:w-[60%] justify-items-end">
                  <p className="variant-2 uppercase">qty.</p>
                  <p className="variant-2">Price</p>
                  <p className="variant-2">Total</p>
                </div>
              </div>
              {/* each item */}
              {invoiceData?.items?.map((item, id) => (
                <div key={id} className="flex items-center justify-between">
                  <div className="flex flex-col gap-2 border border-red-500 md:w-[40%]">
                    <p className="variant-3">{item?.name}</p>
                    <p className="variant-4 font-bold text-[15px] md:hidden">
                      {+item?.quantity} x {formatCurrency(+item?.price)}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 border border-green-700 md:w-[60%] md:justify-items-end">
                    <p className="variant-4 md:block hidden  mr-2">
                      {item?.quantity}
                    </p>
                    <p className="variant-4 hidden md:block">
                      {formatCurrency(+item?.price)}
                    </p>
                    <p className="variant-3">
                      {formatCurrency(+item?.price * +item?.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/*================== ground total ===============*/}
          <div className="grand-total bg-color-13 dark:bg-color-08 rounded-b-lg h-[80px] flex items-center justify-between px-7">
            <p className="text-[13px] leading-[18px] tracking-[-0.1px] font-medium text-white">
              Grand Total
            </p>

            <h2 className="text-white">{formatCurrency(totalItemPrice)}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceDetails;
