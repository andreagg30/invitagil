import { useState, type ReactNode } from "react";
import { StepperContext } from "./StepperContext";

export function StepperProvider({ children }: { children: ReactNode }) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <StepperContext.Provider
      value={{
        activeStep,
        setActiveStep,
      }}
    >
      {children}
    </StepperContext.Provider>
  );
}
