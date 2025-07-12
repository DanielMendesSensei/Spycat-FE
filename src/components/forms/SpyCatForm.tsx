'use client'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { spyCatCreateSchema, type SpyCatCreateForm } from '@/lib/validations';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { useCreateSpyCat } from '@/hooks/useSpyCats';
import { SpyCat } from '@/types';
import { Save, X, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface SpyCatFormProps {
  onSuccess?: (cat: SpyCat) => void;
  onCancel?: () => void;
}

export default function SpyCatForm({ onSuccess, onCancel }: SpyCatFormProps) {
  const createSpyCatMutation = useCreateSpyCat();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm<SpyCatCreateForm>({
    resolver: zodResolver(spyCatCreateSchema),
    defaultValues: {
      name: '',
      years_of_experience: 0,
      breed: '',
      salary: 0,
    },
  });

  const onSubmit = async (data: SpyCatCreateForm) => {
    try {
      const newCat = await createSpyCatMutation.mutateAsync(data);
      reset();
      onSuccess?.(newCat);
    } catch (error) {
      console.error('Error creating spy cat:', error);
    }
  };

  const isLoading = isSubmitting || createSpyCatMutation.isPending;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">New Spy Agent</h2>
          {onCancel && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onCancel}
              disabled={isLoading}
            >
              <X className="w-5 h-5" />
            </Button>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Agent Name *"
            placeholder="Ex: Agent Whiskers"
            error={errors.name?.message}
            {...register('name')}
          />

          <Input
            label="Breed *"
            placeholder="Ex: Siamese, Persian, Maine Coon"
            error={errors.breed?.message}
            {...register('breed')}
          />

          <Input
            label="Years of Experience"
            type="number"
            min="0"
            max="30"
            placeholder="0"
            error={errors.years_of_experience?.message}
            {...register('years_of_experience', { valueAsNumber: true })}
          />

          <Input
            label="Annual Salary (R$) *"
            type="number"
            min="1"
            step="1000"
            placeholder="50000"
            error={errors.salary?.message}
            {...register('salary', { valueAsNumber: true })}
          />

          {createSpyCatMutation.isError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg"
            >
              <p className="text-red-200 text-sm">
                {createSpyCatMutation.error?.message || 'Error creating spy cat'}
              </p>
            </motion.div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Add Agent
                </>
              )}
            </Button>

            {onCancel && (
              <Button
                type="button"
                variant="secondary"
                onClick={onCancel}
                disabled={isLoading}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>

        {/* Form Preview */}
        {watch('name') && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10"
          >
            <h3 className="text-sm font-medium text-spy-gold mb-2">Preview:</h3>
            <div className="text-sm text-spy-light space-y-1">
              <p><span className="text-white">Name:</span> {watch('name')}</p>
              <p><span className="text-white">Breed:</span> {watch('breed') || 'Not informed'}</p>
              <p><span className="text-white">Experience:</span> {watch('years_of_experience')} years</p>
              <p><span className="text-white">Salary:</span> R$ {watch('salary')?.toLocaleString('pt-BR') || '0'}</p>
            </div>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
}