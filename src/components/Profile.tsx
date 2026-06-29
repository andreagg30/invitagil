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
import IconButton from "./IconButton";
import { useState } from "react";
import useGetProfile from "../api/useGetProfile";
import { Divider } from "./Divider";
import useLogout from "../api/useLogout";
import Button from "./Button";
function Profile() {
  const [isOpen, setIsOpen] = useState(false);

  const { data: user } = useGetProfile();

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

  const { mutate: logout, isPending } = useLogout();

  return (
    <>
      <IconButton
        className="bg-flower shadow flex justify-center items-center h-12 w-12"
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        <span className="text-xl text-white leading-none font-medium">{`${user?.first_name?.[0]}${user?.last_name?.[0]}`}</span>
      </IconButton>

      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className="bg-white border-2 mr-2 flex flex-col border-border shadow text-dark-text text-right px-6 rounded-lg z-10 focus:outline-none"
          >
            <span className="font-semibold pt-3">{`${user?.first_name} ${user?.last_name}`}</span>

            <span className="pb-3">{user?.email}</span>
            <Divider />

            <Button
              loading={isPending}
              onClick={() => {
                logout();
              }}
              className="my-4"
              size="sm"
            >
              Cerrar Sesión
            </Button>
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
}
export default Profile;
