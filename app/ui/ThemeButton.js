"use client";

import { useDispatch, useSelector } from "react-redux";
import IconMoon from "@/public/icon-moon.svg";
import IconSun from "@/public/icon-sun.svg";
import {
  getTheme,
  onToggleTheme,
  onUpdateTheme,
} from "@/app/_lib/redux/dashboardSlice";
import Image from "next/image";
import { useEffect } from "react";

// build the skeleton loader
// domain
// and push to production
// fixed the theme

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

  useEffect(() => {
    localStorage.setItem("isThemeDark", JSON.stringify(isThemeDark));
  }, [isThemeDark]);

  useEffect(() => {
    const themeInLocalStorage = JSON.parse(localStorage.getItem("isThemeDark"));

    dispatch(onUpdateTheme(themeInLocalStorage));
  }, [dispatch]);

  return (
    <button onClick={() => dispatch(onToggleTheme())}>
      <Image src={isThemeDark ? IconSun : IconMoon} alt="theme" quality={100} />
    </button>
  );
}

export default ThemeButton;
