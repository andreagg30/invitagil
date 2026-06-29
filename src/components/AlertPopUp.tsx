import { cn } from "../utils/cn";
import Icon from "./Icon";

interface Props {
  variant: "error" | "success";
  message: string | null;
  onClose: VoidFunction;
  progressKey: number;
}

function AlertPopUp({ variant, message, onClose, progressKey }: Props) {
  if (!message) return null;

  return (
    <div className="fixed bottom-10 left-1/2 z-50 -translate-x-1/2">
      <div
        className={cn(
          "animate-alert-slide relative flex min-w-50 flex-col overflow-hidden rounded-lg text-white shadow-lg",
          {
            "bg-green-700": variant === "success",
            "bg-red-800": variant === "error",
          },
        )}
      >
        <div className="absolute right-3 top-1 h-6">
          <Icon
            onClick={onClose}
            icon="cancel"
            className="cursor-pointer text-lg"
          />
        </div>

        <div className="flex justify-center py-5 px-8 pt-6 text-center text-base font-semibold tracking-wide">
          {message}
        </div>

        <div key={progressKey} className="h-2 animate-progress-bar bg-white" />
      </div>
    </div>
  );
}

export default AlertPopUp;
