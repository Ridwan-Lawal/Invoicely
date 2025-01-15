import InvoiceCard from "@/app/_components/dashboard/InvoiceCard";

function Invoices() {
  return (
    <div className="space-y-6">
      <InvoiceCard />
      <InvoiceCard />
      <InvoiceCard />
      <InvoiceCard />
    </div>
  );
}

export default Invoices;
