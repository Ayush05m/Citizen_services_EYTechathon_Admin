import api from "./api";
import { Scheme } from "@/types";

export const schemes = {
  getAll: async (): Promise<Scheme[]> => {
    const response = await api.get("/schemes");
    return response.data;
  },
  getCount: async () => {
    const response = (
      await api.get<{ message: string; data: { count: number } }>(
        "/schemes/count"
      )
    ).data;
    return response.data.count;
  },
  create: async (scheme: Omit<Scheme, "id">) => {
    const response = await api.post<Scheme>("/schemes", scheme);
    return response.data;
  },
  update: async ({ _id, ...scheme }: Scheme) => {
    const response = await api.put<Scheme>(`/schemes/${_id}`, scheme);
    return response.data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/schemes/${id}`);
  },
};
