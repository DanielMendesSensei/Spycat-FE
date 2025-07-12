import axios, { AxiosResponse } from "axios";
import {
  SpyCat,
  Mission,
  Target,
  SpyCatCreateData,
  SpyCatUpdateData,
  MissionCreateData,
  TargetCreateData,
  TargetUpdateData,
  SpyCatStats,
  SearchFilters,
} from "@/types";

// Create axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("API Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error("API Response Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Spy Cats API
export const spyCatsApi = {
  // Get all spy cats
  getAll: async (params?: SearchFilters): Promise<SpyCat[]> => {
    const response: AxiosResponse<SpyCat[]> = await api.get("/api/cats/", {
      params,
    });
    return response.data;
  },

  // Get spy cat by ID
  getById: async (id: number): Promise<SpyCat> => {
    const response: AxiosResponse<SpyCat> = await api.get(`/api/cats/${id}`);
    return response.data;
  },

  // Create new spy cat
  create: async (data: SpyCatCreateData): Promise<SpyCat> => {
    const response: AxiosResponse<SpyCat> = await api.post("/api/cats/", data);
    return response.data;
  },

  // Update spy cat (salary only)
  update: async (id: number, data: SpyCatUpdateData): Promise<SpyCat> => {
    const response: AxiosResponse<SpyCat> = await api.put(
      `/api/cats/${id}`,
      data
    );
    return response.data;
  },

  // Delete spy cat
  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/cats/${id}`);
  },

  // Get available cats
  getAvailable: async (): Promise<SpyCat[]> => {
    const response: AxiosResponse<SpyCat[]> = await api.get(
      "/api/cats/available"
    );
    return response.data;
  },

  // Search cats
  search: async (
    query: string
  ): Promise<{ cats: SpyCat[]; query: string; total_results: number }> => {
    const response = await api.get(`/api/cats/search`, {
      params: { q: query },
    });
    return response.data;
  },

  // Get statistics
  getStats: async (): Promise<SpyCatStats> => {
    const response: AxiosResponse<SpyCatStats> = await api.get(
      "/api/cats/statistics"
    );
    return response.data;
  },
};

// Missions API
export const missionsApi = {
  // Get all missions
  getAll: async (): Promise<Mission[]> => {
    const response: AxiosResponse<Mission[]> = await api.get("/api/missions/");
    return response.data;
  },

  // Get mission by ID
  getById: async (id: number): Promise<Mission> => {
    const response: AxiosResponse<Mission> = await api.get(
      `/api/missions/${id}`
    );
    return response.data;
  },

  // Create new mission
  create: async (data: MissionCreateData): Promise<Mission> => {
    const response: AxiosResponse<Mission> = await api.post(
      "/api/missions/",
      data
    );
    return response.data;
  },

  // Assign cat to mission
  assignCat: async (missionId: number, catId: number): Promise<Mission> => {
    const response: AxiosResponse<Mission> = await api.post(
      `/api/missions/${missionId}/assign`,
      {
        cat_id: catId,
      }
    );
    return response.data;
  },

  // Complete mission
  complete: async (id: number): Promise<Mission> => {
    const response: AxiosResponse<Mission> = await api.patch(
      `/api/missions/${id}/complete`
    );
    return response.data;
  },

  // Delete mission
  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/missions/${id}`);
  },
};

// Targets API
export const targetsApi = {
  // Get all targets (optionally by mission)
  getAll: async (missionId?: string): Promise<Target[]> => {
    const url = missionId
      ? `/api/targets/?mission_id=${missionId}`
      : "/api/targets/";
    const response: AxiosResponse<Target[]> = await api.get(url);
    return response.data;
  },

  // Get targets by mission (backward compatibility)
  getByMission: async (missionId: number): Promise<Target[]> => {
    const response: AxiosResponse<Target[]> = await api.get(
      `/api/targets/?mission_id=${missionId}`
    );
    return response.data;
  },

  // Get target by ID
  getById: async (id: string): Promise<Target> => {
    const response: AxiosResponse<Target> = await api.get(`/api/targets/${id}`);
    return response.data;
  },

  // Create new target
  create: async (data: TargetCreateData): Promise<Target> => {
    const response: AxiosResponse<Target> = await api.post(
      "/api/targets/",
      data
    );
    return response.data;
  },

  // Update target
  update: async (id: string, data: TargetUpdateData): Promise<Target> => {
    const response: AxiosResponse<Target> = await api.put(
      `/api/targets/${id}`,
      data
    );
    return response.data;
  },

  // Update target notes (backward compatibility)
  updateNotes: async (id: string, notes: string): Promise<Target> => {
    const response: AxiosResponse<Target> = await api.patch(
      `/api/targets/${id}/notes`,
      { notes }
    );
    return response.data;
  },

  // Complete target
  complete: async (id: string): Promise<Target> => {
    const response: AxiosResponse<Target> = await api.patch(
      `/api/targets/${id}/complete`
    );
    return response.data;
  },

  // Delete target
  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/targets/${id}`);
  },
};

export default api;
