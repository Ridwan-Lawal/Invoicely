import { createClient } from "@/app/_lib/supabase/client";

export async function getInvoices(filter = "all") {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You need to be signed in to get the your invoices :(");
  }

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
  console.log(invoices, "invoices", filter);
  return invoices;
}

export async function getInvoice(invoiceId) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You need to be signed in to get this data :(");
  }

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
