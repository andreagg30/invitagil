import { Outlet } from "react-router-dom";
import AppBar from "./AppBar";

function GeneralLayout() {
  return (
    <>
      <AppBar />
      <main className="min-h-screen font-body flex flex-col pt-24">
        <Outlet />
      </main>
    </>
  );
}

export default GeneralLayout;
