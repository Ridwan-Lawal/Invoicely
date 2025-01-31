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

const Avatar = z.object({
  size: z.number().positive("Please insert a valid image :("),
  type: z.string(),
  name: z.string(),
  lastModified: z.number(),
});

const NewPassword = z.object({
  newPassword: z
    .string()
    .min(8, { message: "Password must be more than 8 characters long!" })
    .max(50, { message: "Passwords cannot exceed 50 characters!" }),
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

  const { data: avatarData, error: avatarError } = await supabase.storage
    .from("avatar")
    .upload(filename, username?.avatar, {
      cacheControl: "3600",
      upsert: false,
    });

  if (avatarError) throw new Error(avatarError.message);

  const {
    data: { publicUrl: avatar_url },
  } = supabase.storage.from("avatar").getPublicUrl(avatarData?.path);

  //   4. mutation (UPDATING NAME AND AVATAR)

  const {
    data: {
      user: {
        user_metadata: { full_name },
      },
    },
    error,
  } = await supabase.auth.updateUser({
    data: { full_name: usernameValidation?.data?.name, avatar_url },
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
    message: `Welcome, ${full_name}`,
  };
}

export async function googleSignInAction() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "https://invoicely-nuld.vercel.app/auth/callback",
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
      redirectTo: "https://invoicely-nuld.vercel.app/auth/callback",
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

  return {
    success: true,
    message: `Welcome back, ${data?.user?.user_metadata?.full_name}`,
  };
}

// Invoice

export async function addInvoiceAction(invoice, formType = "create") {
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

  let query = supabase.from("invoice");

  if (formType === "create") {
    query = query.insert([{ ...invoice, user_id: user?.id }]);
  } else {
    query = query
      .update({ ...invoice, user_id: user?.id })
      .eq("user_id", user?.id)
      .eq("id", invoice?.id);
  }

  const { data, error } = await query.select();

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  revalidatePath("/");

  return {
    success: true,
    message: `invoice 
    #${data?.[0]?.id} ${
      data?.[0]?.status === "pending"
        ? formType === "created"
          ? "created"
          : "updated"
        : "drafted"
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

  // 3. Build the data and ensure the input are safe
  const invoiceId = formData.get("invoiceId");

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

export async function updatePasswordAction(prevState, formData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      message: "You need to be signed to call this action :(",
    };
  }

  const userNewPassword = {
    newPassword: formData.get("password"),
  };

  const {
    data: validationData,
    success: validationSuccess,
    error: validationError,
  } = NewPassword.safeParse(userNewPassword) ?? {};

  if (!validationSuccess) {
    return {
      errors: validationError?.flatten()?.fieldErrors,
      inputs: userNewPassword,
    };
  }

  // update password

  const { data, error } = await supabase.auth.updateUser({
    password: validationData?.newPassword,
  });

  if (error) {
    return {
      success: false,
      message: error?.message,
    };
  }

  revalidatePath("/settings");

  return {
    success: true,
    message: "Password successfully updated :)",
  };
}

export async function updateDisplayNameAction(prevState, formData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      message: "You need to be signed in to call this action",
    };
  }

  const username = {
    name: formData.get("name"),
  };

  const {
    data: validationData,
    success: validationSuccess,
    error: validationError,
  } = UserName.safeParse(username) ?? {};

  if (!validationSuccess) {
    return {
      errors: validationError?.flatten()?.fieldErrors,
      inputs: username,
    };
  }

  // mutation
  const { data, error } = await supabase.auth.updateUser({
    data: {
      full_name: validationData?.name,
    },
  });

  if (error) {
    return {
      success: false,
      message: error?.message,
    };
  }

  revalidatePath("/");

  return {
    success: true,
    message: "Display Name successfully updated :)",
  };
}

export async function updateAvatarAction(prevState, formData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      message: "You are not allowed to call this action :(",
    };
  }

  // validation
  const avatar = formData.get("avatar");

  const avatarValidation = Avatar.safeParse(avatar);

  if (!avatarValidation.success) {
    return {
      errors: avatarValidation?.error?.flatten()?.fieldErrors,
      inputs: avatar,
    };
  }

  const filename = `${uuidv4()}-${avatarValidation.name}`;

  const { data: avatarData, error: avatarError } = await supabase.storage
    .from("avatar")
    .upload(filename, avatar, {
      cacheControl: "3600",
      upsert: false,
    });

  if (avatarError) throw new Error(avatarError?.message);

  const {
    data: { publicUrl: avatar_url },
  } = supabase.storage.from("avatar").getPublicUrl(avatarData?.path);

  // Updating avatar
  const { data, error } = await supabase.auth.updateUser({
    data: {
      avatar_url,
    },
  });

  if (error) {
    return {
      success: false,
      message: error?.message,
    };
  }

  revalidatePath("/");

  return {
    success: true,
    message: "User Avatar successfully updated :(",
  };
}

export async function signOutAction() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      message: "You need to be signed in to call this action",
    };
  }

  const { error } = await supabase.auth.signOut();

  if (error) {
    return {
      success: false,
      message: error?.message,
    };
  }

  revalidatePath("/");

  return {
    success: true,
    message: "See you later, Chief :)",
  };
}
