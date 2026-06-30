import type { MaterialSymbol } from "material-symbols";
import type { StepState, StepType } from "./Stepper";
import { cn } from "../utils/cn";
import Icon from "./Icon";

export type StepStyle = {
  icon: MaterialSymbol;
  iconClass: string;
  containerClass: string;
};

interface StepProps {
  step: StepType;
  idx: number;
  activeStep: number;
  stepState: StepState;
  hideLine: boolean;
  handleStepClick: (stepIndex: number, step: StepType) => void;
}

function Step({
  step,
  idx,
  activeStep,
  stepState,
  hideLine,
  handleStepClick,
}: StepProps) {
  const isActive = idx === activeStep;
  const isClickable = !step.disabled && idx !== activeStep;
  return (
    <>
      <div
        role="button"
        onClick={() => handleStepClick(idx, step)}
        className={cn(
          "flex items-center gap-3 rounded-full px-1.5 py-1.5 transition-colors",
          step.disabled && "bg-disabled-200 text-disabled-600 opacity-50",
          !isClickable && "cursor-default",
          step.className,
        )}
      >
        {stepState === "completed" && (
          <Icon
            icon="check"
            className={cn("text-[33px]", step.disabled && "text-disabled-400")}
          />
        )}
        <div
          className={cn(
            "rounded-full shadow h-10 w-10 flex justify-center items-center bg-flower text-white font-semibold",
            {
              "bg-white border border-text-soft text-text-soft": !isActive,
            },
          )}
        >
          <span>{idx + 1}</span>
        </div>

        <div className="flex flex-col">
          {typeof step.label === "string" ? (
            <span
              className={cn(
                "whitespace-nowrap text-sm text-text-soft font-medium",
                isActive && "text-flower",
              )}
            >
              {step.label}
            </span>
          ) : (
            step.label
          )}
          <span
            className="text-sm text-disabled-600"
            hidden={!step.description}
          >
            {step.description}
          </span>
        </div>
      </div>

      <div className="h-px w-full bg-text-soft/40" hidden={hideLine} />
    </>
  );
}

export default Step;
