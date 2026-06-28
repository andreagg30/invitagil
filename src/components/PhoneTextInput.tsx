import "react-phone-number-input/style.css";
import type { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import { cn } from "../utils/cn";
import { isString } from "lodash";

interface PhoneTextInputProps {
  onChange: (value: string) => void;
  value: string;
  label?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  helperText?: string;
  className?: string;
}

function PhoneTextInput({
  onChange,
  value,
  label,
  error,
  className,
}: PhoneTextInputProps) {
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
      <PhoneInput
        placeholder="Ingresa..."
        onChange={onChange}
        maxLength={20}
        value={value}
        className={cn(
          "px-4 transition-all placeholder:text-soft-gray bg-bg ring-0 min-h-10 outline-2 outline-perry hover:bg-mint/20  rounded-md focus:ring-none focus:outline-4",
          {
            "outline-red-500 bg-red-100 hover:bg-red-100": error,
            "hover:outline-perry": !error,
          },
        )}
      />
      {isString(error?.message) && (
        <span className="mt-1 text-sm text-red-500">{error?.message}</span>
      )}
    </div>
  );
}

export default PhoneTextInput;
