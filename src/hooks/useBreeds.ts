import { useQuery } from "@tanstack/react-query";
import { Breed } from "@/types";

// Fallback breed data since backend doesn't have a breeds endpoint
const FALLBACK_BREEDS: Breed[] = [
  { id: "1", name: "Persian" },
  { id: "2", name: "Siamese" },
  { id: "3", name: "Maine Coon" },
  { id: "4", name: "British Shorthair" },
  { id: "5", name: "Ragdoll" },
  { id: "6", name: "Russian Blue" },
  { id: "7", name: "Scottish Fold" },
  { id: "8", name: "Bengal" },
  { id: "9", name: "Abyssinian" },
  { id: "10", name: "Sphynx" },
];

export function useBreeds() {
  return useQuery({
    queryKey: ["breeds"],
    queryFn: async (): Promise<Breed[]> => {
      // Simulate API delay for consistency
      await new Promise((resolve) => setTimeout(resolve, 100));
      return FALLBACK_BREEDS;
    },
    staleTime: Infinity, // Breeds don't change frequently
    retry: 0, // No need to retry since it's static data
  });
}
