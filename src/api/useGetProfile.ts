import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../shared/apiFetch";
import type { ApiResponse } from "../shared/apiInterfaces";

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  user_type_id: number;
  email_verified: boolean;
  is_active: boolean;
}
type GetProfileResponse = ApiResponse<{ user: User }>;

export default function useGetProfile() {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const response = await apiFetch<GetProfileResponse>("/users/getProfile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response?.data?.user || null;
    },
  });
}
