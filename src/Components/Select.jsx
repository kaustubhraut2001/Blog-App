import React, { forwardRef, useforwardRef, useId } from "react";

const Select =(
  { options, label, className = "", ...props },
  ref
) => {
  const id = useId();
  return (
    <div className="">
      {label && (
        <label htmlFor={id} className={` ${className}`}>
          <select {...props} id={id} className={` ${className}`} ref={ref}>
            {options?.map((opt) => (
              <option key={opt} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      )}
    </div>
  );
};

export default  forwardRef(Select);

// we can even use forward ref as
// export default forwardref(Select)
