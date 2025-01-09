"use client";
import { usePasswordInputFocus } from "@/app/_hooks/usePasswordInputFocus";
import { usePasswordVisibility } from "@/app/_hooks/usePasswordVisibility";
import LogoAuth from "@/public/logo-auth.svg";
import googleIcon from "@/public/google-logo.svg";
import { CheckCircle, Eye, EyeClosed, Github, GithubIcon } from "lucide-react";
import Image from "next/image";
import Terms from "@/app/_components/users/Terms";
import { useActionState, useEffect } from "react";
import {
  githubSignInAction,
  googleSignInAction,
  signupAction,
} from "@/app/_lib/actions";
import toast from "react-hot-toast";
import { customErrorToast, customSuccessToast } from "@/app/_lib/helpers";
import { useRouter } from "next/navigation";

function SignupForm() {
  const [state, formAction, isPending] = useActionState(signupAction, null);
  const router = useRouter();
  const { errors, input } = state ?? {};

  const { isPasswordInputOnFocus, passwordRef } = usePasswordInputFocus();
  const { passwordShowRef, isShowPassword, handlePasswordVisibility } =
    usePasswordVisibility();

  useEffect(() => {
    if (state === undefined || state === null) return;
    if (state?.success) {
      customSuccessToast(state?.message);
      router.push("/welcome");
    } else if (state?.success === false) {
      customErrorToast(state?.message);
    }
  }, [state]);

  return (
    <div
      className="flex flex-col items-center h-screen justify-center gap-8 overflow-auto mt-8 pb-12
    "
    >
      {/* Logo */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-16 w-16">
          <Image
            src={LogoAuth}
            alt="logo"
            quality={100}
            fill
            className="object-contain"
            priority={true}
          />
        </div>

        <h2 className="text-center text-color-02">Invoicely</h2>
      </div>

      {/* form
       */}

      <div>
        <form action={formAction}>
          {/* Email */}
          <div className="space-y-5 mb-2">
            <div className="field">
              <div className="label_and_error">
                <label htmlFor="email">Email address </label>
                {errors?.email?.at(0) && (
                  <span className="error-msg">{errors?.email?.at(0)}</span>
                )}
              </div>

              <input
                type="text"
                autoComplete="email"
                name="email"
                disabled={isPending}
                id="email"
                defaultValue={input?.email}
                style={{ border: errors?.email?.at(0) && "1px solid #EC5757" }}
              />
            </div>

            {/* password */}
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
          </div>

          {/* Terms and condition */}
          <Terms />

          <button
            disabled={isPending}
            className={`btn btn-paid w-full h-[46px] mt-6 ${
              isPending && "opacity-80"
            }`}
          >
            {isPending ? "Signing up..." : "Continue to Sign up"}
          </button>
        </form>

        <p className="text-[15px] text-color-07 or-section">
          <span></span>OR <span></span>
        </p>
        {/* google */}
        <div className="mt-4 space-y-4">
          <button
            disabled={isPending}
            className="btn btn-edit btn-auth"
            onClick={() => googleSignInAction()}
          >
            <Image
              src={googleIcon}
              alt="google icon"
              quality={100}
              priority={true}
            />
            <span>Sign in with Google</span>
          </button>

          {/* github */}
          <button
            disabled={isPending}
            className="btn btn-draft btn-auth"
            onClick={() => githubSignInAction()}
          >
            <GithubIcon className="text-gray-300" />
            <span>Sign in with Github</span>
          </button>
        </div>

        <p className="text-[15px] text-center mt-4">
          Already have an account?{" "}
          <span
            className="text-color-02 underline ml-2 cursor-pointer"
            onClick={() => router.push("/user/signin")}
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignupForm;

{
  /* <p className="forgot-password underline text-sm cursor-pointer">
          Forgot Password?
        </p> */
}

// Create a:
// How may i address you page
