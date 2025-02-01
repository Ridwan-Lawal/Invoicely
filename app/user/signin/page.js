import SigninForm from "@/app/_components/users/SignInForm";

export const metadata = {
  title: "Login",
};

function Page() {
  return (
    <div className='px-6'>
      <SigninForm />
    </div>
  );
}

export default Page;
