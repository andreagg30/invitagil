import { Controller, useForm } from "react-hook-form";
import { Button, Card, OtpInput, PasswordInput } from "../../components";
import { formValidators } from "../../shared/formValidators";
import { useResetPassword } from "../../api/useResetPassword";
interface OtpPayload {
  otp: string;
  newPassword: string;
  confirmPassword: string;
}
function OtpValidationForm({ email, handleGoBack }: { email: string, handleGoBack: () => void }) {
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
      <Card className="p-0">
        <div className="flex justify-center bg-flower p-4 rounded-t-md">
          <h1 className="text-white font-bold text-2xl">
            Revisa tu correo electrónico
          </h1>
        </div>
        <div className="flex pt-3 px-10 justify-center text-justify">
          <p>
            Te enviamos un código de verificación para restablecer tu
            contraseña. Revisa tu correo electrónico y, si no lo ves en unos
            minutos, revisa tu carpeta de spam o correo no deseado.
          </p>
        </div>

        <div className="flex flex-col p-8 pt-4 gap-4">
          <span className="font-bold">1. Ingresa el Código de Verificación:</span>
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

          <span className="font-bold">2. Ingresa tu nueva contraseña:</span>

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
