import { add, addSeconds, format } from "date-fns";
import { CheckCircle, XCircle } from "lucide-react";
import toast from "react-hot-toast";

export function customSuccessToast(message) {
  return toast.custom((t) => (
    <div
      className={`${
        t.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } transform transition-all duration-300 ease-in-out max-w-md w-full bg-white dark:bg-color-04 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <CheckCircle className="h-6 w-6 text-green-400" />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-[15px] font-medium text-gray-900 dark:text-white">
              Success
            </p>
            <p className="mt-1 text-[15px] text-gray-500 dark:text-gray-100">
              {message}
            </p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-600 hover:text-gray-500 dark:text-white dark:hover:text-gray-200 focus:outline-none"
        >
          Close
        </button>
      </div>
    </div>
  ));
}

export function customErrorToast(message) {
  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        } transform transition-all duration-300 ease-in-out max-w-md w-full bg-white shadow-lg rounded-lg dark:bg-color-04 pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <XCircle className="h-6 w-6 text-red-400" />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Error
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-100">
                {message}
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-600 hover:text-gray-500 dark:text-white dark:hover:text-gray-200 focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    ),
    {
      duration: 4000,
      position: "top-right",
    }
  );
}

export function formatDate(date) {
  return format(date, "dd MMM yyyy");
}

export function generateInvoiceId() {
  const letters = Array.from(Array(26)).map((_, index) =>
    String.fromCharCode(65 + index)
  );

  const numbers = Array.from({ length: 9 }, (_, index) => index + 1);

  const lettersId = Array.from(
    { length: 2 },
    (_, i) => letters[Math.floor(Math.random() * 26)]
  );

  const numbersId = Array.from(
    { length: 4 },
    (_, i) => numbers[Math.floor(Math.random() * 9)]
  );

  const combinedId = [...lettersId, ...numbersId].join("");

  return combinedId;
}

export function formatCurrency(price) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(price);
}

export function paymentDue(issueDate, paymentTerms) {
  return (
    issueDate &&
    paymentTerms &&
    format(add(new Date(issueDate), { days: +paymentTerms }), "dd MMM yyyy")
  );
}

export function invoiceDate() {}
