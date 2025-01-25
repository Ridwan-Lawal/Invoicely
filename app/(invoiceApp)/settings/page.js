import ResetPassword from "@/app/_components/settings/ResetPassword";
import UpdateProfile from "@/app/_components/settings/UpdateProfile";
import { getProfile } from "@/app/_lib/data-service";

export const metadata = {
  title: "Settings",
};

// sign out functionality
// retest the settings features

async function Page() {
  const user_profile = await getProfile();
  console.log(user_profile);

  return (
    <div className="space-y-10 mb-14">
      <div className="bg-white py-4 px-6 shadow-md shadow-gray-200 rounded-md">
        <ResetPassword user_email={user_profile?.email} />
      </div>

      <div className="bg-white py-5 px-6 shadow-md shadow-gray-200 rounded-md">
        <UpdateProfile />
      </div>
    </div>
  );
}

export default Page;
