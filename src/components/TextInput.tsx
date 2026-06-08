import React, { forwardRef } from "react";
import { cn } from "../utils/cn";
import type { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { isString } from "lodash";

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  rightItem?: React.ReactNode;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, className = "", rightItem, ...props }, ref) => {
    return (
      <div className={cn("flex flex-col", className)}>
        {label && (
          <label
            className={cn(
              "ml-2 z-10 px-2 text-white bg-perry whitespace-nowrap w-min rounded-t-sm rouded-b-sm text-base font-medium",
              {
                "bg-red-500": error,
              },
            )}
          >
            {label}
          </label>
        )}
        <div className="flex w-full relative">
          <input
            ref={ref}
            className={cn(
              "px-4 transition-all w-full placeholder:text-soft-gray ring-none min-h-10 outline-2 outline-perry hover:bg-mint/20  rounded-md focus:ring-none focus:outline-4",
              {
                "outline-red-500 bg-red-100 hover:bg-red-100": error,
                "hover:outline-perry": !error,
              },
            )}
            {...props}
          />
          {rightItem && (
            <div className="h-10 w-10 flex justify-center items-center absolute right-0">
              {rightItem}
            </div>
          )}
        </div>
        {isString(error?.message) && (
          <span className="mt-1 text-sm text-red-500">{error?.message}</span>
        )}
      </div>
    );
  },
);

TextInput.displayName = "TextInput";

export default TextInput;
