import { Link, useLocation } from "react-router-dom";
import { appBarOptions } from "../shared/options";
import { cn } from "../utils/cn";
import Button from "./Button";
import MenuOptions from "./MenuOptions";

function AppBar() {
  const location = useLocation();

  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex items-center bg-white md:px-10 py-3">
      <Link to="/">
        <img src="/logo.png" alt="Invitágil" className="h-20" />
      </Link>

      <nav className="flex flex-1 items-center max-md:hidden justify-end gap-6">
        {appBarOptions.map((item) => {
          const isActive =
            location.pathname + location.hash === item.to ||
            (item.to === "/" && location.pathname === "/" && !location.hash);

          return (
            <Link
              key={item.to}
              to={item.to}
              className={[
                "font-body items-center pt-2.5 h-10 transition-all justify-center flex flex-col gap-2 cursor-pointer text-sm font-semibold uppercase",
                isActive ? "text-flower" : "text-dark-text hover:text-flower",
              ].join(" ")}
            >
              {item.label}
              <div
                className={cn("w-4 h-0.5 bg-flower transition-all", {
                  "bg-transparent": !isActive,
                })}
              ></div>
            </Link>
          );
        })}
        <div className="flex gap-2">
          <Button className="h-min font-medium text-sm px-5 ml-4">REGISTRARME</Button>
          <Button className="h-min font-semibold text-sm px-5" variant="outlined">INICIAR SESIÓN</Button>
        </div>
      </nav>
      <nav className="flex flex-1 justify-end pr-4">
       <MenuOptions/>
      </nav>
    </header>
  );
}

export default AppBar;
