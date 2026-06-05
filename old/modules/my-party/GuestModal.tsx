"use client";
import Modal from "@/components/Modal";
import { Guest } from "./index";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import TextInput from "@/components/TextInput";
import PhoneInput from "@/components/PhoneInput";
import Checkbox from "@/components/Checkbox";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { toast } from "react-toastify";
interface FromValues {
  name: string;
  email: string;
  phone: string;
  assignedPasses: string;
  pases: {
    name: string;
    attending: boolean;
  }[];
}

export default function GuestModal({
  open,
  onClose,
  currentGuest,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  currentGuest: Guest | null;
  onSuccess: () => void;
}) {
  const {
    register,
    getValues,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FromValues>({
    defaultValues: {
      assignedPasses: "1",
      name: "",
      email: "",
      phone: "",
      pases: [
        {
          name: "Pase 1",
          attending: false,
        },
      ],
    },
  });

  const assignedPasses = useWatch({ control, name: "assignedPasses" });

  const { fields, replace } = useFieldArray({
    control,
    name: "pases",
  });

  const [loading, setLoading] = useState(false);

  function onSubmit(data: FromValues) {
    setLoading(true);
    fetch("/api/guests", {
      method: currentGuest ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: currentGuest?._id,
        invitacionId: 1,
        name: data.name,
        email: data.email,
        phone: data.phone,
        assignedPasses: data.assignedPasses,
        passes: fields.map((_, index) => ({
          name: data.pases[index].name,
          attending: currentGuest ? currentGuest.passes[index]?.attending : data.pases[index].attending || null,
        })),
      }),
    }).then((data) => {
      console.log(data);
      if (data.ok) {
        setLoading(false);
        onClose();
        onSuccess();
        toast.success("Invitado añadido correctamente");
      }
    });
  }

  useEffect(() => {
    if (!assignedPasses) return;
    replace(
      Array.from({ length: parseInt(assignedPasses) }, (_, i) => {
        const value = getValues(`pases.${i}`);
        if (value) {
          return value;
        }
        return {
          name: `Pase ${i + 1}`,
          attending: false,
        };
      }),
    );
  }, [assignedPasses, replace, getValues]);

  useEffect(() => {
    if (open) {
      reset({
        name: currentGuest?.name || "",
        email: currentGuest?.email || "",
        phone: currentGuest?.phone || "",
        assignedPasses: currentGuest?.assignedPasses?.toString() || "1",
        pases: currentGuest?.passes
      });
    }
  }, [open, reset, currentGuest]);

  return (
    <Modal
      open={open}
      title={
        (currentGuest ? "Editar" : "Añadir") +
        " invitado" +
        (currentGuest ? " (" + (currentGuest?.name ?? "") + ")" : "")
      }
      onClose={onClose}
      actions={
        <div className="flex justify-end mt-4">
          <Button
            className="w-22.5"
            loading={loading}
            onClick={handleSubmit(onSubmit)}
          >
            Guardar
          </Button>
        </div>
      }
    >
      <div className="flex flex-col flex-1 gap-3 p-1">
        <TextInput
          label="Nombre:"
          error={errors.name?.message}
          maxLength={50}
          {...register("name", {
            required: "Este campo es requerido",
          })}
        />
        <TextInput
          label="Email:"
          error={errors.email?.message}
          maxLength={50}
          {...register("email", {
            validate: (value) => {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (value && !emailRegex.test(value)) {
                return "Formato de email inválido";
              }

              return true;
            },
          })}
        />
        <PhoneInput
          {...register("phone", {
            validate: (value) => {
              // Get current type at validation time (not captured at render)
              const phoneRegex = /^\(?[2-9]\d{2}\)?[-\s]?\d{3}[-\s]?\d{4}$/;

              if (value && !phoneRegex.test(value)) {
                return "Formato de teléfono inválido";
              }
              return true;
            },
          })}
          label="Teléfono:"
          error={errors.phone?.message}
          maxLength={15}
        />
        <TextInput
          label="Pases asignados"
          maxLength={3}
          type="number"
          error={errors.assignedPasses?.message}
          {...register("assignedPasses", {
            min: {
              value: 1,
              message: "Debe asignar al menos un pase",
            },
            required: "Este campo es requerido",
          })}
        />
        <div className="flex flex-col gap-1">
          <label htmlFor="manage-pases" className="mb-1 text-base font-medium text-black">
            Gestionar Pases:
          </label>
          <div id="manage-pases" className="border flex flex-col rounded-lg gap-1 p-3 min-h-16">
            {assignedPasses === "0" ? (
              <div className="text-gray-600">
                No se han asignado pases. Por favor, asigna al menos un pase
                para gestionar las confirmaciones.
              </div>
            ) : (
              fields.map((field, index) => (
                <div className="flex gap-3 items-center flex-wrap" key={index}>
                  <TextInput
                    id={`pase-name-${index}`}
                    maxLength={50}
                    {...register(`pases.${index}.name`, {
                      required: "Este campo es requerido",
                    })}
                    error={errors?.pases?.[index]?.name?.message}
                  />
                  <Controller
                    name={`pases.${index}.attending`}
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        id={`pase-attending-${index}`}
                        checked={field.value}
                        onChange={field.onChange}
                        label="¿Confirmado?"
                      />
                    )}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
