"use client";

import { filterStatus } from "@/app/_lib/constant";
import { Check, ChevronDown } from "lucide-react";
import Image from "next/image";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { RiCheckboxBlankFill } from "react-icons/ri";
import PlusIcon from "@/public/icon-plus.svg";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearForm, onToggleInvoiceForm } from "@/app/_lib/redux/formSlice";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getInvoices } from "@/app/_lib/data-service-client";

function DashboardHeader({ filter }) {
  const [isFilterOptionsOpen, setIsFilterOptionsOpen] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { data: invoices, error } = useQuery({
    queryKey: ["invoices", filter],
    queryFn: () => getInvoices(filter),
  });

  const onToggleFilterOptions = () => setIsFilterOptionsOpen((cur) => !cur);

  function addFilterToUrl(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("filter", filter);

    setFilterValue(filter);
    router.replace(`${pathname}?${params.toString()}`);
  }

  useEffect(() => {
    const filterValueInStorage = JSON.parse(
      localStorage.getItem("invoice-filter")
    );

    const filterToStore = filterValue || filterValueInStorage;
    localStorage.setItem("invoice-filter", JSON.stringify(filterToStore));
  }, [filterValue]);

  useEffect(() => {
    const filterFromStorage = JSON.parse(
      localStorage.getItem("invoice-filter")
    );
    setFilterValue(filterFromStorage);
  }, []);

  useEffect(() => {
    function closeFilterOptionsOnBlur(e) {
      if (!e.target.closest(".filter")) {
        setIsFilterOptionsOpen(false);
      }
    }

    document.addEventListener("click", closeFilterOptionsOnBlur);

    return () =>
      document.removeEventListener("click", closeFilterOptionsOnBlur);
  }, []);

  return (
    <div className="flex items-center justify-between ">
      <div className="flex flex-col gap-[3px] md:gap-[6px]">
        <h2 className="md:hidden">Invoices</h2>
        <h1 className="hidden md:block">Invoices</h1>
        <p className="variant-2">
          <span className="hidden md:inline">There are</span>{" "}
          {invoices?.length ? invoices?.length : "X"}
          <span className="hidden md:inline"> total</span> invoices
        </p>
      </div>

      {/* filter and new button */}
      <div className="flex  items-center gap-6 md:gap-8 ">
        {/* filter */}
        <div className="flex filter flex-col items-center   justify-center">
          <div
            onClick={onToggleFilterOptions}
            className="flex items-center gap-3 w-full  justify-center cursor-pointer"
          >
            <p className="text-[15px] font-bold leading-[15px] cursor-pointer ">
              Filter <span className="hidden md:inline">by status</span>
            </p>

            <ChevronDown
              className={`text-color-01 size-5 ${
                isFilterOptionsOpen ? "rotate-180" : "rotate-0"
              } transition-transform  `}
            />
          </div>

          <div className="relative">
            <ul
              className={`filter-options ${
                isFilterOptionsOpen ? "h-[148px] mt-4" : "h-0"
              } `}
            >
              {filterStatus?.map((filter) => (
                <li
                  key={filter}
                  className="group capitalize"
                  onClick={() => addFilterToUrl(filter)}
                >
                  <span>
                    {filter === filterValue ? (
                      <MdCheckBox className=" text-xl text-color-01 " />
                    ) : (
                      <RiCheckboxBlankFill className="text-xl text-color-05 group-hover:border-2 dark:text-color-03 border-color-01 transition-all rounded-[2px] " />
                    )}
                  </span>
                  <span className="capitilize">{filter}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* new button */}
        <div className="">
          <button
            onClick={() => {
              dispatch(onToggleInvoiceForm());
              dispatch(clearForm());
            }}
            className="btn btn-new-invoice "
          >
            <span className="plus-icon">
              <Image src={PlusIcon} alt="new" quality={100} priority={true} />
            </span>
            <span>
              {" "}
              New<span className="hidden  md:inline"> Invoice </span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
