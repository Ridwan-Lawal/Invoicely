"use client";
import Image from "next/image";
import { ChevronDown, LogOut, User } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Avatar({ user_profile, blurDataUrl }) {
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const pathname = usePathname();
  console.log(pathname);

  const toggleSetting = () => setIsSettingOpen((cur) => !cur);

  return (
    <div className="avatar flex flex-col relative">
      <div onClick={toggleSetting} className="flex items-center gap-3">
        <div className="relative w-[32px] h-[32px] rounded-full overflow-hidden">
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
        </div>

        <button>
          <ChevronDown
            className={`text-white size-5 ${
              isSettingOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>

      <div
        className={`settings grid ${
          isSettingOpen
            ? "grid-cols-[1fr] h-[140px] py-4 opacity-100"
            : "grid-cols-[0fr] overflow-hidden h-0 opacity-0"
        } transition-all`}
      >
        <p className="text-color-07 text-base dark:text-white">
          Hi, {user_profile?.name?.split(" ")?.at(0)}
        </p>

        <ul className="flex flex-col gap-4 mt-3">
          <Link href="/settings">
            <li style={{ color: pathname === "/settings" && "#7C5DFA" }}>
              <User className="size-5" />
              <span>Update Profile</span>
            </li>
          </Link>

          <li className="">
            <LogOut className="size-5" />
            <span>Sign out</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Avatar;
