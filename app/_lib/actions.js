"use server";

import { createClient } from "@/app/_lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const User = z.object({
  email: z.string().email("Invalid email address!"),
  password: z
    .string()
    .min(8, "Password must be more than 8 characters long!")
    .max(50, "Passwords cannot exceed 50 characters!"),
});

export async function signupAction(prevState, formData) {
  const supabase = await createClient();

  // 1. check if the user trying to call server is not logged
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return {
      success: false,
      message: "You are already Signed up!",
    };
  }

  //   3. Structuring form data and ensure safety

  const userCredentials = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const {
    data: validationData,
    success: validationSuccess,
    error: validationError,
  } = User.safeParse(userCredentials) ?? {};

  if (!validationSuccess) {
    return {
      errors: validationError?.flatten()?.fieldErrors,
      input: userCredentials,
    };
  }

  //   mutate the data

  const { error } = await supabase.auth.signUp({
    email: validationData?.email,
    password: validationData?.password,
  });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  revalidatePath("/user");

  return {
    success: true,
    message: "Account successfully created!",
  };
}
