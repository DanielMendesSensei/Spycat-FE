import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { targetsApi } from "@/services/api";
import type { TargetCreateData, TargetUpdateData } from "@/types";

// Query keys
export const targetKeys = {
  all: ["targets"] as const,
  lists: () => [...targetKeys.all, "list"] as const,
  list: (missionId?: string) =>
    missionId
      ? [...targetKeys.lists(), "mission", missionId]
      : [...targetKeys.lists()],
  details: () => [...targetKeys.all, "detail"] as const,
  detail: (id: string) => [...targetKeys.details(), id] as const,
};

// Get all targets (optionally filtered by mission)
export const useTargets = (missionId?: string) => {
  return useQuery({
    queryKey: targetKeys.list(missionId),
    queryFn: () => targetsApi.getAll(missionId),
    staleTime: 3 * 60 * 1000, // 3 minutes
  });
};

// Get targets by mission (backward compatibility)
export const useTargetsByMission = (missionId?: number) => {
  return useQuery({
    queryKey: targetKeys.list(missionId?.toString()),
    queryFn: () => targetsApi.getAll(missionId?.toString()),
    enabled: !!missionId,
    staleTime: 3 * 60 * 1000, // 3 minutes
  });
};

// Get target by ID
export const useTarget = (id: string) => {
  return useQuery({
    queryKey: targetKeys.detail(id),
    queryFn: () => targetsApi.getById(id),
    enabled: !!id,
  });
};

// Create target mutation
export const useCreateTarget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TargetCreateData) => targetsApi.create(data),
    onSuccess: (newTarget) => {
      // Invalidate all target lists since we don't know which mission this belongs to
      queryClient.invalidateQueries({
        queryKey: targetKeys.lists(),
      });

      toast.success(`Target ${newTarget.name} has been created!`);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create target");
    },
  });
};

// Update target mutation
export const useUpdateTarget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: TargetUpdateData }) =>
      targetsApi.update(id, data),
    onSuccess: (updatedTarget) => {
      queryClient.setQueryData(
        targetKeys.detail(updatedTarget.id.toString()),
        updatedTarget
      );
      queryClient.invalidateQueries({
        queryKey: targetKeys.lists(),
      });

      toast.success("Target updated successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update target");
    },
  });
};

// Update target notes mutation (backward compatibility)
export const useUpdateTargetNotes = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, notes }: { id: number; notes: string }) =>
      targetsApi.updateNotes(id.toString(), notes),
    onSuccess: (updatedTarget) => {
      queryClient.setQueryData(
        targetKeys.detail(updatedTarget.id.toString()),
        updatedTarget
      );
      queryClient.invalidateQueries({
        queryKey: targetKeys.lists(),
      });

      toast.success("Target notes updated successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update target notes");
    },
  });
};

// Complete target mutation
export const useCompleteTarget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => targetsApi.complete(id),
    onSuccess: (completedTarget) => {
      queryClient.setQueryData(
        targetKeys.detail(completedTarget.id.toString()),
        completedTarget
      );
      queryClient.invalidateQueries({
        queryKey: targetKeys.lists(),
      });

      toast.success(`Target ${completedTarget.name} marked as eliminated!`);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to complete target");
    },
  });
};

// Delete target mutation
export const useDeleteTarget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => targetsApi.delete(id),
    onSuccess: (_, deletedId) => {
      queryClient.removeQueries({ queryKey: targetKeys.detail(deletedId) });
      queryClient.invalidateQueries({ queryKey: targetKeys.lists() });

      toast.success("Target deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete target");
    },
  });
};
