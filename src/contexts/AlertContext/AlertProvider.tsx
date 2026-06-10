import { useRef, useState, type ReactNode } from "react";
import { AlertContext } from "./AlertContext";
import { AlertPopUp } from "../../components";
import { apiErrors } from "../../shared/apiErrors";

const ALERT_DURATION = 6000;

export function AlertProvider({ children }: { children: ReactNode }) {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [successProgressKey, setSuccessProgressKey] = useState(0);
  const [errorProgressKey, setErrorProgressKey] = useState(0);

  const successTimerRef = useRef<number | null>(null);
  const errorTimerRef = useRef<number | null>(null);

  const clearSuccessTimer = () => {
    if (successTimerRef.current) {
      window.clearTimeout(successTimerRef.current);
      successTimerRef.current = null;
    }
  };

  const clearErrorTimer = () => {
    if (errorTimerRef.current) {
      window.clearTimeout(errorTimerRef.current);
      errorTimerRef.current = null;
    }
  };

  const showSuccess = (message: string) => {
    clearSuccessTimer();

    setSuccessProgressKey((prev) => prev + 1);
    setSuccess(message);

    successTimerRef.current = window.setTimeout(() => {
      setSuccess(null);
      successTimerRef.current = null;
    }, ALERT_DURATION);
  };

  const showError = (message: string) => {
    clearErrorTimer();

    const errorMessage = Object.prototype.hasOwnProperty.call(
      apiErrors,
      message,
    )
      ? apiErrors[message as keyof typeof apiErrors]
      : message;

    setErrorProgressKey((prev) => prev + 1);
    setError(errorMessage);

    errorTimerRef.current = window.setTimeout(() => {
      setError(null);
      errorTimerRef.current = null;
    }, ALERT_DURATION);
  };

  function hideSuccess() {
    clearSuccessTimer();
    setSuccess(null);
  }

  function hideError() {
    clearErrorTimer();
    setError(null);
  }

  return (
    <AlertContext.Provider
      value={{
        showSuccess,
        showError,
        hideSuccess,
        hideError,
      }}
    >
      {children}

      <AlertPopUp
        onClose={hideSuccess}
        variant="success"
        message={success}
        progressKey={successProgressKey}
      />

      <AlertPopUp
        onClose={hideError}
        variant="error"
        message={error}
        progressKey={errorProgressKey}
      />
    </AlertContext.Provider>
  );
}
