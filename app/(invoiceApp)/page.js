import Dashboard from "@/app/_components/dashboard/Dashboard";

async function Page({ searchParams }) {
  const query = await searchParams;
  console.log(query);
  return (
    <div className="w-full pb-12">
      <Dashboard filter={query?.filter} />
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
