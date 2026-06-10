import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../contexts/AlertContext/useAlert";

export interface LoginPayload {
  email: string;
  password: string;
}
const API_URL = import.meta.env.VITE_API_URL;

export function useLogin() {
  const navigate = useNavigate();
  const { showError, showSuccess } = useAlert();

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
        throw new Error(data.message || "unknownError");
      }

      return data;
    },
    onSuccess: () => {
      navigate("/");
      showSuccess('¡Bienvenido!')
    },
    onError: (error) => {
      showError(error.message);
    },
  });
}
