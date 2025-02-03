import LogoWhite from "@/public/logo-white.svg";
import Image from "next/image";

import {
  convertHeicToJpg,
  convertImage,
  getBase64,
  getProfile,
} from "@/app/_lib/data-service";
import Avatar from "@/app/ui/Avatar";
import ThemeButton from "@/app/ui/ThemeButton";
import Link from "next/link";

async function NavBar() {
  const user_profile = await getProfile();

  const isThereDP = !user_profile?.avatar_url.includes("undefined");
  const blurDataUrl = isThereDP && (await getBase64(user_profile?.avatar_url));

  return (
    <nav className="nav lgl:rounded-r-3xl lgl:w-[103px]">
      {/* logo */}

      <div className="relative overflow-hidden rounded-r-[20px] flex flex-col items-center justify-center w-[72px] h-[73px] md:h-[80px] lgl:w-[103px] lgl:h-[103px] md:w-[80px] ">
        <div className=" bg-color-01  w-[72px] h-[73px] md:h-[80px] lgl:w-[103px] lgl:h-[103px] md:w-[80px] flex items-center justify-center overflow-hidden  "></div>

        <div className="absolute top-[50%] bg-color-02  w-[72px] h-[73px]  md:h-[80px] lgl:w-[103px] lgl:h-[103px] md:w-[80px]  flex items-center justify-center  rounded-l-3xl"></div>

        <Image
          src={LogoWhite}
          alt="logo"
          quality={100}
          className="absolute top-[35%] cursor-pointer"
        />
      </div>

      <div className="flex items-center justify-center gap-6 md:gap-6 lgl:flex-col">
        {/* theme toggle */}
        <div>
          <ThemeButton />
        </div>

        {/* Avatar */}
        <Avatar
          user_profile={user_profile}
          isThereDp={isThereDP}
          blurDataUrl={blurDataUrl}
        />
      </div>
    </nav>
  );
}

export default NavBar;
