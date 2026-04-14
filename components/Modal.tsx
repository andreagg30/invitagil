"use client";

import { ReactNode, useEffect } from "react";
import Icon from "./Icon";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  actions?: ReactNode;
};

export default function Modal({ open, onClose, title, children, actions }: ModalProps) {
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
        className="w-full max-w-md flex flex-col rounded-2xl bg-white shadow-xl max-h-[calc(100vh-2rem)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6  rounded-t-2xl  flex items-center justify-between bg-primary-brown/40">
          {title ? (
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          ) : (
            <div />
          )}

          <button
            onClick={onClose}
            className="rounded-md cursor-pointer h-7 w-7 flex justify-center items-center text-black hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close modal"
          >
            <Icon icon="close" />
          </button>
        </div>

        <div className="overflow-auto flex-1 p-6">{children}</div>
        <div className="w-full p-3 ">
          {actions}
        </div>
        
      </div>
    </div>
  );
}
