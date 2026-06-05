"use client";
import Modal from "@/components/Modal";
import { Guest } from "./index";
import { useState } from "react";
import Button from "@/components/Button";
import { toast } from "react-toastify";
import Icon from "@/components/Icon";


export default function DeleteModal({
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

  function onDelete() {
    setLoading(true);
    fetch("/api/guests", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: currentGuest?._id,
      }),
    }).then((data) => {
      console.log(data);
      if (data.ok) {
        setLoading(false);
        onClose();
        onSuccess();
        toast.success("Invitado eliminado correctamente");
      }
    });
  }


  return (
    <Modal
      open={open}
      title={'Eliminar Invitado'}
      onClose={onClose}
      actions={
        <div className="flex justify-end mt-4">
          <Button
            className="w-28 justify-center flex gap-1"
            loading={loading}
            onClick={onDelete}
          >
            Eliminar <Icon icon="delete" className="text-sm" />
          </Button>
        </div>
      }
    >
   <p>¿Estás seguro de que quieres eliminar este invitado? {currentGuest?.name}</p>
    </Modal>
  );
}
