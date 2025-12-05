import React, { type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  helperText?: string;
  required?: boolean;
  label?: string;
  labelIcon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  error,
  helperText,
  className,
  required,
  label,
  labelIcon,
  ...rest
}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="flex items-center gap-2 font-semibold text-gray-900">
          {labelIcon}
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        className={`w-full rounded-lg border px-3 py-2 text-sm shadow-sm transition-all outline-none ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
            : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        } ${className || ""}`}
        {...rest}
      />
      {error && helperText && (
        <p className="mt-1 text-xs text-red-500">{helperText}</p>
      )}
    </div>
  );
};

export default Input;
