import { createContext } from "react";

export interface StepperContextValue {
  activeStep: number;
  setActiveStep: (value: number) => void;
}

export const StepperContext = createContext<StepperContextValue | undefined>(
  undefined,
);
