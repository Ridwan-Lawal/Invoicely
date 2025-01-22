"use server";

import { createClient } from "@/app/_lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

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
    avatar: formData.get("avatar"),
  };

  const usernameValidation = UserName.safeParse(username);

  if (!usernameValidation?.success) {
    return {
      errors: usernameValidation?.error?.flatten()?.fieldErrors,
      inputs: username,
    };
  }

  //   for the avatar
  const filename = `${uuidv4()}-${username?.avatar?.name}`;
  console.log(filename);
  const { data: avatarData, error: avatarError } = await supabase.storage
    .from("avatar")
    .upload(filename, username?.avatar, {
      cacheControl: "3600",
      upsert: false,
    });

  if (avatarError) throw new Error(avatarError.message);

  const {
    data: { publicUrl: avatar_url },
  } = supabase.storage.from("avatar").getPublicUrl(avatarData?.fullPath);

  //   4. mutation (UPDATING NAME AND AVATAR)

  const {
    data: {
      user: {
        user_metadata: { display_name },
      },
    },
    error,
  } = await supabase.auth.updateUser({
    data: { display_name: usernameValidation?.data?.name, avatar_url },
  });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  revalidatePath("/user/welcome");

  return {
    success: true,
    message: `Welcome, ${display_name}`,
  };
}

export async function googleSignInAction() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/auth/callback",
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  if (data.url) {
    redirect(data.url);
  }
}

export async function githubSignInAction() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: "http://localhost:3000/auth/callback",
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  if (data.url) {
    redirect(data.url);
  }
}

export async function signInAction(prevState, formData) {
  const supabase = await createClient();
  // Build and ensuring data safety
  const userCredentials = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const {
    data: userData,
    success: validationSuccess,
    error: validationError,
  } = User.safeParse(userCredentials) ?? {};

  if (!validationSuccess) {
    return {
      errors: validationError?.flatten()?.fieldErrors,
      inputs: userCredentials,
    };
  }

  //   Login mutation

  const { data, error } = await supabase.auth.signInWithPassword({
    email: userData?.email,
    password: userData?.password,
  });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  revalidatePath("/user");
  console.log(data);

  return {
    success: true,
    message: `Welcome back, ${data?.user?.user_metadata?.display_name}`,
  };
}

// Invoice

export async function addInvoiceAction(invoice) {
  const supabase = await createClient();

  // check if user exist
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      message: "You need to be signed in to create new invoice!",
    };
  }

  // mutation

  const { data, error } = await supabase
    .from("invoice")
    .insert([{ ...invoice, user_id: user?.id }])
    .select();

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }
  console.log(data, "data");

  revalidatePath("/");

  return {
    success: true,
    message: `invoice 
    #${data?.[0]?.id} ${
      data?.[0]?.status === "pending" ? "created" : "drafted"
    } successfully`,
  };
}

export async function markAsPaidAction(prevState, formData) {
  const supabase = await createClient();

  // 1. Check if the one calling this action is a logged in user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      message: "You need to be signed in to call this action",
    };
  }

  console.log(user?.id, "id");

  // 3. Build the data and ensure the input are safe
  const invoiceId = formData.get("invoiceId");
  console.log(invoiceId, "ljfal");

  // 2. check if the data the user is trying to mutate belongs to him
  const { data: usersData } = await supabase
    .from("invoice")
    .select("*")
    .eq("user_id", user?.id);

  const usersDataIds = usersData.map((data) => data?.id);

  if (!usersDataIds?.includes(invoiceId)) {
    return {
      success: false,
      message: "You are not allowed to mutate this data, it's not yours",
    };
  }

  // 4. Mutation
  const { error } = await supabase
    .from("invoice")
    .update({ status: "paid" })
    .eq("user_id", user?.id)
    .eq("id", invoiceId)
    .select();

  if (error) {
    return {
      success: false,
      message: error?.message,
    };
  }

  // 5 revalidate route
  revalidatePath("/");

  return {
    success: true,
    message: `Invoice #${invoiceId} successfully paid`,
  };
}

export async function deleteInvoiceAction(prevState, formData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      message: "You need to be logged in to call this action!",
    };
  }

  const invoiceId = formData.get("invoiceId");

  // 2. if data belongs to user
  const { data: usersData } = await supabase
    .from("invoice")
    .select("*")
    .eq("user_id", user?.id);

  const usersDataIds = usersData?.map((data) => data?.id);

  if (!usersDataIds.includes(invoiceId)) {
    return {
      success: false,
      message: "You are not allowed to delete this invoice, It's not yours",
    };
  }

  //  mutation

  const { error } = await supabase
    .from("invoice")
    .delete()
    .eq("user_id", user?.id)
    .eq("id", invoiceId);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  revalidatePath("/");

  return {
    success: true,
    message: `Invoice ${invoiceId}, successfully deleted `,
  };
}
