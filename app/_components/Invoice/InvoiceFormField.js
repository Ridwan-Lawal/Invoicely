function InvoiceFormField({ children, label, style }) {
  return (
    <div className={`field ${style} `}>
      <div className="label_and_error">
        <label htmlFor={children?.props?.name}>{label}</label>

        <p className="error-msg">lorem ipsum</p>
      </div>

      {children}
    </div>
  );
}

export default InvoiceFormField;
