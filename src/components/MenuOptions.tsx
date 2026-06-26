/* eslint-disable react-hooks/refs */
import { autoUpdate, flip, FloatingFocusManager, offset, shift, useClick, useDismiss, useFloating, useInteractions, useRole } from "@floating-ui/react";
import Icon from "./Icon";
import IconButton from "./IconButton";
import { useState } from "react";

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
            className="bg-white border-2 mr-2 flex flex-col border-aqua shadow rounded-lg p-2 mt-1 z-10 focus:outline-none"
          >
            Popover element
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
}
export default MenuOptions
