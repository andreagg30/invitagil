import { useForm } from "react-hook-form";
import type { ForgotPasswordPayload } from "../../api/useForgotPassword";
import useForgotPassword from "../../api/useForgotPassword";
import { Button, Card, TextInput } from "../../components";
import { formValidators } from "../../shared/formValidators";
import OtpValidationForm from "./OtpValidationForm";
import { useState } from "react";

function EmailForm() {
  const { mutate: forgotPassword, isPending: isForgotPasswordLoading } =
    useForgotPassword();

  const {
    handleSubmit,
    formState: { errors },
    register,
    getValues,
    setValue,
  } = useForm<ForgotPasswordPayload>();

  const [showEmail, setShowEmail] = useState(false);

  function handleForgotPassword(payload: ForgotPasswordPayload) {
    forgotPassword(payload, {
      onSuccess: (data) => {
        if (data.success) {
          setShowEmail(true);
        }
      },
    });
  }

  if (showEmail) {
    return (
      <OtpValidationForm
        handleGoBack={() => {
          setShowEmail(false);
          setValue("email", "");
        }}
        email={getValues("email")}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(handleForgotPassword)}>
      <Card className="p-0">
        <div className="flex justify-center bg-flower p-4 rounded-t-md">
          <h1 className="text-white font-bold text-2xl">
            Restablecer Contraseña
          </h1>
        </div>
        <div className="flex pt-3 pb-4 px-10 justify-center text-justify">
          <p className="leading-5">
            Te enviamos un enlace para restablecer tu contraseña. Revisa tu
            correo electrónico y, si no lo ves en unos minutos, revisa tu
            carpeta de spam o correo no deseado.
          </p>
        </div>
        <div className="flex flex-col p-8 pt-4 gap-5">
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
          <Button
            loading={isForgotPasswordLoading}
            className="flex-1"
            type="submit"
          >
            Restablecer la contraseña
          </Button>
        </div>
      </Card>
    </form>
  );
}
export default EmailForm;
