import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export interface LoginPayload {
  email: string;
  password: string;
}
const API_URL = import.meta.env.VITE_API_URL;

export function useLogin() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error creating user");
      }

      return data;
    },
    onSuccess: () => {
      navigate("/");
    },
  });
}
