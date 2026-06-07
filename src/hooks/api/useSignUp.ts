import { useMutation } from "@tanstack/react-query";

export interface SignUpPayload {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    password: string;
}
const API_URL = import.meta.env.VITE_API_URL;

export function useSignUp() {
  return useMutation({
    mutationFn: async (payload: SignUpPayload) => {
      const response = await fetch(`${API_URL}/api/users`, {
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
  });
}
