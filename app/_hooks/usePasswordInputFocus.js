import { useEffect, useRef, useState } from "react";

export function usePasswordInputFocus() {
  const [isPasswordInputOnFocus, setIsPasswordInputOnFocus] = useState(false);
  const passwordRef = useRef(null);
  useEffect(() => {
    const passwordEl = passwordRef.current;

    function handlePasswordInputFocusIn(e) {
      setIsPasswordInputOnFocus(true);
    }
    function handlePasswordInputFocusOut(e) {
      setIsPasswordInputOnFocus(false);
    }

    passwordEl.addEventListener("focusin", handlePasswordInputFocusIn);
    passwordEl.addEventListener("focusout", handlePasswordInputFocusOut);

    return () => {
      passwordEl.removeEventListener("focusin", handlePasswordInputFocusIn);
      passwordEl.removeEventListener("focusout", handlePasswordInputFocusOut);
    };
  }, []);

  return { isPasswordInputOnFocus, passwordRef };
}
