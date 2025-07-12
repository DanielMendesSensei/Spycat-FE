"use client";

import { useState } from "react";
import { SpyCat } from "@/types";
import { SpyCatList, SpyCatForm, SpyCatDetail } from "@/components/spy-cats";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

interface SpyCatSectionProps {
  onDeleteSpyCat: (spyCat: SpyCat) => void;
}

export function SpyCatSection({ onDeleteSpyCat }: SpyCatSectionProps) {
  const [showSpyCatForm, setShowSpyCatForm] = useState(false);
  const [selectedSpyCat, setSelectedSpyCat] = useState<SpyCat | null>(null);
  const [showSpyCatDetail, setShowSpyCatDetail] = useState(false);
  const [editingSpyCat, setEditingSpyCat] = useState<SpyCat | null>(null);

  const handleSpyCatAdded = () => {
    setShowSpyCatForm(false);
  };

  const handleSpyCatUpdated = () => {
    setEditingSpyCat(null);
  };

  const handleViewSpyCat = (spyCat: SpyCat) => {
    setSelectedSpyCat(spyCat);
    setShowSpyCatDetail(true);
  };

  const handleEditSpyCat = (spyCat: SpyCat) => {
    setEditingSpyCat(spyCat);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Spy Cats</h1>
          <p className="text-muted-foreground">
            Manage your elite feline operatives and their capabilities
          </p>
        </div>
        <Button onClick={() => setShowSpyCatForm(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Spy Cat
        </Button>
      </div>

      <div className="max-w-none">
        <SpyCatList
          onView={handleViewSpyCat}
          onEdit={handleEditSpyCat}
          onDelete={onDeleteSpyCat}
          onAdd={() => setShowSpyCatForm(true)}
        />
      </div>

      {/* Spy Cat Form Dialog */}
      <Dialog open={showSpyCatForm} onOpenChange={setShowSpyCatForm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Spy Cat</DialogTitle>
          </DialogHeader>
          <SpyCatForm
            onSuccess={handleSpyCatAdded}
            onCancel={() => setShowSpyCatForm(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Spy Cat Dialog */}
      <Dialog
        open={!!editingSpyCat}
        onOpenChange={() => setEditingSpyCat(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Spy Cat</DialogTitle>
          </DialogHeader>
          {editingSpyCat && (
            <SpyCatForm
              spyCat={editingSpyCat}
              onSuccess={handleSpyCatUpdated}
              onCancel={() => setEditingSpyCat(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Spy Cat Detail Dialog */}
      <Dialog open={showSpyCatDetail} onOpenChange={setShowSpyCatDetail}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Spy Cat Details</DialogTitle>
          </DialogHeader>
          {selectedSpyCat && <SpyCatDetail spyCat={selectedSpyCat} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
