import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAlert } from "../contexts/AlertContext/useAlert";
import { apiFetch } from "../shared/apiFetch";
import type { ApiResponse } from "../shared/apiInterfaces";

export interface ChangeEmailPayload {
  email: string;
  newEmail: string;
  password: string;
}

export function useChangeEmail() {
  const { showError, showSuccess } = useAlert();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: ChangeEmailPayload) => {
      const response = await apiFetch<ApiResponse>(`/otp/change-email`, {
        method: "PATCH",

        body: JSON.stringify(payload),
      });

      console.log(response, "response");

      return response;
    },
    onSuccess: () => {
      showSuccess("¡Correo electrónico modificado!");
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
    onError: (error) => {
      showError(error.message);
    },
  });
}
