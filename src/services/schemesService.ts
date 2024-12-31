import api from "./api";
import { Scheme } from "@/types";

export const schemes = {
  getAll: async () => {
    const response = await api.get<Scheme[]>("/schemes");
    return response.data;
  },
  getCount: async () => {
    const response = await api.get<{ count: number }>("/schemes/count");
    return response.data.count;
  },
  create: async (scheme: Omit<Scheme, "id">) => {
    const response = await api.post<Scheme>("/schemes", scheme);
    return response.data;
  },
  update: async ({ id, ...scheme }: Scheme) => {
    const response = await api.put<Scheme>(`/schemes/${id}`, scheme);
    return response.data;
  },
  delete: async (id: string) => {
    await api.delete(`/schemes/${id}`);
  },
};
