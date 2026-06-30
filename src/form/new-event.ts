import { createFormControl, useForm } from "react-hook-form";

export interface NewEventFormValues {
  fromDate: Date | null;
  toDate: Date | null;
}

const NewEventFormControl = createFormControl<NewEventFormValues>({
  shouldFocusError: false,
  mode: "onChange",
});

export const useAdjustmentsForm = () => useForm(NewEventFormControl);
