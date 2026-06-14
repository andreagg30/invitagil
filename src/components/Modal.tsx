import { useEffect, type ReactNode } from "react";
import Icon from "./Icon";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  actions?: ReactNode;
};

export default function Modal({
  open,
  onClose,
  title,
  children,
  actions,
}: ModalProps) {
  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md overflow-hidden flex flex-col rounded-2xl bg-white shadow-xl max-h-[calc(100vh-2rem)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className=" rounded-t-2xl  flex items-center justify-between bg-primary-brown/40">
          <div className="bg-flower items-center flex pl-5 p-3 w-full">
            {title && (
              <div className="flex-1">
                {" "}
                <h2 className="text-lg font-semibold text-white">{title}</h2>
              </div>
            )}

            <button
              onClick={onClose}
              className="rounded-md cursor-pointer h-7 w-7 flex justify-center items-center text-black hover:bg-gray-100 hover:text-gray-700"
              aria-label="Close modal"
            >
              <Icon icon="close" className="text-white" />
            </button>
          </div>
        </div>

        <div className="overflow-auto flex-1 p-3">{children}</div>
        <div className="w-full p-3 ">{actions}</div>
      </div>
    </div>
  );
}
