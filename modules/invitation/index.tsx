"use client";

import Divider from "@/components/Divider";
import Icon from "@/components/Icon";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Guest } from "../my-party";
import ApproveButton from "./ApproveButton";

function Invitation() {
  const [currentGuest, setCurrentGuest] = useState<Guest | null>(null);

  function handleFetchGuest() {
    const urlParams = new URLSearchParams(window.location.search);
    const guestId = urlParams.get("g");
    fetch("/api/guests?_id=" + guestId)
      .then((res) => res.json())
      .then((data) => {
        setCurrentGuest(data);
      });
  }


  useEffect(() => {
    Promise.resolve().then(() => handleFetchGuest());
  }, []);


  return (
    <div className="h-screen overflow-auto overflow-x-hidden w-full bg-[radial-gradient(circle,rgba(255,255,255,.6)_2px,transparent_2px)] flex flex-col bg-size-[30px_30px] bg-position-[0_0] bg-blue-100">
      <div className="flex z-10 flex-col items-center justify-center">
        <div className="h-125 w-150 relative justify-center items-center flex flex-col max-md:-my-20">
          <Image
            src="/IMG_1929.png"
            className="absolute max-md:hidden"
            height={600}
            width={600}
            alt=""
          />
          <Image
            src="/IMG_1929.png"
            className="absolute md:hidden "
            height={450}
            width={450}
            alt=""
            priority
          />
          <div className="flex justify-center pb-1 z-10 w-full text-center">
            <span className="cursive md:text-6xl text-4xl font-bold text-primary-blue">
              Baby shower
            </span>
          </div>

          <div className="flex justify-center py-2 z-10">
            <div className="w-3 h-3 rounded-4xl bg-primary-blue"></div>
          </div>

          <div className="flex justify-center pb-20 z-10 w-full text-center">
            <span className="cinzel text-base font-medium italic text-primary-brown">
              Sergio Daniel Gaxiola Gil
            </span>
          </div>
          <div className="flex absolute justify-center md:bottom-15 bottom-30 z-10 w-full">
            <div className="w-30 h-30 flex justify-center items-center ">
              <Image
                src="/pato.png"
                className="absolute animate-[breathe_2.6s_ease-in-out_infinite] motion-reduce:animation-none max-md:hidden"
                height={300}
                width={300}
                alt="Decorative duck"
              />
              <Image
                src="/pato.png"
                className="absolute animate-[breathe_2.6s_ease-in-out_infinite] motion-reduce:animation-none md:hidden"
                height={180}
                width={180}
                alt="Decorative duck"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex z-10 gap-5 items-center justify-center max-md:px-3 flex-col">
        <div className="text-center  text-xl font-medium md:text-nowrap p-5 shadow-md bg-white/70 text-primary-brown rounded-full cinzel">
          {currentGuest ? (
            <strong className=" roboto text-primary-brown underline underline-offset-4">
              {currentGuest.name}
            </strong>
          ) : (
            "¡Hola! "
          )}
          <br />
          <span className="text-sm">
            Acompáñanos a celebrar la llegada de nuestro bebé
          </span>
        </div>

        <div className="flex w-full md:w-112.5 shadow-md px-10 py-7 h-full bg-white/70 gap-5 rounded flex-col items-center justify-center">
          <div className="flex gap-4 sm:gap-6 justify-center">
            <div className="font-script text-2xl md:text-3xl sm:text-4xl cursive text-primary-brown">
              Viernes
            </div>

            <div className="h-10 sm:h-12 w-0.5 bg-primary-brown" />

            <div className="font-invite text-4xl md:text-5xl sm:text-6xl cinzel leading-none text-primary-brown">
              17
            </div>

            <div className="h-10 sm:h-12 w-0.5 bg-primary-brown" />

            <div className="font-script text-2xl md:text-3xl sm:text-4xl cursive text-primary-brown">
              2:00pm
            </div>
          </div>

          <Divider />

          <div className="font-script text-4xl md:text-5xl cinzel text-primary-brown">
            ABRIL
          </div>
        </div>

        <div className="flex gap-5 w-full md:w-112.5 shadow-md px-10 py-7 h-full bg-white/70 flex-col rounded ">
          <div className="flex gap-5 justify-center items-center">
            <span className="text-primary-brown text-2xl cinzel">SALÓN:</span>

            <span className="cursive text-4xl md:text-5xl text-primary-brown">
              Cielito Mío
            </span>
          </div>
          <Divider />

          <a
            href="https://maps.google.com/?q=Calle+Diego+Rivera+384+Rinc%C3%B3n+Alameda+Sector+3+R%C3%ADos"
            target="_blank"
            className="flex outline-offset-0 items-center gap-3 rounded-2xl border border-primary-baby-blue bg-white/70 px-5 py-3 text-sm font-semibold text-primary-brown transition focus:outline-none focus:ring-2 cinzel focus:ring-offset-2"
          >
            <Icon icon="location_on" className="text-2xl! text-primary-brown" />{" "}
            CALLE DIEGO RIVERA 384, RINCÓN ALAMEDA. SECTOR 3 RÍOS
          </a>
        </div>

        <div className="flex items-center gap-5 w-full md:w-112.5 shadow-md px-10 py-5 h-full bg-white/70 flex-col rounded">
          <div className="justify-center flex flex-col gap-2">
            <Icon icon="mail" className="text-8xl!  text-primary-brown" />
            <span className="text-primary-brown text-2xl cursive">
              <strong>$ </strong>500.00
            </span>
          </div>
        </div>

        <div className="flex items-center gap-5 w-full md:w-112.5 shadow-md px-10 py-5 h-full bg-white/70 flex-col rounded mb-24">
          <div className="text-white bg-primary-brown font-bold px-3 rounded-full">
            <span>Pases: {currentGuest?.passes.length || 0}</span>
          </div>
          <div className="justify-center text-center flex flex-col gap-3">
            <span className="text-primary-brown font-bold text-base md:text-xl cinzel">
              Por favor, confirme su asistencia.
            </span>

            {currentGuest && <ApproveButton currentGuest={currentGuest} />}
          </div>
        </div>
      </div>

      <div className="w-full h-64 fixed bottom-0"></div>
      <div className="flex justify-center">
        <img src="patos.png" className="fixed opacity-40 md:-top-100 -top-40" />
      </div>
      <div className="flex justify-center">
        <img
          src="patos.png"
          className="fixed md:hidden opacity-40 md:-top-100 -bottom-80"
        />
      </div>
    </div>
  );
}

export default Invitation;
