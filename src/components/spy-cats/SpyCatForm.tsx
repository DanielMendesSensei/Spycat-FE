import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SpyCat, SpyCatCreateData, SpyCatUpdateData, Breed } from "@/types";
import { spyCatCreateSchema, spyCatUpdateSchema } from "@/lib/validations";
import { useCreateSpyCat, useUpdateSpyCat } from "@/hooks/useSpyCats";
import { useBreeds } from "@/hooks/useBreeds";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

interface SpyCatFormProps {
  spyCat?: SpyCat;
  onSuccess?: (spyCat: SpyCat) => void;
  onCancel?: () => void;
}

export function SpyCatForm({ spyCat, onSuccess, onCancel }: SpyCatFormProps) {
  const isEditing = !!spyCat;
  const { data: breeds, isLoading: breedsLoading } = useBreeds();

  const form = useForm<SpyCatCreateData | SpyCatUpdateData>({
    resolver: zodResolver(isEditing ? spyCatUpdateSchema : spyCatCreateSchema),
    defaultValues: spyCat
      ? {
          name: spyCat.name,
          years_of_experience: spyCat.years_of_experience,
          breed: spyCat.breed,
          salary: spyCat.salary,
        }
      : {
          name: "",
          years_of_experience: 0,
          breed: "",
          salary: 0,
        },
  });

  const createMutation = useCreateSpyCat();
  const updateMutation = useUpdateSpyCat();

  const onSubmit = async (data: SpyCatCreateData | SpyCatUpdateData) => {
    try {
      let result: SpyCat;

      if (isEditing && spyCat) {
        result = await updateMutation.mutateAsync({
          id: spyCat.id,
          data: data as SpyCatUpdateData,
        });
      } else {
        result = await createMutation.mutateAsync(data as SpyCatCreateData);
      }

      onSuccess?.(result);
    } catch (error) {
      console.error("Error saving spy cat:", error);
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  if (breedsLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <Spinner className="mr-2" />
          <span>Loading breeds...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Spy Cat" : "Add New Spy Cat"}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter spy cat name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="years_of_experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Years of Experience</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter years of experience"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="breed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Breed</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      {...field}
                    >
                      <option value="">Select a breed</option>
                      {breeds?.map((breed: Breed) => (
                        <option key={breed.id} value={breed.name}>
                          {breed.name}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter salary"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2">
              {onCancel && (
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
              )}
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Spinner className="mr-2 h-4 w-4" />}
                {isEditing ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
