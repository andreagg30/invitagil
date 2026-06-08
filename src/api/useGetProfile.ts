import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../shared/apiFetch";

export default function useGetProfile() {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const response = await apiFetch("/users/getProfile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    },
  });
}
