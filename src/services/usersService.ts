import { User } from "@/types";
import api from "./api";

export interface userApiResponse {
  users: User[];
  pagination: { total: number; page: number; pages: number };
}

export const users = {
  getAll: async () => {
    const response = await api.get<userApiResponse>("/users");
    console.log(response);

    return response.data;
  },
  getCount: async () => {
    const response = (
      await api.get<{
        message: string;
        data: { count: number };
      }>("/users/count")
    ).data;

    return response.data.count;
  },
  getById: async (id: string) => {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },
  update: async ({ id, ...user }: User) => {
    const response = await api.put<User>(`/users/${id}`, user);
    return response.data;
  },
  delete: async (id: string) => {
    await api.delete(`/users/${id}`);
  },
};
