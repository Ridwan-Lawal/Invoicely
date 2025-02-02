import { customErrorToast, customSuccessToast } from "@/app/_lib/helpers";
import { onToggleDeleteModal } from "@/app/_lib/redux/dashboardSlice";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { useDispatch } from "react-redux";

export function useInvoiceMutations(mutationAction, mutationType) {
  const [state, formAction, isPending] = useActionState(mutationAction, null);
  const router = useRouter();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  useEffect(() => {
    if (state?.success === null || state?.success === undefined) return;
    if (state?.success) {
      {
        console.log("delettin");
        customSuccessToast(state?.message);
      }

      if (mutationType === "delete") {
        queryClient.invalidateQueries({
          queryKey: ["invoices"],
          refetchType: "all",
        });
        dispatch(onToggleDeleteModal());

        router.push("/");
      } else if (mutationType === "markAsPaid") {
        queryClient.invalidateQueries({
          queryKey: ["invoice"],
          refetchType: "all",
        });
      }
    }
    if (state?.success === false) customErrorToast(state?.message);
  }, [state, router, mutationType, queryClient, onToggleDeleteModal]);

  return { formAction, isPending };
}
