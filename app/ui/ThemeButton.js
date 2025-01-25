"use client";

import { useDispatch, useSelector } from "react-redux";
import IconMoon from "@/public/icon-moon.svg";
import IconSun from "@/public/icon-sun.svg";
import { getTheme, onToggleTheme } from "@/app/_lib/redux/dashboardSlice";
import Image from "next/image";
import { useEffect } from "react";

function ThemeButton() {
  const dispatch = useDispatch();
  const { isThemeDark } = useSelector(getTheme);

  useEffect(() => {
    if (isThemeDark) {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
  }, [isThemeDark]);

  return (
    <button onClick={() => dispatch(onToggleTheme())}>
      <Image src={isThemeDark ? IconSun : IconMoon} alt="theme" quality={100} />
    </button>
  );
}

export default ThemeButton;
