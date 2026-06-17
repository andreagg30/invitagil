import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../contexts/AlertContext/useAlert";
import { apiFetch } from "../shared/apiFetch";
import type { ApiResponse } from "../shared/apiInterfaces";

export interface ResetPasswordPayload {
  email: string;
  otp: string;
  newPassword: string;
}

export function useResetPassword() {
  const { showError, showSuccess } = useAlert();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: ResetPasswordPayload) => {
      const response = await apiFetch<ApiResponse>(`/passwords/reset`, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      return response;
    },
    onSuccess: () => {
      showSuccess("¡Todo Listo! Ahora Inicia sesión");
      navigate("/login");
      queryClient.removeQueries({ queryKey: ["userProfile"] });
    },
    onError: (error) => {
      showError(error.message);
    },
  });
}
