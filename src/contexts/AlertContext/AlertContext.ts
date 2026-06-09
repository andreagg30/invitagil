import { createContext } from "react";

export interface AlertContextValue {
  showSuccess: (value: string) => void;
  showError: (value: string) => void;
  hideSuccess: () => void;
  hideError: () => void;
}

export const AlertContext = createContext<AlertContextValue | undefined>(
  undefined,
);
