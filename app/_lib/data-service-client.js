import { createClient } from "@/app/_lib/supabase/client";
import { redirect } from "next/dist/server/api-utils";

export async function getInvoices(filter = "all") {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/user/signin");

  let query = supabase.from("invoice").select("*").eq("user_id", user?.id);

  if (filter === "all") {
    query = query;
  } else {
    query = query.eq("status", filter);
  }

  const { data: invoices, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return invoices;
}

export async function getInvoice(invoiceId) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/user/signin");

  const { data: invoice, error } = await supabase
    .from("invoice")
    .select("*")
    .eq("user_id", user?.id)
    .eq("id", invoiceId);

  if (error) {
    throw new Error(error.message);
  }

  return invoice;
}
