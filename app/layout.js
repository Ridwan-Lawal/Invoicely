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
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(user);
  return (
    <html lang="en">
      <body className={`${spartan.className} antialiased `}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
