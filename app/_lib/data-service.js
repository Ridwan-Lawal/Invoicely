import { createClient } from "@/app/_lib/supabase/server";

// export async function getInvoices(filter = "all") {
//   const supabase = await createClient();
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) {
//     throw new Error("You need to be signed in to get the your invoices :(");
//   }

//   let query = await supabase
//     .from("invoice")
//     .select("*")
//     .eq("user_id", user?.id);

//   if (filter === "all") {
//     query = query;
//   } else {
//     query = query.eq("status", filter);
//   }

//   const { data: invoices, error } = query;

//   if (error) {
//     throw new Error(error.message);
//   }

//   return invoices;
// }
