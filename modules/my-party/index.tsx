"use client";
import Icon from "@/components/Icon";
import { useEffect, useState } from "react";
import GuestModal from "./GuestModal";
import DeleteModal from "./DeleteModal";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";

const colums = [
  { name: "Nombre", key: "name" },
  { name: "Teléfono", key: "phone" },
  { name: "Pases Asignados", key: "assignedPasses" },
  { name: "Pases Confirmados", key: "confirmedPasses" },
  { name: "No Asisten", key: "notAttendingPasses" },
];

export interface GuestData {
  _id: string;
  name: string;
  email: string;
  phone: string;
  assignedPasses: number;
  passes: Pass[];
}

export interface Guest extends GuestData {
  confirmedPasses: number;
  notAttendingPasses: number;
}
export interface Pass {
  name: string;
  attending: boolean;
}

function MyParty() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openDelete, setOpenDelete] = useState(false);
  const [currentGuest, setCurrentGuest] = useState<Guest | null>(null);
  const [guests, setGuests] = useState<Guest[] | undefined>(undefined);

  function handleFetchGuests() {
    setLoading(true);
    fetch("/api/guests")
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setGuests(
          data?.map((guest: GuestData) => ({
            ...guest,
            confirmedPasses: (guest?.passes || []).filter(
              (p: Pass) => p.attending,
            ).length,
            notAttendingPasses: (guest?.passes || []).filter(
              (p: Pass) => p.attending === false,
            ).length,
          })),
        );
      });
  }

  useEffect(() => {
    Promise.resolve().then(() => handleFetchGuests());
  }, []);

  function handleShare(guest: Guest) {
    const url = `https://invitagil.com/invitations?g=${guest._id}`;

    const text = `¡Hola ${guest.name}! Te Inivito a mi baby shower, aquí tienes tu enlace de invitación: ${url}`;

    if (guest.phone) {
      const phoneNumber = guest.phone.replace(/\D/g, "");
      
      const whatsappUrl = `https://wa.me/${'+52' + phoneNumber}?text=${encodeURIComponent(text)}. Por favor confirma tu asistencia.`;
      window.open(whatsappUrl, "_blank");
      return;
    }
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}. Por favor confirma tu asistencia.`;
    window.open(whatsappUrl, "_blank");
  }
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authenticated') === 'true';
    }
    return false;
  });

  

  if (!authenticated) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="flex flex-col items-center justify-center gap-3 p-10 rounded-2xl bg-white/70">
          <h2 className="mb-4 text-xl font-bold">
            Ingresa la contraseña para acceder
          </h2>
          <TextInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
          />
          <Button
            onClick={() => {
              if (password === "sergioBebe") {
                setAuthenticated(true);
                localStorage.setItem('authenticated', 'true');
              }
            }}
            className="w-30"
          >
            Entrar
          </Button>
        </div>
      </div>
    );
  }

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

      <div className="overflow-auto w-full">
        <table className="border-collapse border-2 border-gray-300 min-w-225 w-full">
          <thead>
            <tr className="bg-gray-100">
              {colums.map((col) => (
                <th
                  key={col.key}
                  className="border-2 border-gray-300 bg-cyan-950 text-white px-4 py-2"
                >
                  {col.name}
                </th>
              ))}
              <th className="border bg-cyan-950 border-gray-300 px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr className="bg-white h-25">
                <td
                  colSpan={colums.length + 1}
                  className="border-2 border-gray-300 px-4 py-2 text-center"
                >
                  Cargando invitados...
                </td>
              </tr>
            ) : (
              <>
                {!guests?.length && (
                  <tr className="bg-white h-25">
                    <td
                      colSpan={colums.length + 1}
                      className="border-2 border-gray-300 px-4 py-2 text-center"
                    >
                      No hay invitados registrados.
                    </td>
                  </tr>
                )}
                {guests?.map((guest, i) => (
                  <tr key={i} className="bg-gray-100">
                    {colums.map((col) => {
                      const value = guest[col.key as keyof Guest];
                      return (
                        <td
                          key={col.key}
                          className="border-2 border-gray-300 px-4 py-2"
                        >
                          {value instanceof Array ? value.length : value}
                        </td>
                      );
                    })}
                    <td className="border-2 border-gray-300 px-4 py-2">
                      <div className="items-center gap-2 flex justify-center">
                        <button
                          className="w-min h-min  flex items-center cursor-pointer"
                          onClick={() => {
                            setCurrentGuest(guest);
                            setOpen(true);
                          }}
                        >
                          <Icon
                            icon="edit"
                            className="text-gray-500 hover:text-gray-700"
                          />
                        </button>
                        <button
                          className="w-min h-min flex items-center cursor-pointer"
                          onClick={() => {
                            setCurrentGuest(guest);
                            setOpenDelete(true);
                          }}
                        >
                          <Icon
                            icon="delete"
                            className="text-red-500 hover:text-red-700"
                          />
                        </button>
                        <button
                          className="w-min h-min flex items-center cursor-pointer"
                          onClick={() => {
                            handleShare(guest);
                          }}
                        >
                          <Icon
                            icon="share"
                            className="text-green-500 hover:text-green-700"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
      <GuestModal
        onSuccess={() => handleFetchGuests()}
        open={open}
        onClose={() => {
          setOpen(false);
          setCurrentGuest(null);
        }}
        currentGuest={currentGuest}
      />

      <DeleteModal
        onSuccess={() => handleFetchGuests()}
        currentGuest={currentGuest}
        open={openDelete}
        onClose={() => {
          setOpenDelete(false);
          setCurrentGuest(null);
        }}
      />
    </div>
  );
}

export default MyParty;
