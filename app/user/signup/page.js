import SignupForm from "@/app/_components/users/SignupForm";

export const metadata = {
  title: "Register",
};

function Page() {
  return (
    <div className='px-6'>
      <SignupForm />
    </div>
  );
}

export default Page;

