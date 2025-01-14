import LogoWhite from "@/public/logo-white.svg";
import Image from "next/image";

import avatar from "@/public/image-avatar.jpg";
import ThemeButton from "@/app/ui/ThemeButton";

function NavBar() {
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
          className="absolute top-[35%]"
        />
      </div>

      <div className="flex items-center justify-center gap-6 md:gap-6 lgl:flex-col">
        {/* theme toggle */}
        <div>
          <ThemeButton />
        </div>

        {/* Avatar */}
        <div className="avatar">
          <div className="relative w-[32px] h-[32px] rounded-full overflow-hidden">
            <Image
              src={avatar}
              alt="avatar"
              quality={100}
              placeholder="blur"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
