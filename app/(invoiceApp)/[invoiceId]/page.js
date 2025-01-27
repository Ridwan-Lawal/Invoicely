import Invoice from "@/app/_components/Invoice Details/Invoice";
import InvoiceLoader from "@/app/ui/InvoiceLoader";
import Spinner from "@/app/ui/Spinner";
import { Suspense } from "react";

export async function generateMetadata({ params }) {
  const { invoiceId } = await params;

  return { title: `Invoice #${invoiceId}` };
}

async function Page({ params }) {
  const { invoiceId } = await params;

  invoiceId;

  return (
    <div>
      <Suspense fallback={<Spinner />} key={invoiceId}>
        <Invoice invoiceId={invoiceId} />
      </Suspense>
    </div>
  );
}

export default Page;
