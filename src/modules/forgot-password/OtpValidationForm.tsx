import { Controller, useForm } from "react-hook-form";
import { Button, Card, Icon, OtpInput, PasswordInput } from "../../components";
import { formValidators } from "../../shared/formValidators";
import { useResetPassword } from "../../api/useResetPassword";
interface OtpPayload {
  otp: string;
  newPassword: string;
  confirmPassword: string;
}
function OtpValidationForm({
  email,
  handleGoBack,
}: {
  email: string;
  handleGoBack: () => void;
}) {
  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { errors },
  } = useForm<OtpPayload>();
  const { mutate: resetPassword, isPending: isResetPasswordLoading } =
    useResetPassword();

  function handleVerifyEmail(payload: OtpPayload) {
    resetPassword(
      {
        email,
        newPassword: payload.newPassword,
        otp: payload.otp,
      },
      {
        onError: () => {
          reset({
            otp: "",
            confirmPassword: "",
            newPassword: "",
          });
        },
      },
    );
  }

  return (
    <form onSubmit={handleSubmit(handleVerifyEmail)}>
      <Card className="p-0 px-10 mt-20 relative overflow-hidden flex-1 max-w-150 w-[calc(100vw-24px)">
        <img
          src="/1.svg"
          alt="flowers"
          className="h-45 w-45 absolute right-3 top-3"
        />
        <div className="flex justify-center  pt-10">
          <div className="mt-5 flex justify-center items-center shadow border border-border h-15 w-15 rounded-full bg-white">
            <Icon
              icon="mail"
              className="text-flower text-3xl mr-1.5 mb-1"
            ></Icon>
          </div>
        </div>
        <div className="flex justify-center z-10 p-4">
          <h1 className="text-flower z-10 font-title font-medium text-4xl">
            Revisa tu correo electrónico
          </h1>
        </div>
        <div className="flex pt-3 z-10 justify-center text-justify">
          <p className="leading-5 text-dark-text">
            Te enviamos un código de verificación para restablecer tu
            contraseña. Revisa tu correo electrónico y, si no lo ves en unos
            minutos, revisa tu carpeta de spam o correo no deseado.
          </p>
        </div>

        <div className="flex flex-col py-8 pt-4 gap-4">
          <span className="font-semibold text-dark-text">
            1. Ingresa el Código de Verificación:
          </span>
          <Controller
            name="otp"
            control={control}
            rules={{
              required: formValidators.required,
            }}
            render={({ field }) => (
              <OtpInput value={field.value} onChange={field.onChange} />
            )}
          />

          <span className="font-semibold text-dark-text">2. Ingresa tu nueva contraseña:</span>

          <PasswordInput
            label="Nueva Contraseña*"
            type="password"
            hideIcon
            maxLength={100}
            placeholder="Ingresa..."
            {...register("newPassword", {
              required: formValidators.required,
              ...formValidators.password,
            })}
            error={errors.newPassword}
          />

          <PasswordInput
            label="Confirmar Contraseña*"
            type="password"
            hideIcon
            maxLength={100}
            placeholder="Ingresa..."
            {...register("confirmPassword", {
              required: formValidators.required,
              validate: (value, formValues) => {
                if (value !== formValues.newPassword) {
                  return "Las contraseñas deben coincidir.";
                }
              },
            })}
            error={errors.confirmPassword}
          />
          <div className="flex gap-3 mt-5">
            <Button
              onClick={handleGoBack}
              disabled={isResetPasswordLoading}
              variant="outlined"
              type="button"
            >
              <Icon icon="arrow_back" className="mr-3" />
              Regresar
            </Button>
            <Button
              loading={isResetPasswordLoading}
              className="flex-1"
              type="submit"
            >
              Restablecer contraseña
            </Button>
          </div>
        </div>
      </Card>
    </form>
  );
}

export default OtpValidationForm;
