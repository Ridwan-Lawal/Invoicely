import InvoiceForm from "@/app/_components/Invoice/InvoiceForm";
import NavBar from "@/app/ui/NavBar";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col lgl:flex-row   min-h-screen ">
      <div className="flex flex-col fixed w-full lgl:flex-row h-screen   border-2 border-purple-900  ">
        <NavBar />

        <InvoiceForm />
      </div>
      <main className="min-h-screen overflow-auto">{children}</main>
    </div>
  );
}

// continue with the layout
