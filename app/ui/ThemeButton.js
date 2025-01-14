"use client";

import { useDispatch } from "react-redux";
import IconMoon from "@/public/icon-moon.svg";
import IconSun from "@/public/icon-sun.svg";
import { onToggleInvoiceForm } from "@/app/_lib/redux/dashboardSlice";
import Image from "next/image";

function ThemeButton() {
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(onToggleInvoiceForm())}>
      <Image src={IconMoon} alt="theme" quality={100} />
    </button>
  );
}

export default ThemeButton;
