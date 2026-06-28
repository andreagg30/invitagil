import { useRef, useState } from "react";
import { cn } from "../utils/cn";

interface OtpInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
}

export default function OtpInput({
  length = 6,
  value,
  onChange,
  onComplete,
  disabled = false,
  error = false,
}: OtpInputProps) {
  const [internalDigits, setInternalDigits] = useState<string[]>(
    Array(length).fill(""),
  );

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const digits =
    value !== undefined
      ? Array.from({ length }, (_, index) => value[index] ?? "")
      : internalDigits;

  const updateDigits = (nextDigits: string[]) => {
    const fixedDigits = nextDigits.slice(0, length);

    while (fixedDigits.length < length) {
      fixedDigits.push("");
    }

    if (value === undefined) {
      setInternalDigits(fixedDigits);
    }

    const nextValue = fixedDigits.join("");

    onChange?.(nextValue);

    if (fixedDigits.every(Boolean)) {
      onComplete?.(nextValue);
    }
  };

  const focusInput = (index: number) => {
    inputRefs.current[index]?.focus();
    inputRefs.current[index]?.select();
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const digit = event.target.value.replace(/\D/g, "").slice(-1);

    const nextDigits = [...digits];
    nextDigits[index] = digit;

    updateDigits(nextDigits);

    if (digit && index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (event.key !== "Backspace") return;

    event.preventDefault();

    const nextDigits = [...digits];

    if (nextDigits[index]) {
      nextDigits[index] = "";
      updateDigits(nextDigits);
      return;
    }

    if (index > 0) {
      nextDigits[index - 1] = "";
      updateDigits(nextDigits);
      focusInput(index - 1);
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    const pastedDigits = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length)
      .split("");

    const nextDigits = Array(length).fill("");

    pastedDigits.forEach((digit, index) => {
      nextDigits[index] = digit;
    });

    updateDigits(nextDigits);

    const nextIndex = Math.min(pastedDigits.length, length - 1);
    focusInput(nextIndex);
  };

  return (
    <div className="flex justify-center gap-3">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(element) => {
            inputRefs.current[index] = element;
          }}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          disabled={disabled}
          value={digits[index]}
          onChange={(event) => handleChange(event, index)}
          onKeyDown={(event) => handleKeyDown(event, index)}
          onPaste={handlePaste}
          className={cn(
            "h-12 w-12",
            "px-4 transition-all bg-bg text-center bg-white placeholder:text-soft-gray ring-none min-h-10 outline-2 outline-perry hover:bg-mint/20  rounded-md focus:ring-none focus:outline-4",
            {
              "border-red-500 focus:border-red-500 focus:ring-red-200": error,
              "border-gray-300": !error,
            },
          )}
        />
      ))}
    </div>
  );
}
