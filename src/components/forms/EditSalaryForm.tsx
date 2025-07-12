'use client'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { spyCatUpdateSchema, type SpyCatUpdateForm } from '@/lib/validations';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useUpdateSpyCat } from '@/hooks/useSpyCats';
import { SpyCat } from '@/types';
import { Check, X, Loader2, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/lib/validations';

interface EditSalaryFormProps {
  cat: SpyCat;
  onSuccess?: (cat: SpyCat) => void;
  onCancel?: () => void;
}

export default function EditSalaryForm({ cat, onSuccess, onCancel }: EditSalaryFormProps) {
  const updateSpyCatMutation = useUpdateSpyCat();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset
  } = useForm<SpyCatUpdateForm>({
    resolver: zodResolver(spyCatUpdateSchema),
    defaultValues: {
      salary: cat.salary,
    },
  });

  const currentSalary = watch('salary');
  const salaryDifference = currentSalary - cat.salary;
  const salaryChangePercentage = ((salaryDifference / cat.salary) * 100);

  const onSubmit = async (data: SpyCatUpdateForm) => {
    try {
      const updatedCat = await updateSpyCatMutation.mutateAsync({
        id: cat.id,
        updates: data,
      });
      onSuccess?.(updatedCat);
    } catch (error) {
      console.error('Error updating salary:', error);
    }
  };

  const isLoading = isSubmitting || updateSpyCatMutation.isPending;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 shadow-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <DollarSign className="w-5 h-5 text-spy-gold" />
          <h3 className="text-lg font-semibold text-white">
            Edit Salary - {cat.name}
          </h3>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-spy-light">
            New Salary (R$)
          </label>
          <Input
            type="number"
            min="1"
            step="1000"
            placeholder="New salary"
            error={errors.salary?.message}
            {...register('salary', { valueAsNumber: true })}
          />
        </div>

        {/* Salary Comparison */}
        {currentSalary && currentSalary !== cat.salary && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="p-3 bg-white/5 rounded-lg border border-white/10"
          >
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-spy-light">Current Salary:</span>
                <span className="text-white font-medium">
                  {formatCurrency(cat.salary)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-spy-light">New Salary:</span>
                <span className="text-white font-medium">
                  {formatCurrency(currentSalary)}
                </span>
              </div>
              <hr className="border-white/10" />
              <div className="flex justify-between">
                <span className="text-spy-light">Difference:</span>
                <span
                  className={`font-medium ${
                    salaryDifference > 0
                      ? 'text-green-400'
                      : salaryDifference < 0
                      ? 'text-red-400'
                      : 'text-gray-400'
                  }`}
                >
                  {salaryDifference > 0 ? '+' : ''}
                  {formatCurrency(salaryDifference)}
                  {salaryDifference !== 0 && (
                    <span className="ml-1 text-xs">
                      ({salaryChangePercentage > 0 ? '+' : ''}
                      {salaryChangePercentage.toFixed(1)}%)
                    </span>
                  )}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {updateSpyCatMutation.isError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg"
          >
            <p className="text-red-200 text-sm">
              {updateSpyCatMutation.error?.message || 'Error updating salary'}
            </p>
          </motion.div>
        )}

        <div className="flex gap-2 pt-2">
          <Button
            type="submit"
            size="sm"
            disabled={isLoading || currentSalary === cat.salary}
            className="flex-1"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Check className="w-4 h-4 mr-1" />
                Save
              </>
            )}
          </Button>

          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onCancel}
            disabled={isLoading}
          >
            <X className="w-4 h-4 mr-1" />
            Cancel
          </Button>
        </div>
      </form>
    </motion.div>
  );
}