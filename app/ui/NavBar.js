import LogoWhite from "@/public/logo-white.svg";
import Image from "next/image";
import IconMoon from "@/public/icon-moon.svg";
import IconSun from "@/public/icon-sun.svg";
import avatar from "@/public/image-avatar.jpg";

function NavBar() {
  return (
    <nav className="bg-color-13 border h-[75px] flex items-center justify-between">
      {/* logo */}
      <div className="relative overflow-hidden rounded-r-[20px] flex flex-col items-center justify-center">
        <div className=" bg-color-01  w-[72px] h-[73px] flex items-center justify-center overflow-hidden  "></div>

        <div className="absolute top-[50%] bg-color-02  w-[72px] h-[73px] flex items-center justify-center  rounded-l-3xl"></div>

        <Image
          src={LogoWhite}
          alt="logo"
          quality={100}
          className="absolute top-[35%]"
        />
      </div>

      <div className="flex items-center ">
        {/* theme toggle */}
        <div>
          <button>
            <Image src={IconMoon} alt="theme" quality={100} />
          </button>
        </div>

        {/* Avatar */}
        <div>
          <div className="relative w-[32px] h-[32px] rounded-full">
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
