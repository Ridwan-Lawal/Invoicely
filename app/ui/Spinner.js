function Spinner() {
  return (
    <div className="flex items-center justify-center h-[50vh]">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Spinner;
