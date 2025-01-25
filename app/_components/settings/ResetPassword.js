"use client";

import { updatePasswordAction } from "@/app/_lib/actions";
import { customErrorToast, customSuccessToast } from "@/app/_lib/helpers";
import { useActionState, useEffect } from "react";

function ResetPassword({ user_email }) {
  const [state, formAction, isPending] = useActionState(
    updatePasswordAction,
    null
  );

  useEffect(() => {
    if (state === undefined || state === null) return;
    if (state?.success) {
      customSuccessToast(state?.message);
    }
    if (state?.success === false) customErrorToast(state?.message);
  }, [state]);

  return (
    <div>
      <h3>Reset Password</h3>

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
          <div className="label_and_error">
            <label htmlFor="password">New password</label>
            {state?.errors?.newPassword?.at(0) && (
              <p className="error-msg">{state?.errors?.newPassword?.at(0)}</p>
            )}
          </div>

          <input
            type="password"
            name="password"
            id="password"
            disabled={isPending}
            defaultValue={state?.inputs?.newPassword}
            autoComplete="password"
          />
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
