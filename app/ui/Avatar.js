"use client";
import Image from "next/image";
import { ChevronDown, LogOut, User } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOutAction } from "@/app/_lib/actions";
import { customErrorToast, customSuccessToast } from "@/app/_lib/helpers";
import { useRouter } from "next/navigation";
import blackAvatar from "@/public/blank_avatar.png";

function Avatar({ user_profile, blurDataUrl }) {
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const pathname = usePathname();
  const [state, formAction, isSigningOut] = useActionState(signOutAction, null);
  const router = useRouter();

  const toggleSetting = () => setIsSettingOpen((cur) => !cur);

  useEffect(() => {
    if (state === undefined || state === null) return;
    if (state?.success) {
      router.push("/user/signin");
      customSuccessToast(state?.message);
    }
    if (state?.success === false) customErrorToast(state?.message);
  }, [state, router]);

  //   if we click on any other place on the screen apart from the settings, the menu should close
  useEffect(() => {
    function handleOnBlurSettings(e) {
      if (!e.target.closest(".avatar")) {
        setIsSettingOpen(false);
      }
    }

    document.addEventListener("click", handleOnBlurSettings);

    return () => document.removeEventListener("click", handleOnBlurSettings);
  }, []);

  return (
    <div className="avatar flex flex-col relative">
      <div onClick={toggleSetting} className="flex items-center gap-3">
        <div className="relative w-[32px] h-[32px] rounded-full overflow-hidden">
          {user_profile?.avatar_url ? (
            <Image
              src={user_profile?.avatar_url}
              alt="avatar"
              quality={100}
              placeholder={blurDataUrl ? "blur" : "empty"}
              blurDataURL={blurDataUrl}
              fill
              priority={true}
              className="object-cover"
            />
          ) : (
            <Image
              src={blackAvatar}
              alt="avatar"
              quality={100}
              placeholder={blurDataUrl ? "blur" : "empty"}
              blurDataURL={blurDataUrl}
              fill
              priority={true}
              className="object-cover"
            />
          )}
        </div>

        <button>
          <ChevronDown
            className={`text-white size-5 ${
              isSettingOpen
                ? "rotate-180 lgl:-rotate-90"
                : "rotate-0 lgl:rotate-0"
            } transition-transform`}
          />
        </button>
      </div>

      <div
        className={`settings grid ${
          isSettingOpen
            ? "grid-rows-[1fr] h-[140px] lgl:w-[160px] py-4 opacity-100"
            : "grid-rows-[0fr] overflow-hidden h-0 opacity-0 lgl:h-[140px] lgl:w-0"
        } transition-all`}
      >
        <p className="text-color-07 text-base dark:text-white">
          Hi, {user_profile?.full_name?.split(" ")?.at(0) ?? "User :)"}
        </p>

        <ul className="flex flex-col gap-4 mt-3">
          <Link href="/settings">
            <li style={{ color: pathname === "/settings" && "#7C5DFA" }}>
              <User className="size-5" />
              <span>Update Profile</span>
            </li>
          </Link>

          <form action={formAction}>
            <button>
              <li className="">
                <LogOut className="size-5" />
                <span>{isSigningOut ? "Signing out..." : "Sign Out"} </span>
              </li>
            </button>
          </form>
        </ul>
      </div>
    </div>
  );
}

export default Avatar;
