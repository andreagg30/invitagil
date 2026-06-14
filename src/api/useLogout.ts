import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../contexts/AlertContext/useAlert";
const API_URL = import.meta.env.VITE_API_URL;

export default function useLogout() {
  const navigate = useNavigate();

  const { showSuccess, showError } = useAlert();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_URL}/users/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "unknownError");
      }

      return data;
    },
    onSuccess: () => {
      showSuccess("¡Hasta Pronto!");
      queryClient.removeQueries({ queryKey: ["userProfile"] });
      navigate("/login");
    },
    onError: (error) => {
      showError(error.message);
    },
  });
}
