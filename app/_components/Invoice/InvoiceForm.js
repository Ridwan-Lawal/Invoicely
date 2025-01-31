"use client";

import InvoiceFormField from "@/app/_components/Invoice/InvoiceFormField";
import InvoiceIssueDate from "@/app/_components/Invoice/InvoiceIssueDate";
import PaymentTerms from "@/app/_components/Invoice/PaymentTerms";
import { usePasswordInputFocus } from "@/app/_hooks/usePasswordInputFocus";
import {
  customErrorToast,
  customSuccessToast,
  formatCurrency,
  formatDate,
  generateInvoiceId,
} from "@/app/_lib/helpers";
import { ChevronDown, ChevronLeft } from "lucide-react";
import DeleteIcon from "@/public/icon-delete.svg";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useGetSupabaseClientSession } from "@/app/_hooks/useGetSupabaseClientSession";
import { addInvoiceAction } from "@/app/_lib/actions";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { onToggleInvoiceForm } from "@/app/_lib/redux/formSlice";
import { useQueryClient } from "@tanstack/react-query";
import { clearForm } from "@/app/_lib/redux/formSlice";

const schema = z.object({
  user: z.object({
    address: z.string().min(1, { message: "Field can't be empty" }),
    city: z.string().min(1, { message: "Field can't be empty" }),
    postCode: z.string().min(1, { message: "Field can't be empty" }),
    country: z.string().min(1, { message: "Field can't be empty" }),
  }),

  client: z.object({
    name: z.string().min(1, { message: "Field can't be empty" }),
    email: z.string().min(1, { message: "Field can't be empty" }),
    address: z.string().min(1, { message: "Field can't be empty" }),
    city: z.string().min(1, { message: "Field can't be empty" }),
    postCode: z.string().min(1, { message: "Field can't be empty" }),
    country: z.string().min(1, { message: "Field can't be empty" }),
  }),

  invoice: z.object({
    projectDesc: z.string().min(1, { message: "Field can't be empty" }),
  }),
  items: z.array(
    z.object({
      name: z.string().min(1, { message: "Field can't be empty" }),
      quantity: z.string().min(1, { message: "Field can't be empty" }),
      price: z.string().min(1, { message: "Field can't be empty" }),
    })
  ),
});

