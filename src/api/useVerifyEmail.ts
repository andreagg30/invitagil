import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../contexts/AlertContext/useAlert";
import { apiFetch } from "../shared/apiFetch";
import type { ApiResponse } from "../shared/apiInterfaces";

export interface VerifyEmailPayload {
  otp: string;
}

export function useVerifyEmail() {
  const { showError, showSuccess } = useAlert();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: VerifyEmailPayload) => {
      const response = await apiFetch<ApiResponse>(`/otp/verify-email`, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      return response;
    },
    onSuccess: () => {
      showSuccess("¡Correo electrónico vefificado!");
      navigate("/my-board");
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
    onError: (error) => {
      showError(error.message);
    },
  });
}
