"use client";

import InvoiceForm from "@/app/_components/Invoice/InvoiceForm";
import { useSelector } from "react-redux";

function Header({ children }) {
  const { isInvoiceFormOpen } = useSelector((store) => store.dashboard);
  return (
    <div
      className={`flex flex-col  w-full lgl:flex-row fixed   border-2 border-red-900 lgl:w-[103px] 
      } `}
    >
      {children}

      <InvoiceForm />
    </div>
  );
}

export default Header;
