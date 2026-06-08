import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

export default function useLogout() {
  const navigate = useNavigate();

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
        throw new Error(data.message || "Error creating user");
      }

      return data;
    },
    onSuccess: () => {
      navigate("/login");
    },
  });
}
