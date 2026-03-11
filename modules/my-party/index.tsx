"use client";
import Icon from "@/components/Icon";
import { useEffect, useState } from "react";
import GuestModal from "./GuestModal";

const colums = [
  { name: "Nombre", key: "name" },
  { name: "Correo", key: "email" },
  { name: "Teléfono", key: "phone" },
  { name: "Pases Asignados", key: "assignedPasses" },
  { name: "Pases Confirmados", key: "confirmedPasses" },
];

export interface Guest {
  name: string;
  email: string;
  phone: string;
  assignedPasses: number;
  confirmedPasses: number;
}
export interface Pass {
  name: string;
  attending: boolean;
}
export interface GuestData {
  name: string;
  email: string;
  phone: string;
  assignedPasses: number;
  passes: Pass[];
}

function MyParty() {
  const [open, setOpen] = useState(false);
  const [currentGuest, setCurrentGuest] = useState<Guest | null>(null);
  const [guests, setGuests] = useState<Guest[] | undefined>(undefined);

  function handleFetchGuests() {
    fetch("/api/guests")
      .then((res) => res.json())
      .then((data) => {
        setGuests(
          data?.map((guest: GuestData) => ({
            ...guest,
            confirmedPasses: (guest?.passes || []).filter((p: Pass) => p.attending)
              .length,
          })),
        );
      });
  }

  useEffect(() => {
    handleFetchGuests();
  }, []);

  return (
    <div className="flex flex-col px-[10%] py-10 gap-10">
      <title>Mi fiesta</title>
      <h1 className="font-bold text-2xl">Mis Invitados</h1>

      <button
        onClick={() => setOpen(true)}
        className="flex cursor-pointer items-center justify-center gap-2 bg-white hover:bg-gray-100 px-6 py-3 rounded-full border-2 border-gray-300  active:scale-95 transition-all"
      >
        <span className="font-semibold text-black">Añadir invitado</span>
        <Icon icon="add" className="text-2xl text-black" />
      </button>

      <table className="border-collapse border-2 border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {" "}
            {colums.map((col) => (
              <th key={col.key} className="border-2 border-gray-300 bg-cyan-950 text-white px-4 py-2">
                {col.name}
              </th>
            ))}
            <th className="border bg-cyan-950 border-gray-300 px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {guests?.map((guest, i) => (
            <tr key={i} className="bg-gray-100">
              {colums.map((col) => (
                <td
                  key={col.key}
                  className="border-2 border-gray-300 px-4 py-2"
                >
                  {guest[col.key as keyof Guest]}
                </td>
              ))}
              <td className="border-2 border-gray-300 px-4 py-2">
                <div className=" flex justify-center">
                  <button className="w-min cursor-pointer">
                    <Icon
                      icon="edit"
                      className="text-gray-500 hover:text-gray-700"
                    />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <GuestModal
        onSuccess={() => handleFetchGuests()}
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}

export default MyParty;
