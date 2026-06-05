import { useForm } from "react-hook-form";
import { Button, Card, PhoneInput, TextInput } from "../../components";
import { formErrors } from "../../contants/errors";

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(() => console.log("submit"))}>
      <Card className="gap-5">
        <TextInput
          label="Correo electrónico*"
          type="email"
          maxLength={255}
          {...register("email", {
            required: formErrors.required,
            pattern: formErrors.invalidEmail,
          })}
          error={errors.email}
        />

        <TextInput
          label="Contraseña*"
          type="password"
          maxLength={100}
          placeholder="Ingresa..."
          {...register("password", {
            required: formErrors.required,
          })}
          error={errors.password}
        />

        <TextInput
          label="Nombre*"
          maxLength={100}
          placeholder="Ingresa..."
          {...register("name", {
            required: formErrors.required,
            pattern: formErrors.noSpecialChars,
          })}
          error={errors.name}
        />

        <TextInput
          label="Apellido*"
          maxLength={100}
          placeholder="Ingresa..."
          {...register("lastName", {
            required: formErrors.required,
            pattern: formErrors.noSpecialChars,
          })}
          error={errors.lastName}
        />

        <PhoneInput
          label="Número de teléfono*"
          maxLength={20}
          {...register("phone", { required: formErrors.required })}
          error={errors.phone}
        />

        <Button type="submit">Crear cuenta</Button>
      </Card>
    </form>
  );
}

export default RegisterForm;
