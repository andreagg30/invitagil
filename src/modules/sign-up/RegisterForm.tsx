import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Card,
  Icon,
  PasswordInput,
  PhoneTextInput,
  TextInput,
} from "../../components";
import { formValidators } from "../../shared/formValidators";
import { Link } from "react-router-dom";
import { useSignUp, type SignUpPayload } from "../../api/useSignUp";

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
      <Card className="p-0 px-5 relative overflow-hidden flex-1 max-w-125 w-[calc(100vw-24px)">
        <img src="/1.svg" alt="flowers" className="h-45 w-45 absolute right-3 top-3" />
        <div className="flex justify-center">
          <div className="mt-5 flex justify-center items-center shadow border border-border h-15 w-15 rounded-full bg-white">
            <Icon
              icon="person"
              className="text-flower text-3xl mr-1.5 mb-2 "
            ></Icon>
          </div>
        </div>
        <div className="flex justify-center p-4 z-10">
          <h1 className="text-flower font-title font-medium text-4xl">
            Panel de Registro
          </h1>
        </div>
        <div className="flex flex-col p-8 pt-4 gap-4 z-10">
          <p className="text-dark-text text-center">
            Ingresa los siguientes datos para crear tu cuenta:
          </p>
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
