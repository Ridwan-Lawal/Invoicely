import { createClient } from "@/app/_lib/supabase/server";

import { redirect } from "next/navigation";
import fetch from "node-fetch";
import { getPlaiceholder } from "plaiceholder";
import sharp from "sharp";

export async function getProfile() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/user/signin");

  return user?.user_metadata;
}

export async function getBase64(imageUrl) {
  try {
    const res = await fetch(imageUrl);
    const arrayBuffer = await res.arrayBuffer();
    const buffer = await sharp(Buffer.from(arrayBuffer))
      .webp({ quality: 50 })
      .toBuffer();
    const { base64 } = await getPlaiceholder(Buffer.from(buffer));
    return base64;
  } catch (error) {
    return null;
  }
}

export async function getInvoiced() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/user/signin");

  const { data, error } = await supabase
    .from("invoice")
    .select("*")
    .eq("user_id", user?.id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
