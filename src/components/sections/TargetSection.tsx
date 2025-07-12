"use client";

import { useState } from "react";
import { Target } from "@/types";
import { TargetList, TargetForm } from "@/components/targets";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

interface TargetSectionProps {
  onCompleteTarget: (target: Target) => void;
  onDeleteTarget: (target: Target) => void;
}

export function TargetSection({
  onCompleteTarget,
  onDeleteTarget,
}: TargetSectionProps) {
  const [showTargetForm, setShowTargetForm] = useState(false);

  const handleTargetAdded = () => {
    setShowTargetForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Targets</h1>
          <p className="text-muted-foreground">
            Manage mission targets and track their status
          </p>
        </div>
        <Button onClick={() => setShowTargetForm(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Target
        </Button>
      </div>

      <div className="max-w-none">
        <TargetList
          onComplete={onCompleteTarget}
          onDelete={onDeleteTarget}
          onAdd={() => setShowTargetForm(true)}
        />
      </div>

      {/* Target Form Dialog */}
      <Dialog open={showTargetForm} onOpenChange={setShowTargetForm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Target</DialogTitle>
          </DialogHeader>
          <TargetForm onSuccess={handleTargetAdded} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
