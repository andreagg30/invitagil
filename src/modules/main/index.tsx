import useLogout from "../../api/useLogout";
import { Button } from "../../components";
import { Welcome } from "./Welcome";

function Main() {
  const { mutate: logout, isPending } = useLogout();
  return (
    <div className="flex flex-col px-[10%] items-start justify-end ">
      <Welcome />
      <Button
        loading={isPending}
        onClick={() => {
          logout();
        }}
      >
        Cerrar Sesión
      </Button>
    </div>
  );
}

export default Main;
