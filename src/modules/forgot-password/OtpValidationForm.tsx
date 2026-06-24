import { Controller, useForm } from "react-hook-form";
import { Button, Card, OtpInput } from "../../components";
import { formValidators } from "../../shared/formValidators";
import { useResendOtp } from "../../api/useResendOtp";
import { useCounter } from "../../hooks/useCounter";
import useGetProfile from "../../api/useGetProfile";
import { useVerifyEmail } from "../../api/useVerifyEmail";
interface OtpPayload {
  otp: string;
}
function OtpValidationForm() {
  const { handleSubmit, control, reset } = useForm<OtpPayload>();
  const { startCounter, counter, isRunning } = useCounter(30);
  const { mutate: resendOtp, isPending: isResendOtpLoading } = useResendOtp();

  const { mutate: verifyEmail, isPending: isVerifyEmailLoading } =
    useVerifyEmail();

  function handleResetOtp() {
    resendOtp(undefined, {
      onSuccess: () => {
        startCounter();
      },
    });
  }

  function handleVerifyEmail(payload: OtpPayload) {
    verifyEmail(payload, {
      onError: () => {
        reset({
          otp: "",
        });
      },
    });
  }

  const { data: user } = useGetProfile();

  return (
    <form onSubmit={handleSubmit(handleVerifyEmail)}>
      <Card className="p-0">
        <div className="flex justify-center bg-flower p-4 rounded-t-md">
          <h1 className="text-white font-bold text-2xl">
            Verifica tu correo electrónico
          </h1>
        </div>
        <div className="flex pt-10 px-10 justify-center text-justify">
          <p>
            Ingresa el código de verificación que enviamos a tu correo
            electrónico: <strong>{user?.email}</strong>
          </p>
        </div>

        <div className="flex flex-col p-8 pt-4 gap-4">
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
          <div className="flex gap-3 mt-15">
            <Button
              variant="outlined"
              loading={isResendOtpLoading}
              className="flex-1"
              type="button"
              disabled={!!isRunning}
              onClick={handleResetOtp}
            >
              {isRunning ? `Reenviar en ${counter}s` : "Reenviar código"}
            </Button>
            <Button
              disabled={isResendOtpLoading}
              loading={isVerifyEmailLoading}
              className="flex-1"
              type="submit"
            >
              Verificar
            </Button>
          </div>
        </div>
      </Card>
    </form>
  );
}

export default OtpValidationForm;
