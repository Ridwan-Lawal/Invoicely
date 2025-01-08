function Welcome() {
  return (
    <div className="h-screen flex flex-col  items-center justify-center gap-6">
      <div className="text-center text-color-04">
        <h1 className="text-gray-800 font-semibold text-[33px]">Welcome</h1>
        <h2 className="font-semibold text-gray-800 mt-1 text-[22px]">
          How may i address you?
        </h2>
      </div>
      <form action="" className="w-full max-w-[400px] mx-auto">
        <div className="field">
          <div className="label_and_error">
            <label htmlFor="name">Your Name </label>
            <span className="error-msg">Lorem, ipsum dolor.</span>
          </div>

          <input
            type="text"
            name="name"
            autoComplete="name"
            id="name"
            placeholder="Your Name"
          />
        </div>
      </form>
    </div>
  );
}

export default Welcome;

// continue with the welcome page
// do the google and github sign in
// do the login
// also configure it, that when a user is logged in he should not be able to go back to the login or signup page
