'use client'

import { useState } from 'react';
import { SpyCat } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import EditSalaryForm from '@/components/forms/EditSalaryForm';
import { useDeleteSpyCat } from '@/hooks/useSpyCats';
import { 
  Edit2, 
  Trash2, 
  DollarSign, 
  Calendar, 
  Award, 
  Target,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency, formatDate } from '@/lib/validations';
import toast from 'react-hot-toast';

interface SpyCatCardProps {
  cat: SpyCat;
  onUpdated?: (cat: SpyCat) => void;
  onDeleted?: (id: number) => void;
}

export default function SpyCatCard({ cat, onUpdated, onDeleted }: SpyCatCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const deleteSpyCatMutation = useDeleteSpyCat();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditSuccess = (updatedCat: SpyCat) => {
    setIsEditing(false);
    onUpdated?.(updatedCat);
    toast.success('Salary updated successfully!');
  };

  const handleEditCancel = () => {
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteSpyCatMutation.mutateAsync(cat.id);
      onDeleted?.(cat.id);
      toast.success(`${cat.name} was removed from the agency`);
    } catch (error) {
      toast.error('Error deleting agent');
    }
    setShowDeleteConfirm(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
  };

  const getExperienceLevel = (years: number) => {
    if (years === 0) return { label: 'Rookie', color: 'text-blue-400' };
    if (years <= 2) return { label: 'Junior', color: 'text-green-400' };
    if (years <= 5) return { label: 'Mid-level', color: 'text-yellow-400' };
    if (years <= 10) return { label: 'Senior', color: 'text-orange-400' };
    return { label: 'Veteran', color: 'text-red-400' };
  };

  const experienceLevel = getExperienceLevel(cat.years_of_experience);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      <Card className="hover:shadow-glass-hover transition-all duration-300 group">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-spy-gold transition-colors">
              {cat.name}
            </h3>
            <div className="flex items-center space-x-2">
              <span className="text-spy-gold font-semibold">{cat.breed}</span>
              <span className={`text-xs px-2 py-1 rounded-full bg-white/10 ${experienceLevel.color}`}>
                {experienceLevel.label}
              </span>
            </div>
          </div>
          
          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleEdit}
              disabled={isEditing || deleteSpyCatMutation.isPending}
              className="h-8 w-8"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDeleteClick}
              disabled={isEditing || deleteSpyCatMutation.isPending}
              className="h-8 w-8 text-red-400 hover:text-red-300"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-spy-light">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Experience</span>
            </div>
            <span className="text-white font-medium">
              {cat.years_of_experience} {cat.years_of_experience === 1 ? 'year' : 'years'}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-spy-light">
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4" />
              <span>Agent ID</span>
            </div>
            <span className="text-spy-gold font-mono">
              #{cat.id.toString().padStart(3, '0')}
            </span>
          </div>

          <div className="flex items-center justify-between text-spy-light">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4" />
              <span>Salary</span>
            </div>
            <span className="text-spy-gold font-semibold">
              {formatCurrency(cat.salary)}
            </span>
          </div>
        </div>

        {/* Additional Info */}
        <div className="pt-3 border-t border-white/10">
          <div className="flex items-center justify-between text-xs text-spy-light">
            <span>Created on {formatDate(cat.created_at)}</span>
            {cat.updated_at && (
              <span>Updated on {formatDate(cat.updated_at)}</span>
            )}
          </div>
        </div>

        {/* Mission Status */}
        <div className="mt-3 p-2 bg-white/5 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1">
              <Target className="w-4 h-4 text-spy-light" />
              <span className="text-spy-light">Status</span>
            </div>
            <span className="text-green-400 font-medium">
              Available
            </span>
          </div>
        </div>

        {/* Loading Overlay */}
        <AnimatePresence>
          {deleteSpyCatMutation.isPending && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl"
            >
              <div className="text-white text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-spy-gold mx-auto mb-2" />
                <p className="text-sm">Removing agent...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      {/* Edit Form Overlay */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10"
          >
            <EditSalaryForm
              cat={cat}
              onSuccess={handleEditSuccess}
              onCancel={handleEditCancel}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={handleDeleteCancel}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-spy-dark border border-red-500/30 rounded-xl p-6 max-w-md mx-4"
            >
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                <h3 className="text-lg font-semibold text-white">
                  Confirm Removal
                </h3>
              </div>
              
              <p className="text-spy-light mb-6">
                Are you sure you want to remove <span className="text-white font-medium">{cat.name}</span> from the agency? 
                This action cannot be undone.
              </p>

              <div className="flex gap-3">
                <Button
                  variant="destructive"
                  onClick={handleDeleteConfirm}
                  disabled={deleteSpyCatMutation.isPending}
                  className="flex-1"
                >
                  Yes, Remove
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleDeleteCancel}
                  disabled={deleteSpyCatMutation.isPending}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}