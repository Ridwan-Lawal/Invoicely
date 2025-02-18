import { useRef, useState } from "react";

export function usePasswordVisibility() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const passwordShowRef = useRef(null);

  function handlePasswordVisibility() {
    const passwordField = passwordShowRef.current;

    if (passwordField.type === "password") {
      setIsShowPassword(true);
    } else {
      setIsShowPassword(false);
    }
  }

  return { passwordShowRef, handlePasswordVisibility, isShowPassword };
}
