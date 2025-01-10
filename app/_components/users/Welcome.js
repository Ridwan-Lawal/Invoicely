"use client";

import { addNameToSessionAction } from "@/app/_lib/actions";
import { customErrorToast, customSuccessToast } from "@/app/_lib/helpers";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

function Welcome() {
  const [state, formAction, isPending] = useActionState(
    addNameToSessionAction,
    null
  );
  const router = useRouter();

  const { errors, inputs } = state ?? {};

  useEffect(() => {
    if (state === undefined || state === null) return;
    else if (state?.success) {
      router.push("/");
      customSuccessToast(state?.message);
    } else if (state?.success === false) customErrorToast(state?.message);
  }, [state]);

  return (
    <div className="h-screen flex flex-col  items-center justify-center gap-10">
      <div className="text-center text-color-04">
        <h1 className="text-gray-800 font-semibold text-[33px]">Welcome</h1>
        <h2 className="font-semibold text-gray-800 mt-1 text-[22px]">
          How may i address you?
        </h2>
      </div>
      <form
        action={formAction}
        className="w-full max-w-[400px] mx-auto flex flex-col space-y-5"
      >
        <div className="field">
          <div className="label_and_error">
            <label htmlFor="name">Your Name* </label>
            {errors?.name?.at(0) && (
              <span className="error-msg">{errors?.name?.at(0)}</span>
            )}
          </div>

          <input
            type="text"
            name="name"
            disabled={isPending}
            defaultValue={inputs?.name}
            autoComplete="name"
            id="name"
            placeholder="Your Name"
          />
        </div>

        {/* avatar upload */}
        <div className="field">
          <div className="label_and_error">
            <label htmlFor="avatar">Upload an avatar (optional) </label>
            {errors?.name?.at(0) && (
              <span className="error-msg">{errors?.name?.at(0)}</span>
            )}
          </div>

          <input
            type="file"
            name="avatar"
            id="avatar"
            style={{
              color: "#888EB0",
              fontWeight: 400,
              border: "none",
              padding: 0,
            }}
            disabled={isPending}
            accept="image/*"
            className="text-color-07 file:bg-color-01 file:text-white file:outline-none file:border-none file:py-2.5 file:px-6 file:rounded-md file:font-medium file:cursor-pointer file:ml-0 file:mr-8"
          />
        </div>

        <button
          disabled={isPending}
          style={{ opacity: isPending && 0.8 }}
          className="btn btn-paid w-full mt-5 rounded-lg"
        >
          {isPending ? "Loading dashboard..." : "Continue to dashboard"}
        </button>
      </form>
    </div>
  );
}

export default Welcome;

// add animation to the /welcome page
