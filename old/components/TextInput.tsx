import { cn } from "@/utils/cn";
import React, { forwardRef } from "react";

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className={cn("flex flex-col", className)}>
        {label && (
          <label className="mb-1 text-base font-medium text-black">{label}</label>
        )}
        <input
          ref={ref}
          className={cn(
            "px-3 py- transition-all focus:ring-cyan-950 min-h-10 border hover:bg-blue-50 rounded-md focus:outline-none focus:ring-2",
            {
                "border-red-500 focus:ring-red-500 bg-red-100 hover:bg-red-100": error,
            }
          )}
          {...props}
        />
        {error && <span className="mt-1 text-sm text-red-500">{error}</span>}
      </div>
    );
  },
);

TextInput.displayName = "TextInput";

export default TextInput;
