import DashboardHeader from "@/app/_components/dashboard/DashboardHeader";
import Invoices from "@/app/_components/dashboard/Invoices";
import Spinner from "@/app/ui/Spinner";
import { Suspense } from "react";
import { getInvoices } from "@/app/_lib/data-service-client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import DashboardLoader from "@/app/ui/DashboardLoader";

async function Dashboard({ filter }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["invoices", filter],
    queryFn: () => getInvoices(filter),
  });

  return (
    <div className="space-y-8 md:space-y-11 w-full">
      <DashboardHeader filter={filter} />
      <div className=" ">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Invoices filter={filter} />
        </HydrationBoundary>
      </div>
    </div>
  );
}

export default Dashboard;
