import InvoiceCard from "@/app/_components/dashboard/InvoiceCard";
import InvoicesList from "@/app/_components/dashboard/InvoicesList";
import { getInvoices } from "@/app/_lib/data-service-client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

async function Invoices({ filter }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["invoices", filter],
    queryFn: () => getInvoices(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <InvoicesList filter={filter} />
    </HydrationBoundary>
  );
}

export default Invoices;
