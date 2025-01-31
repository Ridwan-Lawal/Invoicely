import Image from "next/image";
import logo from "@/public/logo-auth.svg";

function Spinner() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="spinner-container relative h-[45px] w-[45px] md:h-[60px] md:w-[60px] ">
        <Image src={logo} alt="logo" fill className="object-contain" />
      </div>
    </div>
  );
}

export default Spinner;
