"use server";

import { createClient } from "@/app/_lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const User = z.object({
  email: z.string().email({ message: "Invalid email address!" }),
  password: z
    .string()
    .min(8, { message: "Password must be more than 8 characters long!" })
    .max(50, { message: "Passwords cannot exceed 50 characters!" }),
});

const UserName = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be 3 or more characters long!" })
    .max(50, { message: "Name cannot exceed 50 characters" }),
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

export async function addNameToSessionAction(prevState, formData) {
  const supabase = await createClient();

  // 1.  ensure there's a current session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      message: "You need to be signed in to call this action!",
    };
  }

  //3.   build and ensure data safety
  const username = {
    name: formData.get("name"),
  };

  const usernameValidation = UserName.safeParse(username);

  if (!usernameValidation?.success) {
    return {
      errors: usernameValidation?.error?.flatten()?.fieldErrors,
      inputs: username,
    };
  }

  //   4. mutation

  const {
    data: {
      user: {
        user_metadata: { display_name },
      },
    },
    error,
  } = await supabase.auth.updateUser({
    data: { display_name: usernameValidation?.data?.name },
  });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  revalidatePath("/welcome");

  return {
    success: true,
    message: `Welcome, ${display_name}`,
  };
}
