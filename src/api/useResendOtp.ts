import { useMutation } from "@tanstack/react-query";
import { useAlert } from "../contexts/AlertContext/useAlert";
import { apiFetch } from "../shared/apiFetch";
import type { ApiResponse } from "../shared/apiInterfaces";

export function useResendOtp() {
  const { showError, showSuccess } = useAlert();

  return useMutation({
    mutationFn: async () => {
      const response = await apiFetch<ApiResponse>(`/otp/resend`, {
        method: "POST",
      });

      return response;
    },
    onSuccess: () => {
      showSuccess("¡El Código se ha enviado nuevamente!");
    },
    onError: (error) => {
      showError(error.message);
    },
  });
}
