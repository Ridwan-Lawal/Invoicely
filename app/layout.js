import StoreProvider from "@/app/_lib/redux/StoreProvider";
import { createClient } from "@/app/_lib/supabase/server";
import { spartan } from "@/app/_styles/font";
import "@/app/_styles/globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: {
    template: "%s - Invoice App",
    default: "Dashboard - Invoice App",
  },
  description:
    "An app where you can track your expenses, your clients invoices, and payments",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${spartan.className} antialiased min-h-screen  no-scrollbar`}
      >
        <StoreProvider>{children}</StoreProvider>
        <Toaster />
      </body>
    </html>
  );
}
