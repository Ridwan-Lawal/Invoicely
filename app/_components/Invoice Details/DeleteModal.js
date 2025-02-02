"use client";

import { useInvoiceMutations } from "@/app/_hooks/useInvoiceMutations";
import { deleteInvoiceAction } from "@/app/_lib/actions";
import {
  getDeleteModalValue,
  onToggleDeleteModal,
} from "@/app/_lib/redux/dashboardSlice";
import { useDispatch, useSelector } from "react-redux";

function DeleteModal({ invoiceId }) {
  const { formAction: deleteAction, isPending: isDeleting } =
    useInvoiceMutations(deleteInvoiceAction, "delete", onToggleDeleteModal);

  const isDeleteModalOpen = useSelector(getDeleteModalValue);
  const dispatch = useDispatch();

  return (
    <div
      className={`bg-black bg-opacity-20 backdrop-blur-sm h-screen fixed top-0 z-50 right-0 flex items-center justify-center  ${
        isDeleteModalOpen ? "w-screen px-8" : "w-0"
      } overflow-hidden `}
    >
      <div
        className={`bg-white dark:bg-color-03 rounded-[8px] max-w-[400px] py-8 px-8 ${
          isDeleteModalOpen ? "scale-100" : "scale-75"
        } transition-transform  `}
      >
        <h2>Confirm Deletion</h2>
        <p className="variant-2 mt-2">
          Are you sure you want to delete invoice #{invoiceId}? This cannot be
          undone.
        </p>

        <div className="flex items-center justify-end gap-3 mt-8">
          <button
            onClick={() => dispatch(onToggleDeleteModal())}
            className="btn btn-cancel"
          >
            Cancel
          </button>
          <form action={deleteAction}>
            <input type="hidden" name="invoiceId" value={invoiceId} />
            <button
              disabled={isDeleting}
              style={{ opacity: isDeleting && 0.8 }}
              className="btn btn-delete"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
