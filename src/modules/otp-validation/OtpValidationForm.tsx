import { Controller, useForm } from "react-hook-form";
import { Button, Card, OtpInput } from "../../components";
import { formValidators } from "../../shared/formValidators";
interface OtpPayload {
  otp: string;
}
function OtpValidationForm() {
  const { handleSubmit, control } = useForm<OtpPayload>();
  return (
    <form onSubmit={handleSubmit(() => {})}>
      <Card className="p-0">
        <div className="flex justify-center bg-flower p-4 rounded-t-md">
          <h1 className="text-white font-bold text-2xl">
            Verifica tu correo electrónico
          </h1>
        </div>
        <div className="flex pt-10 px-10 justify-center text-justify">
          <p>Ingresa el código de verificación que enviamos a tu correo electrónico:</p>
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
              loading={false}
              className="flex-1"
              type="submit"
            >
              Reenviar correo
            </Button>
            <Button loading={false} className="flex-1" type="submit">
              Verificar
            </Button>
          </div>
        </div>
      </Card>
    </form>
  );
}

export default OtpValidationForm;
