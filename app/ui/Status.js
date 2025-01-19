import { GoDotFill } from "react-icons/go";

function Status({ status }) {
  return (
    <div
      className={`status  ${status?.toLowerCase()} flex items-center justify-center gap-2`}
    >
      <GoDotFill className="text-sm" />
      <span className=" capitalize">{status}</span>
    </div>
  );
}

export default Status;
