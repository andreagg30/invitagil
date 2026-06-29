import { useForm } from "react-hook-form";
import { Button, Card, PasswordInput, TextInput } from "../../components";
import { formValidators } from "../../shared/formValidators";
import { Link } from "react-router-dom";
import { useLogin, type LoginPayload } from "../../api/useLogin";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>();

  const { mutate: login, isPending: isLoginLoading } = useLogin();

  function onSubmit(data: LoginPayload) {
    login(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="p-0 px-10 relative overflow-hidden flex-1 max-w-125 w-[calc(100vw-24px)">
        <img
          src="/1.svg"
          alt="flowers"
          className="h-45 w-45 absolute right-3 top-3"
        />
        <div className="flex justify-center z-10 p-4 pt-16">
          <h1 className="text-flower font-title font-medium text-4xl">Inicia Sesión</h1>
        </div>
        <div className="flex flex-col p-8 pt-4 gap-1">
          <TextInput
            label="Correo electrónico*"
            type="email"
            maxLength={255}
            {...register("email", {
              required: formValidators.required,
              pattern: formValidators.email,
            })}
            error={errors.email}
            className="mb-3"
          />

          <PasswordInput
            label="Contraseña*"
            type="password"
            maxLength={100}
            placeholder="Ingresa..."
            {...register("password", {
              required: formValidators.required,
            })}
            error={errors.password}
          />
          <p className="text-sm">
            ¿Olvidaste tu contraseña?{" "}
            <Link to="/forgot-password" className="text-flower underline">
              Restablécela aquí
            </Link>
          </p>

          <Button loading={isLoginLoading} className="mt-8" type="submit">
            Inicia Sesión
          </Button>
          <p className="text-sm">
            ¿Aún no tienes una cuenta?{" "}
            <Link to="/sign-up" className="text-flower underline">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </Card>
    </form>
  );
}

export default LoginForm;
