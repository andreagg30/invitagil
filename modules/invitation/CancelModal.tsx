"use client";

import Modal from "@/components/Modal";
import {  useState } from "react";
import Button from "@/components/Button";
import { Guest } from "../my-party";
import { toast } from "react-toastify";
import Icon from "@/components/Icon";

export default function CancelModal({
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
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    try {
      setLoading(true);
      fetch("/api/guests", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: currentGuest?._id,
          passes: currentGuest?.passes.map((pass) => ({
            name: pass.name,
            attending: false,
          })),
        }),
      }).then((data) => {
        if (data.ok) {
          setLoading(false);
          toast.success("Invitación cancelada correctamente");
        }
      });

      onSuccess();
      onClose();
    } catch (error) {
      toast.error("Ocurrió un error al guardar la cancelación");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      open={open}
      title={`Cancelar asistencia`}
      onClose={onClose}
      actions={
        <div className="mt-4 flex gap-2 justify-end">
          <Button
            className="flex border-2 border-dashed gap-1 text-primary-brown border-primary-brown justify-center rounded-full bg-white px-5 hover:bg-white/70 items-center disabled:opacity-50 disabled:pointer-events-none"
            disabled={loading}
            onClick={onClose}
          >
            Cerrar
          </Button>
          <Button
            className="flex gap-1 justify-center rounded-full bg-red-700 px-5 hover:bg-red-700/70"
            loading={loading}
            onClick={onSubmit}
          >
            No asistiré <Icon icon="cancel" className="ml-2" />
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-3">
        <label className="mb-1 text-base font-medium text-black">
          Estas a punto de cancelar tu asistencia, por favor confirma que no
          podrás asistir al evento.
        </label>
      </div>
    </Modal>
  );
}
