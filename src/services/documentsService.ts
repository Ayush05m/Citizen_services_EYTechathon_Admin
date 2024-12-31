import api from "./api";
import { Document } from "@/types";

export const documents = {
  getAll: async () => {
    const response = await api.get<Document[]>("/documents");
    return response.data;
  },
  getCount: async () => {
    const response = await api.get<{ count: number }>("/documents/count");
    return response.data.count;
  },
  verify: async (
    id: string,
    status: "verified" | "rejected",
    comments?: string
  ) => {
    const response = await api.post<Document>(`/documents/${id}/verify`, {
      status,
      comments,
    });
    return response.data;
  },
  delete: async (id: string) => {
    await api.delete(`/documents/${id}`);
  },
};
