"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateTarget, useUpdateTarget } from "@/hooks/useTargets";
import type { Target, TargetCreateData, TargetUpdateData } from "@/types";

// Validation schema
const targetSchema = z.object({
  name: z.string().min(1, "Target name is required").max(100, "Name too long"),
  country: z
    .string()
    .min(1, "Country is required")
    .max(100, "Country too long"),
  notes: z.string().max(1000, "Notes too long").optional(),
});

type TargetFormData = z.infer<typeof targetSchema>;

interface TargetFormProps {
  target?: Target;
  missionId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function TargetForm({
  target,
  missionId,
  onSuccess,
  onCancel,
}: TargetFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createTarget = useCreateTarget();
  const updateTarget = useUpdateTarget();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TargetFormData>({
    resolver: zodResolver(targetSchema),
    defaultValues: {
      name: target?.name || "",
      country: target?.country || "",
      notes: target?.notes || "",
    },
  });

  const onSubmit = async (data: TargetFormData) => {
    setIsSubmitting(true);
    try {
      if (target) {
        // Update existing target
        const updateData: TargetUpdateData = {
          notes: data.notes || "",
        };
        await updateTarget.mutateAsync({
          id: target.id.toString(),
          data: updateData,
        });
      } else {
        // Create new target
        const createData: TargetCreateData = {
          name: data.name.trim(),
          country: data.country.trim(),
          notes: data.notes?.trim() || "",
        };

        if (missionId) {
          createData.mission_id = parseInt(missionId);
        }

        await createTarget.mutateAsync(createData);
      }

      reset();
      onSuccess?.();
    } catch (error) {
      console.error("Failed to save target:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="text-sm font-medium">Target Name *</label>
        <Input
          {...register("name")}
          placeholder="Enter target name"
          className="mt-1"
          disabled={!!target} // Can't edit name of existing target
        />
        {errors.name && (
          <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium">Country *</label>
        <Input
          {...register("country")}
          placeholder="Target location"
          className="mt-1"
          disabled={!!target} // Can't edit country of existing target
        />
        {errors.country && (
          <p className="mt-1 text-sm text-destructive">
            {errors.country.message}
          </p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium">Notes</label>
        <Textarea
          {...register("notes")}
          placeholder="Additional information about the target..."
          rows={4}
          className="mt-1"
        />
        {errors.notes && (
          <p className="mt-1 text-sm text-destructive">
            {errors.notes.message}
          </p>
        )}
      </div>

      {target && (
        <div className="text-sm text-muted-foreground bg-muted p-3 rounded">
          <p>
            <strong>Note:</strong> Only notes can be edited for existing
            targets.
          </p>
        </div>
      )}

      <div className="flex justify-end space-x-3 pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary hover:bg-primary/90"
        >
          {isSubmitting
            ? "Saving..."
            : target
              ? "Update Target"
              : "Create Target"}
        </Button>
      </div>
    </form>
  );
}
