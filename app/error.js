"use client";

function Error({ error, reset }) {
  return (
    <div className=" flex flex-col h-screen items-center justify-center gap-4 max-w-md mx-auto">
      <p className="text-2xl font-medium text-[#252945] text-center dark:text-white">
        {error.message}
      </p>
      <button
        onClick={reset}
        className="py-2.5 px-6 bg-[#7C5DFA] text-white font-medium rounded-md"
      >
        Go back
      </button>
    </div>
  );
}

export default Error;
