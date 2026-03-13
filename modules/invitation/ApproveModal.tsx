"use client";

import Modal from "@/components/Modal";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { Guest } from "../my-party";
import { toast } from "react-toastify";
import Icon from "@/components/Icon";

interface FormValues {
  pases: {
    name: string;
    attending: boolean;
  }[];
}

export default function ApproveModal({
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
  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: {
      pases: [],
    },
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentGuest) {
      reset({
        pases: currentGuest.passes || [],
      });
    }
  }, [currentGuest, reset]);

  async function onSubmit(data: FormValues) {
    try {
      setLoading(true);

      const res = await fetch("/api/guests", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: currentGuest?._id,
          passes: data.pases,
        }),
      });

      if (!res.ok) {
        throw new Error("No se pudo actualizar la invitación");
      }

      toast.success("Invitación confirmada correctamente");
      onSuccess();
      onClose();
    } catch (error) {
      toast.error("Ocurrió un error al guardar la confirmación");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      open={open}
      title={`Gestionar pases para ${currentGuest?.name || "Invitado"}`}
      onClose={onClose}
      actions={
        <div className="mt-4 flex justify-end">
          <Button
            className="flex gap-1 justify-center rounded-full bg-primary-brown px-5 hover:bg-primary-brown/70"
            loading={loading}
            onClick={handleSubmit(onSubmit)}
          >
            Enviar <Icon icon="send" className="ml-2" />
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-3">
        <label className="mb-1 text-base font-medium text-black">
          Tu invitación incluye {currentGuest?.assignedPasses || 0} pase(s). Por
          favor confirma cuáles asistirán al evento.
        </label>

        <div className="flex min-h-16 flex-col gap-3 rounded-lg border p-3">
          {currentGuest?.passes?.map((pass, index) => (
            <div
              className="flex flex-col gap-2 rounded-xl bg-primary-blue/10 p-3 sm:flex-row sm:items-center sm:justify-between"
              key={index}
            >
              <span className="font-medium text-primary-brown">
                {pass.name}
              </span>

              <Controller
                name={`pases.${index}.attending`}
                control={control}
                render={({ field }) => (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => field.onChange(true)}
                      className={`cursor-pointer rounded-full border px-5 py-2 text-sm font-semibold transition-all ${
                        field.value
                          ? "border-primary-brown bg-primary-baby-blue text-primary-brown shadow"
                          : "border-primary-brown/30 bg-white text-primary-brown/70 hover:bg-primary-baby-blue/40"
                      }`}
                    >
                      Sí asistirá
                    </button>

                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => field.onChange(false)}
                      className={`cursor-pointer rounded-full border px-5 py-2 text-sm font-semibold transition-all ${
                        field.value === false
                          ? "border-primary-brown bg-primary-brown text-white shadow"
                          : "border-primary-brown/30 bg-white text-primary-brown/70 hover:bg-primary-brown/10"
                      }`}
                    >
                      No asistirá
                    </button>
                  </div>
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
