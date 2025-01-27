"use client";

import { usePasswordInputFocus } from "@/app/_hooks/usePasswordInputFocus";
import { usePasswordVisibility } from "@/app/_hooks/usePasswordVisibility";
import { updatePasswordAction } from "@/app/_lib/actions";
import { customErrorToast, customSuccessToast } from "@/app/_lib/helpers";
import { Eye, EyeClosed } from "lucide-react";
import { useActionState, useEffect } from "react";

function ResetPassword({ user_email }) {
  const [state, formAction, isPending] = useActionState(
    updatePasswordAction,
    null
  );

  const { errors, input } = state ?? {};
  const { isPasswordInputOnFocus, passwordRef } = usePasswordInputFocus();
  const { passwordShowRef, isShowPassword, handlePasswordVisibility } =
    usePasswordVisibility();

  useEffect(() => {
    if (state === undefined || state === null) return;
    if (state?.success) {
      customSuccessToast(state?.message);
    }
    if (state?.success === false) customErrorToast(state?.message);
  }, [state]);

  return (
    <div>
      <h3 className="dark:text-white">Reset Password</h3>

      <form action={formAction} className="max-w-[350px] space-y-5 mt-5">
        <div className="field">
          <div className="label_and_error">
            <label htmlFor="email">Email address</label>
          </div>

          <input
            type="text"
            name="email"
            id="email"
            className="disabled:bg-gray-50"
            value={user_email}
            disabled
          />
        </div>

        <div className="field">
          <div className="label_and_error ">
            <label htmlFor="password">Password </label>

            {errors?.password?.at(0) && (
              <span className="error-msg">{errors?.password?.at(0)}</span>
            )}
          </div>

          <div
            ref={passwordRef}
            className={`password ${
              isPasswordInputOnFocus
                ? "border border-color-02  dark:border-color-01 "
                : errors?.password?.at(0)
                ? "border-color-09"
                : "border-color-05 dark:border-color-04"
            }`}
          >
            <input
              ref={passwordShowRef}
              type={isShowPassword ? "text" : "password"}
              name="password"
              disabled={isPending}
              defaultValue={input?.password}
              autoComplete="password"
              id="password"
            />

            <div onClick={handlePasswordVisibility}>
              {isShowPassword ? (
                <EyeClosed className="eye" />
              ) : (
                <Eye className="eye" />
              )}
            </div>
          </div>
        </div>

        <button
          disabled={isPending}
          style={{ opacity: isPending && 0.8 }}
          className="btn btn-paid rounded-lg"
        >
          {isPending ? "Updating..." : "Reset"}
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
