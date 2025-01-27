import ResetPassword from "@/app/_components/settings/ResetPassword";
import UpdateProfile from "@/app/_components/settings/UpdateProfile";
import { getProfile } from "@/app/_lib/data-service";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Settings",
};

async function Page() {
  const user_profile = await getProfile();

  return (
    <div className="space-y-10 mb-14">
      <Link href="/">
        <button className="btn btn-back">
          <ChevronLeft className="size-4 text-color-01" /> <span>Go home</span>
        </button>
      </Link>
      <div className="bg-white py-4 px-6 shadow-md shadow-gray-200 rounded-md dark:bg-color-03 dark:shadow-gray-900">
        <ResetPassword user_email={user_profile?.email} />
      </div>

      <div className="bg-white py-5 px-6 shadow-md shadow-gray-200 rounded-md dark:bg-color-03 dark:shadow-gray-900">
        <UpdateProfile />
      </div>
    </div>
  );
}

export default Page;
