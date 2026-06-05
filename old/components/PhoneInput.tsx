import React, { forwardRef } from 'react';
import TextInput, { TextInputProps } from './TextInput';
import formatPhoneNumber from '@/utils/format-phone-number';

export interface PhoneInputProps
  extends TextInputProps {
  
  /** If true, formats the displayed value even if not actively editing */
  formatDisplay?: boolean;
}

/**
 * A TextInput component that automatically formats phone numbers as (XXX) XXX-XXXX
 * as the user types. Accepts raw digits or formatted phone numbers.
 */
const PhoneInput = forwardRef<
  HTMLInputElement,
  PhoneInputProps
>(({ onChange, ...props }, ref) => {
  // Format the display value

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const formattedValue = formatPhoneNumber(inputValue);
    const eventTarget = e.target as HTMLInputElement;
    eventTarget.value = formattedValue;
    onChange?.(e);
  };

  return (
    <TextInput
      ref={ref}
      onChange={handleChange}
      maxLength={14} // (XXX) XXX-XXXX = 14 characters
      {...props}
    />
  );
});

PhoneInput.displayName = 'PhoneInput';

export default PhoneInput;


