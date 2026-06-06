import { Controller, useForm } from "react-hook-form";
import { Button, Card, Dropdown, PhoneInput, TextInput } from "../../components";
import { formValidators } from "../../shared/formValidators";

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm();

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(() => console.log("submit"))}>
      <Card className="gap-5">
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
            ...formValidators.password
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

        <PhoneInput
          label="Número de teléfono*"
          maxLength={20}
          {...register("phone", { required: formValidators.required })}
          error={errors.phone}
        />

        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <Dropdown
              options={[
                { label: "México", value: "MX" },
                { label: "Estados Unidos", value: "US" },
                { label: "Canadá", value: "CA" },
              ]}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <Button type="submit">Crear cuenta</Button>
      </Card>
    </form>
  );
}

export default RegisterForm;
