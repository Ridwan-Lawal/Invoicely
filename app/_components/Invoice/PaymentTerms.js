"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

function PaymentTerms({ children, isPasswordInputOnFocus }) {
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const onOpenTerms = () => setIsTermsOpen((cur) => !cur);

  return (
    <div className="field">
      <div className="label_and_error">
        <label htmlFor={children?.props?.name}>Payment Terms</label>
      </div>

      <div className="payment-terms space-y-3 ">
        {/* select */}
        <div
          onClick={onOpenTerms}
          className={`password ${
            isPasswordInputOnFocus
              ? "border border-color-01"
              : "dark:border-color-04"
          }`}
        >
          {children}

          <button>
            <ChevronDown
              className={`*:size-5 text-color-01 ${
                isTermsOpen ? "rotate-180" : "rotate-0"
              } transition-transform `}
            />
          </button>
        </div>

        {/* options */}
        {isTermsOpen && (
          <div className="relative">
            <ul className="options ">
              {[1, 7, 14, 30].map((num) => (
                <li
                  key={num}
                  className={`py-3.5 px-6 ${
                    num !== 30 &&
                    "border-b border-color-05 dark:border-color-03"
                  } `}
                >
                  Net {num} {num === 1 ? "Day" : "Days"}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentTerms;
