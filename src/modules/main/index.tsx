import useLogout from "../../api/useLogout";
import { Button } from "../../components";
import AppBar from "../../components/AppBar";

function Main() {
  const { mutate: logout, isPending } = useLogout();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <AppBar />
      <h1 className="text-4xl font-bold mb-4">Bienvenido a Invitagil</h1>
      <p className="text-lg text-gray-600">
        Tu plataforma de gestión de eventos
      </p>
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
