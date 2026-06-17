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

  const {
    mutate: login,
    isPending: isLoginLoading,
    data: loginData,
    error: loginError,
  } = useLogin();

  console.log(loginData, loginError);

  function onSubmit(data: LoginPayload) {
    login(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="p-0">
        <div className="flex justify-center bg-flower p-4 rounded-t-md">
          <h1 className="text-white font-bold text-2xl">Inicia Sesión</h1>
        </div>
        <div className="flex flex-col p-8 pt-4 gap-4">
          <TextInput
            label="Correo electrónico*"
            type="email"
            maxLength={255}
            {...register("email", {
              required: formValidators.required,
              pattern: formValidators.email,
            })}
            error={errors.email}
          />

          <PasswordInput
            label="Contraseña*"
            type="password"
            maxLength={100}
            placeholder="Ingresa..."
            {...register("password", {
              required: formValidators.required,
              ...formValidators.password,
            })}
            error={errors.password}
          />
          <p className="text-sm">
            ¿Olvidaste tu contraseña?{" "}
            <Link
              to="/forgot-password"
              className="text-flower underline font-bold"
            >
              Restablécela aquí
            </Link>
          </p>
          <p className="text-sm">
            ¿Aún no tienes una cuenta?{" "}
            <Link to="/sign-up" className="text-flower underline font-bold">
              Regístrate aquí
            </Link>
          </p>

          <Button loading={isLoginLoading} className="mt-3" type="submit">
            Inicia Sesión
          </Button>
        </div>
      </Card>
    </form>
  );
}

export default LoginForm;
