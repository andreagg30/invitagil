import { useMutation } from "@tanstack/react-query";
import { useAlert } from "../contexts/AlertContext/useAlert";
const API_URL = import.meta.env.VITE_API_URL;

interface ForgotPasswordPayload {
    email: string
}

export default function useForgotPassword() {

  const { showSuccess, showError } = useAlert();

  return useMutation({
    mutationFn: async (payload: ForgotPasswordPayload) => {
      const response = await fetch(`${API_URL}/passwords/forgot`, {
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
      showSuccess("¡Código Enviado!");
    },
    onError: (error) => {
      showError(error.message);
    },
  });
}
