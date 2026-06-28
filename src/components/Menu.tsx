/* eslint-disable react-hooks/refs */
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import Icon from "./Icon";
import IconButton from "./IconButton";
import { useState } from "react";
import { Link } from "react-router-dom";
import { appBarOptions } from "../shared/options";
import { cn } from "../utils/cn";

function MenuOptions() {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(10), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  return (
    <>
      <IconButton ref={refs.setReference} {...getReferenceProps()}>
        <Icon icon="menu" className="text-flower" />
      </IconButton>

      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className="bg-white border-2 mr-2 flex flex-col border-border shadow rounded-lg z-10 focus:outline-none"
          >
            {appBarOptions.map((item, i) => {
              const isActive =
                location.pathname + location.hash === item.to ||
                (item.to === "/" &&
                  location.pathname === "/" &&
                  !location.hash);

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "font-body border-b px-2 pt-2.5 h-10 transition-all flex flex-col gap-2 cursor-pointer text-sm font-semibold uppercase",
                    {
                      "text-flower": isActive,
                      "text-dark-text border-b-border hover:text-flower":
                        !isActive,
                      "border-0": i + 1 === appBarOptions.length,
                    },
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
}
export default MenuOptions;
