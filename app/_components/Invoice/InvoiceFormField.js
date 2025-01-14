function InvoiceFormField({ children, label, style, section, error }) {
  return (
    <div className={`field ${style} `}>
      <div className="label_and_error">
        <label
          style={{ color: error && "#ec5757" }}
          htmlFor={children?.props?.name}
        >
          {label}
        </label>

        {section !== "items-list" && error && (
          <p className="error-msg">{error}</p>
        )}
      </div>

      {children}
    </div>
  );
}

export default InvoiceFormField;
