import Icon from "./Icon";
import IconButton from "./IconButton";
import { useState } from "react";
import { Link } from "react-router-dom";
import { appBarOptions } from "../shared/options";
import { cn } from "../utils/cn";
import Button from "./Button";
import { Divider } from "./Divider";

function MenuOptions() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton>
        <Icon
          icon="menu"
          onClick={() => setIsOpen(true)}
          className="text-flower"
        />
      </IconButton>

   
        <div className={cn("fixed z-10 top-0 left-0 right-0 bottom-0 flex flex-col transition-all", {
            "translate-y-0 scale-100 opacity-100": isOpen,
            "pointer-events-none -translate-y-4 scale-95 opacity-0": !isOpen,
        })}>
          <div onClick={() => setIsOpen(false)} className="h-17 w-full"></div>
          <div className="flex-1 rounded-t-2xl shadow-[0_24px_80px_rgba(88,3,50,0.50)] p-4 bg-soft-pink flex flex-col">
            <div className="flex justify-end">
              <IconButton onClick={() => setIsOpen(false)}>
                <Icon icon="close" className="text-flower" />
              </IconButton>
            </div>
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

            <div className="flex-1 pb-3 justify-end flex flex-col gap-0.5">
              <div className="flex justify-center">
                <Button className="h-min w-min whitespace-nowrap text-sm px-5">
                  INICIAR SESIÓN
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Divider />
                <span>o</span>
                <Divider />
              </div>
              <div className="flex justify-center">
                <Link to="/login" className="text-flower underline underline-offset-8 text-sm font-body font-semibold">
                  REGISTRARSE
                </Link>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
export default MenuOptions;
