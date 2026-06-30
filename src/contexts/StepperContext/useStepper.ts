
import { useContext } from "react";
import { StepperContext } from "./StepperContext";

export function useStepper() {
  const context = useContext(StepperContext);

  if (!context) {
    throw new Error("useStepper debe usarse dentro de StepperProvider");
  }

  return context;
}
