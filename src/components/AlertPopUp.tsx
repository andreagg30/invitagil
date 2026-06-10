import { cn } from "../utils/cn";
import Icon from "./Icon";

interface Props {
  variant: "error" | "success";
  message: string | null;
  onClose: VoidFunction;
}

function AlertPopUp({ variant, message, onClose }: Props) {
  if (!message) return null;
  return (
    <div className="fixed bottom-10  left-1/2 z-50 -translate-x-1/2">
      <div
        className={cn(
          "animate-alert-slide flex relative flex-col min-w-50 overflow-hidden rounded-lg  text-white shadow-lg",
          {
            "bg-green-700": variant === "success",
            "bg-red-800": variant === "error",
          },
        )}
      >
        <div className="absolute h-6 top-2 right-3">
          <Icon
            onClick={onClose}
            icon="cancel"
            className="cursor-pointer"
            size={18}
          />
        </div>
        <div className="pl-4 py-5 pt-6 pr-8 text-lg text-center flex justify-center tracking-wide font-semibold">{message}</div>
        <div className="animate-progress-bar bg-white h-3"></div>
      </div>
    </div>
  );
}

export default AlertPopUp;
