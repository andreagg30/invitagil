import { Controller, useForm } from "react-hook-form";
import { Button, Card, PhoneTextInput, TextInput } from "../../components";
import { formValidators } from "../../shared/formValidators";
import { Link } from "react-router-dom";

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(() => console.log("submit"))}>
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
            {...register("name", {
              required: formValidators.required,
              pattern: formValidators.noSpecialChars,
            })}
            error={errors.name}
          />

          <TextInput
            label="Apellido*"
            maxLength={100}
            placeholder="Ingresa..."
            {...register("lastName", {
              required: formValidators.required,
              pattern: formValidators.noSpecialChars,
            })}
            error={errors.lastName}
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

           <p className="text-sm">¿Ya tienes una cuenta? <Link to="/login" className="text-flower underline font-bold">
            Inicia sesión aquí
          </Link></p>

          <Button className="mt-3" type="submit">
            Crear cuenta
          </Button>
        </div>
      </Card>
    </form>
  );
}

export default RegisterForm;
