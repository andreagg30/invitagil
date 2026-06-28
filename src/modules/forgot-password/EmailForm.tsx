import { useForm } from "react-hook-form";
import type { ForgotPasswordPayload } from "../../api/useForgotPassword";
import useForgotPassword from "../../api/useForgotPassword";
import { Button, Card, Icon, TextInput } from "../../components";
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
      <Card className="p-0 px-10 relative overflow-hidden flex-1 max-w-125 w-[calc(100vw-24px)">
        <img
          src="/1.svg"
          alt="flowers"
          className="h-45 w-45 absolute right-3 top-3"
        />
        <div className="flex justify-center  pt-10">
          <div className="mt-5 flex justify-center items-center shadow border border-border h-15 w-15 rounded-full bg-white">
            <Icon
              icon="encrypted"
              className="text-flower text-3xl mr-1.5 mb-1"
            ></Icon>
          </div>
        </div>
        <div className="flex justify-center z-10 p-4">
          <h1 className="text-flower font-title font-medium text-4xl">
            Restablecer Contraseña
          </h1>
        </div>
        <div className="flex pt-3 pb-4 justify-center text-justify">
          <p className="leading-5 text-dark-text">
            Te enviamos un enlace para restablecer tu contraseña. Revisa tu
            correo electrónico y, si no lo ves en unos minutos, revisa tu
            carpeta de spam o correo no deseado.
          </p>
        </div>
        <div className="flex flex-col py-8 pt-4 gap-5">
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
