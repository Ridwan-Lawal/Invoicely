import InvoiceForm from "@/app/_components/Invoice/InvoiceForm";
import NavBar from "@/app/ui/NavBar";

// if the current nav styling doesn't work, remove the lgl:z-50 from the nav, and the top-X from the invoice form

export default function Layout({ children }) {
  return (
    <div className="flex flex-col lgl:flex-row    min-h-screen scrollbar-thin">
      <div className="flex flex-col   lgl:flex-row    ">
        <NavBar />

        <InvoiceForm />
      </div>
      <main className=" overflow-auto  pt-8 md:pt-10 lgl:pt-12 flex-grow h-[85vh] lgl:h-screen lgl:flex-grow    px-6 mx-auto w-screen ">
        <div className="max-w-[550px] lgl:max-w-[760px] md:max-w-[690px]  mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

//     mx-auto

// continue with the layout
