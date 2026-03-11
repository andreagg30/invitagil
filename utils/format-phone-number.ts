/**
 * This utility function formats a given phone number string or number into a standard format (XXX) XXX-XXXX.
 *
 * @param {string} value - The phone number to format.
 * @returns {string} - The formatted phone number or the original value if it cannot be formatted.
 */
export default function formatPhoneNumber(value: string): string {
  // Remove all non-numeric characters
  const digits = value.replace(/[^0-9]/g, '');

  // Limit to 10 digits
  const limited = digits.slice(0, 10);

  // Format as (XXX) XXX-XXXX
  if (limited.length === 0) return '';
  if (limited.length <= 3) return `(${limited}`;
  if (limited.length <= 6)
    return `(${limited.slice(0, 3)}) ${limited.slice(3)}`;
  return `(${limited.slice(0, 3)}) ${limited.slice(3, 6)}-${limited.slice(6)}`;
}