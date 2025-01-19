import InvoiceDetails from "@/app/_components/Invoice Details/InvoiceDetails";
import { getInvoice } from "@/app/_lib/data-service-client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

async function Invoice({ invoiceId }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["invoice", invoiceId],
    queryFn: () => getInvoice(invoiceId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <InvoiceDetails invoiceId={invoiceId} />
    </HydrationBoundary>
  );
}

export default Invoice;
