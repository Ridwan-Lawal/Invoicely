import { createClient } from "@/app/_lib/supabase/server";
import { getPlaiceholder } from "plaiceholder";

export async function getProfile() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("You need to be signed in to get this data :(");

  return user?.user_metadata;
}

export async function getBase64(imageUrl) {
  try {
    const res = await fetch(imageUrl);
    const buffer = await res.arrayBuffer();
    const { base64 } = await getPlaiceholder(Buffer.from(buffer));
    return base64;
  } catch (error) {
    console.error("Error generating base64:", error);
    return null;
  }
}
