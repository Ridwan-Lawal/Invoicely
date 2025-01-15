import InvoiceForm from "@/app/_components/Invoice/InvoiceForm";
import NavBar from "@/app/ui/NavBar";

// if the current nav styling doesn't work, remove the lgl:z-50 from the nav, and the top-X from the invoice form

export default function Layout({ children }) {
  return (
    <div className="flex flex-col lgl:flex-row border-2 border-green-400   min-h-screen ">
      <div className="flex flex-col   lgl:flex-row   border-2 border-purple-900 ">
        <NavBar />

        <InvoiceForm />
      </div>
      <main className=" overflow-auto border-2 border-red-500 mt-8 md:mt-10 lgl:mt-12  lgl:flex-grow lgl:max-w-[760px] md:max-w-[690px] max-w-[550px] px-6 mx-auto w-full">
        {children}
      </main>
    </div>
  );
}

//     mx-auto

// continue with the layout
