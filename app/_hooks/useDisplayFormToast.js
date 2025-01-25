import { customErrorToast, customSuccessToast } from "@/app/_lib/helpers";
import { useEffect } from "react";

export function useDisplayFormToast(state) {
  useEffect(() => {
    if (state === undefined || state === null) return;

    if (state?.success) customSuccessToast(state?.message);

    if (state?.success === false) customErrorToast(state?.message);
  }, [state]);
}
