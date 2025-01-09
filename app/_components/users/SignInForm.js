"use client";
import { usePasswordInputFocus } from "@/app/_hooks/usePasswordInputFocus";
import { usePasswordVisibility } from "@/app/_hooks/usePasswordVisibility";
import LogoAuth from "@/public/logo-auth.svg";
import googleIcon from "@/public/google-logo.svg";
import { Eye, EyeClosed, Github, GithubIcon } from "lucide-react";
import Image from "next/image";
import Terms from "@/app/_components/users/Terms";
import { useRouter } from "next/navigation";

function SigninForm() {
  const router = useRouter();
  const { isPasswordInputOnFocus, passwordRef } = usePasswordInputFocus();
  const { passwordShowRef, isShowPassword, handlePasswordVisibility } =
    usePasswordVisibility();

  return (
    <div className="flex flex-col items-center justify-center max-w-[400px] mx-auto mt-8 pb-12">
      <div className="flex flex-col  h-screen gap-8 justify-center w-full">
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
          <form action="">
            {/* Email */}
            <div className="space-y-5 mb-2">
              <div className="field">
                <div className="label_and_error">
                  <label htmlFor="email">Email address </label>
                  <span className="error-msg">Lorem, ipsum dolor.</span>
                </div>

                <input
                  type="text"
                  name="email"
                  autoComplete="email"
                  id="email"
                />
              </div>

              {/* password */}
              <div className="field">
                <div className="label_and_error ">
                  <label htmlFor="password">Password </label>

                  <span className="error-msg">Lorem, ipsum dolor.</span>
                </div>

                <div
                  ref={passwordRef}
                  className={`password ${
                    isPasswordInputOnFocus
                      ? "border border-color-02  dark:border-color-01 "
                      : "border-color-05 dark:border-color-04"
                  }`}
                >
                  <input
                    ref={passwordShowRef}
                    type={isShowPassword ? "text" : "password"}
                    name="password"
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

            {/* forgot password */}
            <p className="forgot-password underline text-sm cursor-pointer  ">
              Forgot Password?
            </p>

            <button className="btn btn-paid w-full h-[46px] mt-6">
              Continue to Sign In
            </button>
          </form>

          <p className="text-[15px] text-color-07 or-section">
            <span></span>OR <span></span>
          </p>
          {/* google */}
          <div className="mt-4 space-y-4">
            <button className="btn btn-edit btn-auth">
              <Image
                src={googleIcon}
                alt="google icon"
                quality={100}
                priority={true}
              />
              <span>Sign in with Google</span>
            </button>

            {/* github */}
            <button className="btn btn-draft btn-auth">
              <GithubIcon className="text-gray-300" />
              <span>Sign in with Github</span>
            </button>
          </div>

          <p className="text-[15px] text-center mt-4">
            Don't have an account?{" "}
            <span
              className="text-color-02 underline ml-2 cursor-pointer"
              onClick={() => router.push("/user/signup")}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SigninForm;

{
  /* */
}
