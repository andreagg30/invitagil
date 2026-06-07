import { Controller, useForm } from "react-hook-form";
import { Button, Card, PhoneTextInput, TextInput } from "../../components";
import { formValidators } from "../../shared/formValidators";
import { Link } from "react-router-dom";
import { useSignUp, type SignUpPayload } from "../../hooks/api/useSignUp";

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<SignUpPayload>();

  const {
    mutate: signUp,
    isPending: isSignUpLoading,
    data: signUpData,
    error: signUpError,
  } = useSignUp();

  console.log(signUpData, signUpError);

  function onSubmit(data: SignUpPayload) {
    signUp(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="p-0">
        <div className="flex justify-center bg-flower p-4 rounded-t-md">
          <h1 className="text-white font-bold text-2xl">Panel de Registro</h1>
        </div>
        <div className="flex flex-col p-8 pt-4 gap-4">
          <p>Ingresa los siguientes datos para crear tu cuenta:</p>
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

          <TextInput
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

          <TextInput
            label="Nombre*"
            maxLength={100}
            placeholder="Ingresa..."
            {...register("first_name", {
              required: formValidators.required,
              pattern: formValidators.noSpecialChars,
            })}
            error={errors.first_name}
          />

          <TextInput
            label="Apellido*"
            maxLength={100}
            placeholder="Ingresa..."
            {...register("last_name", {
              required: formValidators.required,
              pattern: formValidators.noSpecialChars,
            })}
            error={errors.last_name}
          />

          <Controller
            name="phone"
            control={control}
            rules={{
              required: formValidators.required,
            }}
            render={({ field }) => (
              <PhoneTextInput
                label="Número de teléfono*"
                error={errors.phone}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <p className="text-sm">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="text-flower underline font-bold">
              Inicia sesión aquí
            </Link>
          </p>

          <Button className="mt-3" loading={isSignUpLoading} type="submit">
            Crear cuenta
          </Button>
        </div>
      </Card>
    </form>
  );
}

export default RegisterForm;
