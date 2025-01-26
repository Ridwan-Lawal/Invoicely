import { createClient } from "@/app/_lib/supabase/server";
import { redirect } from "next/navigation";
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
    console.error("Error generating base64:", error);
    return null;
  }
}
