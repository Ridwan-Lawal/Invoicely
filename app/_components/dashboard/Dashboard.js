import DashboardHeader from "@/app/_components/dashboard/DashboardHeader";
import Invoices from "@/app/_components/dashboard/Invoices";
import NoInvoice from "@/app/_components/dashboard/NoInvoice";

function Dashboard() {
  return (
    <div className="space-y-8 md:space-y-11 w-full">
      <DashboardHeader />
      <div className=" ">
        {/* <NoInvoice /> */}
        <Invoices />
      </div>
    </div>
  );
}

export default Dashboard;
