"use client";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import { useState } from "react";

export default function Home() {
    const [password, setPassword] = useState("");

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
              if (password === "sergioBebe") 
            {
              window.location.href = "/my-party";
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