"use client";

import { useState } from "react";
import { Mission } from "@/types";
import { MissionList, MissionForm } from "@/components/missions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

interface MissionSectionProps {
  onCompleteMission: (mission: Mission) => void;
}

export function MissionSection({ onCompleteMission }: MissionSectionProps) {
  const [showMissionForm, setShowMissionForm] = useState(false);

  const handleMissionAdded = () => {
    setShowMissionForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Missions</h1>
          <p className="text-muted-foreground">
            Plan and execute covert operations with your spy cats
          </p>
        </div>
        <Button onClick={() => setShowMissionForm(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Mission
        </Button>
      </div>

      <div className="max-w-none">
        <MissionList
          onComplete={onCompleteMission}
          onAdd={() => setShowMissionForm(true)}
        />
      </div>

      {/* Mission Form Dialog */}
      <Dialog open={showMissionForm} onOpenChange={setShowMissionForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Mission</DialogTitle>
          </DialogHeader>
          <MissionForm
            onSuccess={handleMissionAdded}
            onCancel={() => setShowMissionForm(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
