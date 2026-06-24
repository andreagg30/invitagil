import { useForm } from "react-hook-form";
import type { ForgotPasswordPayload } from "../../api/useForgotPassword";
import useForgotPassword from "../../api/useForgotPassword";
import { Button, Card, TextInput } from "../../components";
import { formValidators } from "../../shared/formValidators";
import Done from "./Done";

function EmailForm() {
  const { mutate: forgotPassword, isPending: isForgotPasswordLoading, data: forgotPasswordData } =
    useForgotPassword();
  function handleForgotPassword(payload: ForgotPasswordPayload) {
    forgotPassword(payload);
  }
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<ForgotPasswordPayload>();


  if(forgotPasswordData?.success){
    return <Done />
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
            Introduce la dirección de correo electrónico verificada de tu cuenta
            de usuario y te enviaremos un enlace para restablecer la contraseña.
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
