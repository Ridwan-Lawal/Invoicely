import Dashboard from "@/app/_components/dashboard/Dashboard";
import Spinner from "@/app/ui/Spinner";
import { Suspense } from "react";

async function Page({ searchParams }) {
  const query = await searchParams;

  const suspenseKey = `${query?.filter}`;
  return (
    <div className="w-full pb-12">
      <Suspense fallback={<Spinner />} key={suspenseKey}>
        <Dashboard filter={query?.filter} />
      </Suspense>
    </div>
  );
}

export default Page;

// try making the component stream
// building the editing features
