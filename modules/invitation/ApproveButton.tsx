"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import Spinner from "@/components/Spinner";
import { Guest } from "../my-party";
import ApproveModal from "./ApproveModal";

function ApproveButton({ currentGuest }: { currentGuest: Guest | null }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [approved, setApproved] = useState(
    currentGuest?.passes.some((p) => p.attending),
  );

  function handleApprove() {
    if (!currentGuest) return;
    if(currentGuest?.passes?.length > 1) {
      setOpen(true);
      return;
    }
    setLoading(true);
    fetch("/api/guests", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: currentGuest?._id,
        passes: currentGuest.passes.map((pass) => ({
          name: pass.name,
          attending: true,
        })),
      }),
    }).then((data) => {
      console.log(data);
      if (data.ok) {
        setLoading(false);
        toast.success("Invitación confirmada correctamente");
        setApproved(true);
      }
    });
  }
  if (approved) {
    return (
      <div className="text-2xl font-semibold text-green-600">
        ¡Gracias por confirmar tu asistencia! Nos vemos pronto.
      </div>
    );
  }

  return (
    <>
      <button
        className="
                relative
                rounded-full
                md:px-10
                py-4
                text-xl
                md:text-2xl
                font-semibold
                text-primary-brown
                bg-primary-blue/30
                border-2
                border-white
                shadow-[0_10px_25px_rgba(0,0,0,.12)]
                transition-all
                duration-300
                hover:shadow-[0_15px_35px_rgba(0,0,0,.18)]
                hover:bg-primary-blue/60
                hover:scale-105
                active:scale-95
                cursor-pointer
                "
        onClick={handleApprove}
      >
        {loading ? <Spinner /> : "Confirmar Asistencia"}
      </button>
      <ApproveModal
        currentGuest={currentGuest}
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={() => {
          setOpen(false);
          setApproved(true);
        }}
      />
    </>
  );
}

export default ApproveButton;
