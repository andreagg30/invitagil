import React from 'react';
import { type MaterialSymbol } from 'material-symbols';
import { cn } from '../utils/cn';
import Step from './Step';


export type StepType = {
  /** The label to display for the step */
  label: string | React.ReactNode;
  /** Optional description or additional content */
  description?: string | React.ReactNode;
  /** Optional icon to override default step icons */
  icon?: MaterialSymbol;
  /** Optional state to override default step state */
  state?: StepState;
  /** Completely disable the step (not clickable, grayed out) */
  disabled?: boolean;
  /** Custom className for the step */
  className?: string;
};

export type StepState = 'completed' | 'active' | 'pending';

export interface StepperProps {
  /** Array of step configurations */
  steps: StepType[];
  /** Current active step index (0-based) */
  activeStep: number;
  /** Auto-complete: automatically mark all steps before activeStep as completed (default: true) */
  autoComplete?: boolean;
  /** Callback when active step changes */
  onStepChange?: (stepIndex: number) => void;
  /** Custom className for the container */
  className?: string;
}

export default function Stepper({
  steps,
  activeStep,
  autoComplete = true,
  onStepChange,
  className,
}: StepperProps) {
  const handleStepClick = (stepIndex: number, step: StepType) => {
    // Don't allow clicking on disabled steps
    if (step.disabled) return;

    // Don't allow clicking on the currently active step
    if (stepIndex === activeStep) return;

    // Call onStepChange to notify parent
    onStepChange?.(stepIndex);
  };

  // Compute the effective state for each step
  const getEffectiveStepState = (
    stepIndex: number,
    step: StepType,
  ): StepState => {
    // If step has explicit state defined, use that (takes priority)
    if (step.state !== undefined && stepIndex !== activeStep) {
      return step.state;
    }

    // If autoComplete is disabled, return 'pending' for all non-active steps
    if (!autoComplete) {
      return stepIndex === activeStep ? 'active' : 'pending';
    }

    // AutoComplete logic (default behavior)
    if (stepIndex < activeStep) {
      return 'completed';
    } else if (stepIndex === activeStep) {
      return 'active';
    } else {
      return 'pending';
    }
  };

  return (
    <div className={cn('flex w-full items-center gap-3 justify-between', className)}>
      {steps.map((step, idx) => {
        const hideLine = idx === steps.length - 1 || steps.length <= 1;
        const effectiveState = getEffectiveStepState(idx, step);

        return (
          <React.Fragment key={idx}>
            <Step
              idx={idx}
              step={step}
              activeStep={activeStep}
              stepState={effectiveState}
              hideLine={hideLine}
              handleStepClick={handleStepClick}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
}
