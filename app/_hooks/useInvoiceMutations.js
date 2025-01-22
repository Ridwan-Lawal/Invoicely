import { customErrorToast, customSuccessToast } from "@/app/_lib/helpers";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

export function useInvoiceMutations(mutationAction, mutationType) {
  const [state, formAction, isPending] = useActionState(mutationAction, null);
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (state?.success === null || state?.success === undefined) return;
    if (state?.success) {
      customSuccessToast(state?.message);

      if (mutationType === "delete") {
        queryClient.invalidateQueries({
          queryKey: ["invoices"],
          refetchType: "all",
        });

        router.push("/");
      } else if (mutationType === "markAsPaid") {
        queryClient.invalidateQueries({
          queryKey: ["invoice"],
          refetchType: "all",
        });
      }
    }
    if (state?.success === false) customErrorToast(state?.message);
  }, [state, router, mutationType, queryClient]);

  return { formAction, isPending };
}
