import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { missionsApi } from "@/services/api";
import type { MissionCreateData } from "@/types";

// Query keys
export const missionKeys = {
  all: ["missions"] as const,
  lists: () => [...missionKeys.all, "list"] as const,
  list: (filters = {}) => [...missionKeys.lists(), filters] as const,
  details: () => [...missionKeys.all, "detail"] as const,
  detail: (id: number) => [...missionKeys.details(), id] as const,
};

// Get all missions
export const useMissions = () => {
  return useQuery({
    queryKey: missionKeys.list(),
    queryFn: missionsApi.getAll,
    staleTime: 3 * 60 * 1000, // 3 minutes
  });
};

// Get mission by ID
export const useMission = (id: number) => {
  return useQuery({
    queryKey: missionKeys.detail(id),
    queryFn: () => missionsApi.getById(id),
    enabled: !!id,
  });
};

// Create mission mutation
export const useCreateMission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MissionCreateData) => missionsApi.create(data),
    onSuccess: (newMission) => {
      queryClient.invalidateQueries({ queryKey: missionKeys.all });

      toast.success(
        `Mission created with ${newMission.targets.length} targets!`
      );
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create mission");
    },
  });
};

// Assign cat to mission mutation
export const useAssignCatToMission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ missionId, catId }: { missionId: number; catId: number }) =>
      missionsApi.assignCat(missionId, catId),
    onSuccess: (updatedMission) => {
      queryClient.setQueryData(
        missionKeys.detail(updatedMission.id),
        updatedMission
      );
      queryClient.invalidateQueries({ queryKey: missionKeys.lists() });

      toast.success("Agent assigned to mission successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to assign agent to mission");
    },
  });
};

// Complete mission mutation
export const useCompleteMission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => missionsApi.complete(id),
    onSuccess: (completedMission) => {
      queryClient.setQueryData(
        missionKeys.detail(completedMission.id),
        completedMission
      );
      queryClient.invalidateQueries({ queryKey: missionKeys.lists() });

      toast.success("Mission completed successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to complete mission");
    },
  });
};

// Delete mission mutation
export const useDeleteMission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => missionsApi.delete(id),
    onSuccess: (_, deletedId) => {
      queryClient.removeQueries({ queryKey: missionKeys.detail(deletedId) });
      queryClient.invalidateQueries({ queryKey: missionKeys.lists() });

      toast.success("Mission deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete mission");
    },
  });
};
