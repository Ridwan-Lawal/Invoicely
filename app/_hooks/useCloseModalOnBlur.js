import { useEffect } from "react";

export function useCloseModalOnBlur(setState) {
  useEffect(() => {
    function handleDropdown(e) {
      if (!e.target.closest(".dropdown")) {
        setState(false);
      }
    }

    document.addEventListener("click", handleDropdown);

    return () => document.removeEventListener("click", handleDropdown);
  }, [setState]);
}
