"use client";

import InvoiceCard from "@/app/_components/dashboard/InvoiceCard";
import { getInvoices } from "@/app/_lib/data-service-client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

function Invoices({ filter }) {
  const { data: invoices, error } = useQuery({
    queryKey: ["invoices", filter],
    queryFn: () => getInvoices(filter),
  });

  console.log(invoices, error, filter);
  return (
    <div className="space-y-5">
      {invoices?.map((invoice) => (
        <Link href={`/${invoice?.id}`} key={invoice?.id}>
          <InvoiceCard invoice={invoice} />
        </Link>
      ))}
    </div>
  );
}

export default Invoices;
