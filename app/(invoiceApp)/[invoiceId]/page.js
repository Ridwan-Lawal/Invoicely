import Invoice from "@/app/_components/Invoice Details/Invoice";
import Spinner from "@/app/ui/Spinner";
import { Suspense } from "react";

export async function generateMetadata({ params }) {
  const { invoiceId } = await params;

  return { title: `Invoice #${invoiceId}` };
}

async function Page({ params }) {
  const { invoiceId } = await params;

  console.log(invoiceId);

  return (
    <div>
      <Suspense fallback={<Spinner />} key={invoiceId}>
        <Invoice invoiceId={invoiceId} />
      </Suspense>
    </div>
  );
}

export default Page;
