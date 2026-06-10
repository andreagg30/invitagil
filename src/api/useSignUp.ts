import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../contexts/AlertContext/useAlert";

export interface SignUpPayload {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
}
const API_URL = import.meta.env.VITE_API_URL;

export function useSignUp() {
  const navigate = useNavigate();
  const { showError, showSuccess } = useAlert();

  return useMutation({
    mutationFn: async (payload: SignUpPayload) => {
      const response = await fetch(`${API_URL}/users/signup`, {
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
      showSuccess('¡Cuenta creada con éxito!')
    },
    onError: (error) => {
      showError(error.message);
    },
  });
}
