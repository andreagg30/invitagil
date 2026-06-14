import { useForm } from "react-hook-form";
import {
  useChangeEmail,
  type ChangeEmailPayload,
} from "../../api/useChangeEmailOtp";
import Modal from "../../components/Modal";
import { Button, PasswordInput, TextInput } from "../../components";
import { formValidators } from "../../shared/formValidators";
import type { User } from "../../api/useGetProfile";

function ChangeEmailModal({
  open,
  handleClose,
  user
}: {
  open: boolean;
  handleClose: VoidFunction;
  user: User
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangeEmailPayload>({
    defaultValues: {
        email: user.email,
        newEmail: '',
        password: ''
    }
  });

  const { mutate: changeEmail, isPending: isChangeEmailLoading } =
    useChangeEmail();
  function onSubmit(payload: ChangeEmailPayload) {
    changeEmail(payload, {
        onSuccess: () => {
            handleClose()
        }
    });
  }
  return (
    <Modal
      open={open}
      title="Modifica tu Correo Electrónico"
      onClose={handleClose}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col p-8 pt-4 gap-4">
          <TextInput
            label="Correo electrónico actual"
            type="email"
            disabled
            maxLength={255}
            {...register("email", {
              required: formValidators.required,
              pattern: formValidators.email,
            })}
            error={errors.email}
          />
          <TextInput
            label="Nuevo correo electrónico*"
            type="email"
            maxLength={255}
            {...register("newEmail", {
              required: formValidators.required,
              pattern: formValidators.email,
            })}
            error={errors.newEmail}
          />

          <PasswordInput
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

          <div className="flex flex-col">
            <Button onClick={handleClose} variant="outlined">
              Cancelar
            </Button>
            <Button
              loading={isChangeEmailLoading}
              className="mt-3"
              type="submit"
            >
              Cambiar Correo Electrónico
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default ChangeEmailModal;
