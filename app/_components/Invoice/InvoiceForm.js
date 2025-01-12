"use client";

import InvoiceFormField from "@/app/_components/Invoice/InvoiceFormField";
import InvoiceIssueDate from "@/app/_components/Invoice/InvoiceIssueDate";
import PaymentTerms from "@/app/_components/Invoice/PaymentTerms";
import { usePasswordInputFocus } from "@/app/_hooks/usePasswordInputFocus";
import { formatDate } from "@/app/_lib/helpers";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { useState } from "react";

function InvoiceForm() {
  const { passwordRef, isPasswordInputOnFocus } = usePasswordInputFocus();
  const {
    passwordRef: issueDateRef,
    isPasswordInputOnFocus: isIssueDateInputOnFocus,
  } = usePasswordInputFocus();

  const [date, setDate] = useState(new Date());
  const handleSelect = (newSelected) => {
    setDate(newSelected);
    console.log(newSelected, "selected");
  };

  console.log(date, "current");
  return (
    <div className="invoice-form-overlay">
      <div className=" invoice-form-container">
        <div className="invoice-form-parent-element py-6">
          {/* go back */}
          <button className="btn-back">
            <ChevronLeft className="text-color-01 size-4" />{" "}
            <span>Go back</span>
          </button>

          {/* Heading */}
          <h2 className="mt-6">New Invoice</h2>

          {/* form */}
          <form action="" className="invoice-form ">
            {/* ========== bill from ========*/}
            <fieldset>
              <legend>Bill From</legend>
              <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                {/* street address */}
                <InvoiceFormField
                  label="Street Address"
                  style="col-span-2 md:col-span-3"
                >
                  <input type="text" name="streetAddress" id="streetAddress" />
                </InvoiceFormField>

                {/* city */}

                <InvoiceFormField label="City">
                  <input type="text" name="city" id="city" />
                </InvoiceFormField>

                {/* post code */}
                <InvoiceFormField label="Post  Code">
                  <input type="text" name="postCode" id="postCode" />
                </InvoiceFormField>

                {/* country */}
                <InvoiceFormField
                  label="Country"
                  style="col-span-2 md:col-span-1"
                >
                  <input type="text" name="country" id="country" />
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
                >
                  <input type="text" name="clientName" id="clientName" />
                </InvoiceFormField>

                {/* clietn email */}
                <InvoiceFormField
                  label="Client's Email"
                  style="col-span-2 md:col-span-3"
                >
                  <input type="text" name="clientEmail" id="clientEmail" />
                </InvoiceFormField>

                {/* Street Address */}
                <InvoiceFormField
                  label="Street Address"
                  style="col-span-2 md:col-span-3"
                >
                  <input type="text" name="clientAddress" id="clientAddress" />
                </InvoiceFormField>

                {/* city */}
                <InvoiceFormField label="City">
                  <input type="text" name="clientCity" id="clientCity" />
                </InvoiceFormField>

                {/* Post code  */}
                <InvoiceFormField label="Post Code">
                  <input
                    type="text"
                    name="clientPostCode"
                    id="clientPostCode"
                  />
                </InvoiceFormField>

                {/* Country */}
                <InvoiceFormField
                  label="Country"
                  style="col-span-2 md:col-span-1"
                >
                  <input type="text" name="clientCountry" id="clientCountry" />
                </InvoiceFormField>
              </div>
            </fieldset>

            {/* ======== Payment Terms ======== */}

            <fieldset>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Invoice Date */}
                <InvoiceIssueDate
                  isIssueDateInputOnFocus={isIssueDateInputOnFocus}
                  selected={date}
                  onSelect={handleSelect}
                >
                  <input
                    type="text"
                    ref={issueDateRef}
                    name="IssueDate"
                    id="IssueDate"
                    className="cursor-pointer"
                    value={formatDate(date)}
                    onChange={() => {}}
                  />
                </InvoiceIssueDate>

                {/* Payment Terms */}
                <PaymentTerms isPasswordInputOnFocus={isPasswordInputOnFocus}>
                  <input
                    type="text"
                    ref={passwordRef}
                    name="paymentTerms"
                    id="paymentTerms"
                    className="cursor-pointer"
                    value="Net 30 Days "
                    onChange={() => {}}
                  />
                </PaymentTerms>

                {/* Project Description */}
                <InvoiceFormField
                  label="Project Description"
                  style="md:col-span-2"
                >
                  <input
                    type="text"
                    name="projectDescription"
                    id="projectDescription"
                  />
                </InvoiceFormField>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
}

export default InvoiceForm;
