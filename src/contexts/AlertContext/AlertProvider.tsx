import { useState, type ReactNode } from "react";
import { AlertContext } from "./AlertContext";
import { AlertPopUp } from "../../components";

export function AlertProvider({ children }: { children: ReactNode }) {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const showSuccess = (message: string) => {
    setSuccess(message);

    setTimeout(() => {
      setSuccess(null);
    }, 3000);
  };

  const showError = (message: string) => {
    setError(message);

    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  function hideSuccess() {
    setSuccess(null);
  }

  function hideError() {
    setError(null);
  }
  return (
    <AlertContext.Provider
      value={{ showSuccess, showError, hideSuccess, hideError }}
    >
      {children}
      <AlertPopUp onClose={hideSuccess} variant="success" message={success} />
      <AlertPopUp onClose={hideError} variant="error" message={error} />
    </AlertContext.Provider>
  );
}
