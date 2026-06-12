import useLogout from "../../api/useLogout";
import { Button } from "../../components";
import AppBar from "../../components/AppBar";
const API_URL = import.meta.env.VITE_API_URL;

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
        onClick={async () => {
          const response = await fetch(`${API_URL}/test-mail`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });

          const data = await response.json();

          console.log(data, 'datadata');
          

          if (!response.ok) {
            throw new Error(data.message || "unknownError");
          }

          return data;
        }}
      >
        test mail
      </Button>
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
