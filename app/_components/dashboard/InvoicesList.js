"use client";

import { getInvoices } from "@/app/_lib/data-service-client";
import { useQuery } from "@tanstack/react-query";

function InvoicesList({ filter }) {
  const { data, error } = useQuery({
    queryKey: ["invoices", filter],
    queryFn: () => getInvoices(),
  });

  console.log(data, error);
  return <div></div>;
}

export default InvoicesList;
