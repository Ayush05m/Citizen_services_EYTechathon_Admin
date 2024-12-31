import { User } from "@/types";
import api from "./api";

export const users = {
  getAll: async () => {
    const response = await api.get<User[]>("/users");
    return response.data;
  },
  getCount: async () => {
    const response = await api.get<{ count: number }>("/users/count");
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
