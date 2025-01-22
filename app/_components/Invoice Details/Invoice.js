import InvoiceDetails from "@/app/_components/Invoice Details/InvoiceDetails";
import { getInvoice } from "@/app/_lib/data-service-client";
import Spinner from "@/app/ui/Spinner";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";

async function Invoice({ invoiceId }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["invoice", invoiceId],
    queryFn: () => getInvoice(invoiceId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<Spinner />} key={invoiceId}>
        <InvoiceDetails invoiceId={invoiceId} />
      </Suspense>
    </HydrationBoundary>
  );
}

export default Invoice;
