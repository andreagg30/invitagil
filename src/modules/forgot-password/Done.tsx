import { Link } from "react-router-dom";

function Done() {
  return (
    <div className="flex flex-col done-bounce bg-white rounded-4xl items-center gap-4 p-10 shadow">
      <img src="logo.png" className="h-40" />
      <h1 className="text-flower font-bold text-2xl">Restablecer Contraseña</h1>
      <p className="text-center">
        Revisa tu correo electrónico para encontrar un enlace para restablecer
        tu contraseña. Si no aparece en unos minutos, revisa tu carpeta de
        correo no deseado.
      </p>

      <Link to="/login" className="text-flower underline font-bold">
        Volver a iniciar sesión
      </Link>
    </div>
  );
}

export default Done;
