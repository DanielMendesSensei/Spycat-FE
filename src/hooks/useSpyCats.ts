/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { spyCatsApi } from "@/services/api";
import type {
  SpyCatCreateData,
  SpyCatUpdateData,
  SearchFilters,
} from "@/types";

// Query keys
export const spyCatKeys = {
  all: ["spyCats"] as const,
  lists: () => [...spyCatKeys.all, "list"] as const,
  list: (filters: SearchFilters = {}) =>
    [...spyCatKeys.lists(), filters] as const,
  details: () => [...spyCatKeys.all, "detail"] as const,
  detail: (id: number) => [...spyCatKeys.details(), id] as const,
  available: () => [...spyCatKeys.all, "available"] as const,
  stats: () => [...spyCatKeys.all, "stats"] as const,
  search: (query: string) => [...spyCatKeys.all, "search", query] as const,
};

// Get all spy cats
export const useSpyCats = (filters?: SearchFilters) => {
  return useQuery({
    queryKey: spyCatKeys.list(filters),
    queryFn: () => spyCatsApi.getAll(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get spy cat by ID
export const useSpyCat = (id: number) => {
  return useQuery({
    queryKey: spyCatKeys.detail(id),
    queryFn: () => spyCatsApi.getById(id),
    enabled: !!id,
  });
};

// Get available spy cats
export const useAvailableSpyCats = () => {
  return useQuery({
    queryKey: spyCatKeys.available(),
    queryFn: spyCatsApi.getAvailable,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Get spy cat statistics
export const useSpyCatStats = () => {
  return useQuery({
    queryKey: spyCatKeys.stats(),
    queryFn: spyCatsApi.getStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Search spy cats
export const useSearchSpyCats = (query: string) => {
  return useQuery({
    queryKey: spyCatKeys.search(query),
    queryFn: () => spyCatsApi.search(query),
    enabled: !!query && query.length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Create spy cat mutation
export const useCreateSpyCat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SpyCatCreateData) => spyCatsApi.create(data),
    onSuccess: (newCat) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: spyCatKeys.all });

      toast.success(`Agent ${newCat.name} has been successfully recruited!`, {
        duration: 4000,
      });
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to create spy cat";
      toast.error(message);
    },
  });
};

// Update spy cat mutation
export const useUpdateSpyCat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: SpyCatUpdateData }) =>
      spyCatsApi.update(id, data),
    onSuccess: (updatedCat) => {
      // Update the cache
      queryClient.setQueryData(spyCatKeys.detail(updatedCat.id), updatedCat);

      // Invalidate lists to ensure consistency
      queryClient.invalidateQueries({ queryKey: spyCatKeys.lists() });
      queryClient.invalidateQueries({ queryKey: spyCatKeys.stats() });

      toast.success(`Agent ${updatedCat.name}'s salary has been updated!`);
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to update spy cat";
      toast.error(message);
    },
  });
};

// Delete spy cat mutation
export const useDeleteSpyCat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => spyCatsApi.delete(id),
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: spyCatKeys.detail(deletedId) });

      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: spyCatKeys.lists() });
      queryClient.invalidateQueries({ queryKey: spyCatKeys.stats() });

      toast.success("Agent has been retired from service");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to delete spy cat";
      toast.error(message);
    },
  });
};
