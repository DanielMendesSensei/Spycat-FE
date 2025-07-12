"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Target } from "lucide-react";
import { useCreateMission } from "@/hooks/useMissions";
import type { MissionCreateData } from "@/types";

// Validation schema
const targetSchema = z.object({
  name: z.string().min(1, "Target name is required").max(100, "Name too long"),
  country: z
    .string()
    .min(1, "Country is required")
    .max(100, "Country too long"),
  notes: z.string().max(1000, "Notes too long").optional(),
});

const missionSchema = z.object({
  targets: z
    .array(targetSchema)
    .min(1, "At least one target is required")
    .max(3, "Maximum 3 targets allowed")
    .refine(
      (targets) => {
        const names = targets.map((t) => t.name.toLowerCase().trim());
        return names.length === new Set(names).size;
      },
      {
        message: "Target names must be unique",
      }
    ),
});

type MissionFormData = z.infer<typeof missionSchema>;

interface MissionFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function MissionForm({ onSuccess, onCancel }: MissionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createMission = useCreateMission();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MissionFormData>({
    resolver: zodResolver(missionSchema),
    defaultValues: {
      targets: [{ name: "", country: "", notes: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "targets",
  });

  const onSubmit = async (data: MissionFormData) => {
    setIsSubmitting(true);
    try {
      const missionData: MissionCreateData = {
        targets: data.targets.map((target) => ({
          name: target.name.trim(),
          country: target.country.trim(),
          notes: target.notes?.trim() || "",
        })),
      };

      await createMission.mutateAsync(missionData);
      reset();
      onSuccess?.();
    } catch (error) {
      console.error("Failed to create mission:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addTarget = () => {
    if (fields.length < 3) {
      append({ name: "", country: "", notes: "" });
    }
  };

  const removeTarget = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium flex items-center">
            <Target className="mr-2 h-5 w-5" />
            Mission Targets ({fields.length}/3)
          </h3>
          {fields.length < 3 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addTarget}
              className="text-xs"
            >
              <Plus className="mr-1 h-3 w-3" />
              Add Target
            </Button>
          )}
        </div>

        {fields.map((field, index) => (
          <Card key={field.id} className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center justify-between">
                Target {index + 1}
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeTarget(index)}
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Name *</label>
                <Input
                  {...register(`targets.${index}.name`)}
                  placeholder="Target codename"
                  className="mt-1"
                />
                {errors.targets?.[index]?.name && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.targets[index]?.name?.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">Country *</label>
                <Input
                  {...register(`targets.${index}.country`)}
                  placeholder="Target location"
                  className="mt-1"
                />
                {errors.targets?.[index]?.country && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.targets[index]?.country?.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">Notes</label>
                <Textarea
                  {...register(`targets.${index}.notes`)}
                  placeholder="Additional information about the target..."
                  rows={3}
                  className="mt-1"
                />
                {errors.targets?.[index]?.notes && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.targets[index]?.notes?.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {errors.targets && typeof errors.targets.message === "string" && (
          <p className="text-sm text-destructive">{errors.targets.message}</p>
        )}
      </div>

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
          {isSubmitting ? "Creating..." : "Create Mission"}
        </Button>
      </div>
    </form>
  );
}
