"use client";

import InvoiceCard from "@/app/_components/dashboard/InvoiceCard";
import NoInvoice from "@/app/_components/dashboard/NoInvoice";
import { getInvoices } from "@/app/_lib/data-service-client";
import Spinner from "@/app/ui/Spinner";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

function Invoices({ filter }) {
  const {
    data: invoices,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["invoices", filter],
    queryFn: () => getInvoices(filter),
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="flex flex-col gap-5">
      {invoices?.length ? (
        invoices?.map((invoice) => (
          <Link href={`/${invoice?.id}`} key={invoice?.id}>
            <InvoiceCard invoice={invoice} />
          </Link>
        ))
      ) : (
        <NoInvoice />
      )}
    </div>
  );
}

export default Invoices;
