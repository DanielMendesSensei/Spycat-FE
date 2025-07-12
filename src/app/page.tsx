"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { SpyCat, Mission, Target } from "@/types";
import { Sidebar } from "@/components/Sidebar";
import {
  DashboardSection,
  SpyCatSection,
  MissionSection,
  TargetSection,
} from "@/components/sections";
import { Footer } from "@/components/Footer";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useDeleteSpyCat } from "@/hooks/useSpyCats";
import { useCompleteMission } from "@/hooks/useMissions";
import { useDeleteTarget, useCompleteTarget } from "@/hooks/useTargets";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function SpyCatDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    variant: "destructive" | "success" | "default";
    title: string;
    description: string;
    onConfirm: () => void;
  }>({
    open: false,
    variant: "default",
    title: "",
    description: "",
    onConfirm: () => {},
  });

  const deleteSpyCatMutation = useDeleteSpyCat();
  const completeMissionMutation = useCompleteMission();
  const deleteTargetMutation = useDeleteTarget();
  const completeTargetMutation = useCompleteTarget();

  const handleDeleteSpyCat = (spyCat: SpyCat) => {
    setConfirmDialog({
      open: true,
      variant: "destructive",
      title: "Delete Spy Cat",
      description: `Are you sure you want to delete ${spyCat.name}? This action cannot be undone.`,
      onConfirm: async () => {
        try {
          await deleteSpyCatMutation.mutateAsync(spyCat.id);
          setConfirmDialog((prev) => ({ ...prev, open: false }));
        } catch (error) {
          console.error("Error deleting spy cat:", error);
        }
      },
    });
  };

  const handleCompleteMission = (mission: Mission) => {
    setConfirmDialog({
      open: true,
      variant: "success",
      title: "Complete Mission",
      description: "Are you sure you want to mark this mission as complete?",
      onConfirm: async () => {
        try {
          await completeMissionMutation.mutateAsync(mission.id);
          setConfirmDialog((prev) => ({ ...prev, open: false }));
        } catch (error) {
          console.error("Error completing mission:", error);
        }
      },
    });
  };

  const handleDeleteTarget = (target: Target) => {
    setConfirmDialog({
      open: true,
      variant: "destructive",
      title: "Delete Target",
      description: `Are you sure you want to delete target "${target.name}"? This action cannot be undone.`,
      onConfirm: async () => {
        try {
          await deleteTargetMutation.mutateAsync(target.id);
          setConfirmDialog((prev) => ({ ...prev, open: false }));
        } catch (error) {
          console.error("Error deleting target:", error);
        }
      },
    });
  };

  const handleCompleteTarget = (target: Target) => {
    setConfirmDialog({
      open: true,
      variant: "success",
      title: "Complete Target",
      description: "Are you sure you want to mark this target as complete?",
      onConfirm: async () => {
        try {
          await completeTargetMutation.mutateAsync(target.id);
          setConfirmDialog((prev) => ({ ...prev, open: false }));
        } catch (error) {
          console.error("Error completing target:", error);
        }
      },
    });
  };

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardSection />;
      case "spy-cats":
        return <SpyCatSection onDeleteSpyCat={handleDeleteSpyCat} />;
      case "missions":
        return <MissionSection onCompleteMission={handleCompleteMission} />;
      case "targets":
        return (
          <TargetSection
            onCompleteTarget={handleCompleteTarget}
            onDeleteTarget={handleDeleteTarget}
          />
        );
      default:
        return <DashboardSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-purple-50 dark:from-violet-950 dark:via-blue-950 dark:to-purple-950 flex">
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6 overflow-auto">{renderSection()}</main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Confirm Dialog */}
      <ConfirmDialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog((prev) => ({ ...prev, open }))}
        variant={confirmDialog.variant}
        title={confirmDialog.title}
        description={confirmDialog.description}
        onConfirm={confirmDialog.onConfirm}
      />
    </div>
  );
}

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <SpyCatDashboard />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#1e293b",
            color: "#f1f5f9",
            border: "1px solid #334155",
          },
        }}
      />
    </QueryClientProvider>
  );
}