function InvoiceForm() {
  const { passwordRef, isPasswordInputOnFocus } = usePasswordInputFocus();

  const {
    passwordRef: issueDateRef,
    isPasswordInputOnFocus: isIssueDateInputOnFocus,
  } = usePasswordInputFocus();

  const queryClient = useQueryClient();

  const { isInvoiceFormOpen } = useSelector((store) => store.form);
  const { formDataToEdit, formType } = useSelector((store) => store.form);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    reset,
    control,
    getValues,
    submit,
    formState: { errors, isSubmitted, isLoading, isSubmitting },
  } = useForm({
    values: formDataToEdit
      ? formDataToEdit
      : { items: [{ name: "", price: "", quantity: "" }] },
    resolver: zodResolver(schema),
  });

  const [isSubmittingDraft, setIsSubmittingDraft] = useState(false);

  const { user, client, invoice, items } = errors ?? {};

  //   for adding and deleting more items
  const { fields, append, remove } = useFieldArray({ control, name: "items" });

  //   handler to add and delete  items
  const addNewItem = () => append({ name: "", quantity: 0, price: 0 });

  const removeItem = (index) => remove(index);

  const [issueDate, setIssueDate] = useState(new Date());

  const [paymentTerms, setPaymentTerms] = useState(30);

  const handleDateSelect = (newSelected) => {
    setIssueDate(newSelected);
  };
  const handlePaymentTerms = (terms) => {
    setPaymentTerms(terms);
  };

  function onSubmitDraft() {
    setIsSubmittingDraft(true);
    const data = getValues();
    const modifiedData = {
      ...data,
      id: generateInvoiceId(),
      status: "draft",
      invoice: { ...data?.invoice, paymentTerms: "", issueDate: "" },
    };

    addInvoiceAction(modifiedData).then((res) => {
      if (res?.success) {
        queryClient.invalidateQueries({ queryKey: ["invoices"] });
        customSuccessToast(res?.message);
        setIsSubmittingDraft(false);
        reset();
        dispatch(onToggleInvoiceForm());
      } else {
        customErrorToast(res?.message);
        setIsSubmittingDraft(false);
      }
    });
  }

  function onSubmit(data) {
    const modifiedData = {
      ...data,
      id: formType === "create" ? generateInvoiceId() : formDataToEdit?.id,
      status: "pending",
      invoice: { ...data?.invoice, paymentTerms, issueDate: `${issueDate}` },
    };

    addInvoiceAction(modifiedData, formType).then((res) => {
      if (res?.success) {
        if (formType === "create") {
          queryClient.invalidateQueries({ queryKey: ["invoices"] });
        } else {
          queryClient.invalidateQueries({ queryKey: ["invoice"] });
          queryClient.invalidateQueries({ queryKey: ["invoices"] });
          reset();
        }
        customSuccessToast(res?.message);
        reset();
        dispatch(onToggleInvoiceForm());

        if (formType === "edit") dispatch(clearForm());
      } else {
        customErrorToast(res?.message);
      }
    });
  }

  function onDiscard() {
    reset();
    dispatch(onToggleInvoiceForm());
    if (formType === "edit") dispatch(clearForm());
  }

  useEffect(() => {
    function handleFormOnBlur(e) {
      if (e.target.classList.contains("invoice-form-overlay")) {
        reset();
        dispatch(onToggleInvoiceForm());
        dispatch(clearForm());
      }
    }

    document.addEventListener("click", handleFormOnBlur);

    return () => document.removeEventListener("click", handleFormOnBlur);
  }, [dispatch, reset]);

  useEffect(() => {
    if (formType === "create") reset(undefined);
  }, [formType, reset]);

  return (
    <div
      className={`invoice-form-overlay ${
        isInvoiceFormOpen
          ? "w-full bg-opacity-30 flex-1"
          : "w-0  overflow-hidden bg-opacity-0 flex-0 pointer-events-none"
      }    lgl:-ml-5 fixed transition-all ease-in-out inset-0 z-50  lgl:top-0 lgl:left-[103px] lgl:z-40 duration-300`}
    >
      <div
        className={` invoice-form-container ${
          isInvoiceFormOpen ? "w-full md:w-[616px]" : "w-0 overflow-hidden"
        } transition-all `}
      >
        <div className="invoice-form-parent-element pt-6  ">
          {/* Heading */}

          {/* form */}
          <form className="invoice-form " onSubmit={handleSubmit(onSubmit)}>
            {/* overflow container */}
            <div className="form-overflow lgl:h-[80vh]">
              <h2 className="mt-0 ">New Invoice</h2>
              {/* ========== bill from ========*/}
              <fieldset>
                <legend>Bill From</legend>
                <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                  {/* street address */}
                  <InvoiceFormField
                    label="Street Address"
                    style="col-span-2 md:col-span-3"
                    error={user?.address?.message}
                  >
                    <input
                      type="text"
                      disabled={isSubmitting || isSubmittingDraft}
                      style={{
                        border: user?.address?.message && "1px solid #ec5757",
                      }}
                      name="streetAddress"
                      id="streetAddress"
                      {...register("user.address")}
                    />
                  </InvoiceFormField>

                  {/* city */}

                  <InvoiceFormField label="City" error={user?.city?.message}>
                    <input
                      type="text"
                      disabled={isSubmitting}
                      style={{
                        border: user?.city?.message && "1px solid #ec5757",
                      }}
                      name="city"
                      id="city"
                      {...register("user.city")}
                    />
                  </InvoiceFormField>

                  {/* post code */}
                  <InvoiceFormField
                    label="Post Code"
                    error={user?.postCode?.message}
                  >
                    <input
                      type="text"
                      disabled={isSubmitting}
                      style={{
                        border: user?.postCode?.message && "1px solid #ec5757",
                      }}
                      name="postCode"
                      id="postCode"
                      {...register("user.postCode")}
                    />
                  </InvoiceFormField>

                  {/* country */}
                  <InvoiceFormField
                    label="Country"
                    style="col-span-2 md:col-span-1"
                    error={user?.country?.message}
                  >
                    <input
                      type="text"
                      disabled={isSubmitting}
                      style={{
                        border: user?.country?.message && "1px solid #ec5757",
                      }}
                      name="country"
                      id="country"
                      {...register("user.country")}
                    />
                  </InvoiceFormField>
                </div>
              </fieldset>

              {/* ====================== BILL TO ========= */}
              <fieldset>
                <legend>Bill To</legend>
                <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                  {/* Client name */}
                  <InvoiceFormField
                    label="Client's Name"
                    style="col-span-2 md:col-span-3"
                    error={client?.name?.message}
                  >
                    <input
                      type="text"
                      disabled={isSubmitting}
                      style={{
                        border: client?.name?.message && "1px solid #ec5757",
                      }}
                      name="clientName"
                      id="clientName"
                      {...register("client.name")}
                    />
                  </InvoiceFormField>

                  {/* clietn email */}
                  <InvoiceFormField
                    label="Client's Email"
                    style="col-span-2 md:col-span-3"
                    error={client?.email?.message}
                  >
                    <input
                      type="text"
                      disabled={isSubmitting}
                      style={{
                        border: client?.email?.message && "1px solid #ec5757",
                      }}
                      name="clientEmail"
                      id="clientEmail"
                      {...register("client.email")}
                    />
                  </InvoiceFormField>

                  {/* Street Address */}
                  <InvoiceFormField
                    label="Street Address"
                    style="col-span-2 md:col-span-3"
                    error={client?.address?.message}
                  >
                    <input
                      type="text"
                      disabled={isSubmitting}
                      style={{
                        border: client?.address?.message && "1px solid #ec5757",
                      }}
                      name="clientAddress"
                      id="clientAddress"
                      {...register("client.address")}
                    />
                  </InvoiceFormField>

                  {/* city */}
                  <InvoiceFormField label="City" error={client?.city?.message}>
                    <input
                      type="text"
                      disabled={isSubmitting}
                      style={{
                        border: client?.city?.message && "1px solid #ec5757",
                      }}
                      name="clientCity"
                      id="clientCity"
                      {...register("client.city")}
                    />
                  </InvoiceFormField>

                  {/* Post code  */}
                  <InvoiceFormField
                    label="Post Code"
                    error={client?.postCode?.message}
                  >
                    <input
                      type="text"
                      disabled={isSubmitting}
                      style={{
                        border:
                          client?.postCode?.message && "1px solid #ec5757",
                      }}
                      name="clientPostCode"
                      id="clientPostCode"
                      {...register("client.postCode")}
                    />
                  </InvoiceFormField>

                  {/* Country */}
                  <InvoiceFormField
                    label="Country"
                    style="col-span-2 md:col-span-1"
                    error={client?.country?.message}
                  >
                    <input
                      type="text"
                      disabled={isSubmitting}
                      style={{
                        border: client?.country?.message && "1px solid #ec5757",
                      }}
                      name="clientCountry"
                      id="clientCountry"
                      {...register("client.country")}
                    />
                  </InvoiceFormField>
                </div>
              </fieldset>

              {/* ======== Payment Terms ======== */}

              <fieldset>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Invoice Date */}
                  <InvoiceIssueDate
                    isIssueDateInputOnFocus={isIssueDateInputOnFocus}
                    selected={issueDate}
                    onSelect={handleDateSelect}
                  >
                    <input
                      type="text"
                      disabled={isSubmitting}
                      ref={issueDateRef}
                      name="issueDate"
                      id="issueDate"
                      className="cursor-pointer"
                      value={formatDate(issueDate)}
                      onChange={() => {}}
                    />
                  </InvoiceIssueDate>

                  {/* Payment Terms */}
                  <PaymentTerms
                    isPasswordInputOnFocus={isPasswordInputOnFocus}
                    onPaymentTerms={handlePaymentTerms}
                    paymentTerms={paymentTerms}
                  >
                    <input
                      type="text"
                      disabled={isSubmitting}
                      ref={passwordRef}
                      name="paymentTerms"
                      id="paymentTerms"
                      className="cursor-pointer"
                      value={`Net ${paymentTerms} ${
                        paymentTerms > 1 ? "Days" : "Day"
                      }`}
                      onChange={() => {}}
                    />
                  </PaymentTerms>

                  {/* Project Description */}
                  <InvoiceFormField
                    label="Project Description"
                    style="md:col-span-2"
                    error={invoice?.projectDesc?.message}
                  >
                    <input
                      type="text"
                      disabled={isSubmitting}
                      style={{
                        border:
                          invoice?.projectDesc?.message && "1px solid #ec5757",
                      }}
                      name="projectDescription"
                      id="projectDescription"
                      {...register("invoice.projectDesc")}
                    />
                  </InvoiceFormField>
                </div>
              </fieldset>

              {/*============ Item List ============ */}

              <fieldset className="">
                <legend className="item-list">Item List</legend>

                {/* All items */}
                <div>
                  {/* each item div */}
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="gap-5 flex flex-col md:flex-row"
                    >
                      {/* item Name */}
                      <div className="md:w-[214px]">
                        <InvoiceFormField
                          label="Item Name"
                          section="items-list"
                          error={items?.[index]?.name?.message}
                        >
                          <input
                            type="text"
                            disabled={isSubmitting}
                            style={{
                              border:
                                items?.[index]?.name?.message &&
                                "1px solid #ec5757",
                            }}
                            name="itemName"
                            id="itemName"
                            {...register(`items.${index}.name`, {
                              required: "Field can't be empty",
                            })}
                          />
                        </InvoiceFormField>
                      </div>

                      {/* qty, price, total */}
                      <div className="gap-5 flex justify-between">
                        {/* qty */}
                        <div className="w-[30%] md:w-[46px] min-h-[64px]">
                          <InvoiceFormField
                            label="Qty."
                            section="items-list"
                            error={items?.[index]?.quantity?.message}
                          >
                            <input
                              type="number"
                              disabled={isSubmitting}
                              style={{
                                border:
                                  items?.[index]?.quantity?.message &&
                                  "1px solid #ec5757",
                              }}
                              name="itemQty"
                              id="itemQty"
                              {...register(`items.${index}.quantity`, {
                                required: "Field can't be empty",
                              })}
                            />
                          </InvoiceFormField>
                        </div>

                        {/* price */}
                        <div className="min-h-[100px] md:w-[100px] w-[40%]">
                          <InvoiceFormField
                            label="Price"
                            section="items-list"
                            error={items?.[index]?.price?.message}
                          >
                            <input
                              type="number"
                              disabled={isSubmitting}
                              style={{
                                border:
                                  items?.[index]?.price?.message &&
                                  "1px solid #ec5757",
                              }}
                              name="price"
                              id="price"
                              {...register(`items.${index}.price`, {
                                required: "Field can't be empty",
                              })}
                            />
                          </InvoiceFormField>
                        </div>

                        {/* Total */}

                        <div className="md:w-[56px">
                          <InvoiceFormField label="Total" section="items-list">
                            <p
                              style={{ marginTop: "22px" }}
                              className="font-bold text-[15px] leading-[15px] tracking-[-0.25px] text-color-06"
                            >
                              {formatCurrency(
                                +getValues(`items[${index}].quantity`) *
                                  +getValues(`items[${index}].price`)
                              )}
                            </p>
                          </InvoiceFormField>
                        </div>

                        {/* delete button */}
                        <button
                          type="button"
                          disabled={isSubmitting}
                          onClick={() => removeItem(index)}
                          className="border h-fit self-center -mt-3 "
                        >
                          <Image src={DeleteIcon} alt="delete" quality={100} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={addNewItem}
                  className="btn btn-add-newitem capitalize w-full"
                >
                  + Add new item
                </button>
              </fieldset>
            </div>

            {/* buttons */}
            <div
              className={`button-section top-shadow-medium flex items-center gap-[7px] w-full   ${
                formType === "create" ? "justify-between" : "justify-end"
              }`}
            >
              {formType === "create" && (
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={onDiscard}
                  className="btn btn-cancel"
                >
                  Discard
                </button>
              )}

              <div className="flex items-center gap-[7px] md:gap-[8px]">
                {formType === "create" ? (
                  <>
                    <button
                      type="button"
                      disabled={isSubmitting || isSubmittingDraft}
                      onClick={onSubmitDraft}
                      value="draft"
                      className={"btn btn-draft"}
                    >
                      {isSubmittingDraft ? "Drafting..." : "Save as Draft"}
                    </button>
                    <button
                      value="submit"
                      type="submit"
                      className="btn btn-paid"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Creating invoice..." : "  Save & Send"}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      disabled={isSubmitting}
                      onClick={onDiscard}
                      type="reset"
                      className="btn btn-cancel"
                    >
                      Cancel
                    </button>{" "}
                    <button
                      disabled={isSubmitting}
                      value="submit"
                      type="submit"
                      className="btn btn-paid"
                    >
                      {isSubmitting ? "Updating..." : "Save changes"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default InvoiceForm;
