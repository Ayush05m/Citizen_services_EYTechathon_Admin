import api from "./api";
import { AIModel } from "@/types";

export const aiModels = {
  getAll: async () => {
    const response = await api.get<AIModel[]>("/ai-models");
    return response.data;
  },
  update: async ({ id, config }: { id: string; config: any }) => {
    const response = await api.put<AIModel>(`/ai-models/${id}`, config);
    return response.data;
  },
  train: async (modelId: string) => {
    const response = await api.post<AIModel>(`/ai-models/${modelId}/train`);
    return response.data;
  },
};
