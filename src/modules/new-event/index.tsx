import { StepperProvider } from "../../contexts/StepperContext/StepperProvider";
import Wizard from "./Wizard";

function NewEvent() {
  return (
    <StepperProvider>
      <Wizard />
    </StepperProvider>
  );
}

export default NewEvent;
