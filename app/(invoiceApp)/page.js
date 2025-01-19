import Dashboard from "@/app/_components/dashboard/Dashboard";
import Spinner from "@/app/ui/Spinner";
import { Suspense } from "react";

async function Page({ searchParams }) {
  const query = await searchParams;
  console.log(query);

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

{
  /*

  -section header - Bill from, Bill to
  
  
  <div className="field">
        <div className="label_and_error">
          <label htmlFor="client">Client's Name</label>
          <span className="error-msg">Can't be empty</span>
        </div>

        <input type="text" />
      </div> */
}
