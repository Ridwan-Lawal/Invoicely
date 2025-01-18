import DashboardHeader from "@/app/_components/dashboard/DashboardHeader";
import Invoices from "@/app/_components/dashboard/Invoices";
import NoInvoice from "@/app/_components/dashboard/NoInvoice";
import Spinner from "@/app/ui/Spinner";
import { Suspense } from "react";

function Dashboard({ filter }) {
  return (
    <div className="space-y-8 md:space-y-11 w-full">
      <DashboardHeader />
      <div className=" ">
        {/* <NoInvoice /> */}
        <Suspense fallback={<Spinner />} key={filter}>
          <Invoices filter={filter} />
        </Suspense>
      </div>
    </div>
  );
}

export default Dashboard;
