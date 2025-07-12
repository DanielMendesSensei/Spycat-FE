"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Users, Target, Crosshair, Home } from "lucide-react";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sidebarItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: Home,
    description: "Overview & Stats",
  },
  {
    id: "spy-cats",
    label: "Spy Cats",
    icon: Users,
    description: "Manage Agents",
  },
  {
    id: "missions",
    label: "Missions",
    icon: Target,
    description: "Active Operations",
  },
  {
    id: "targets",
    label: "Targets",
    icon: Crosshair,
    description: "Mission Targets",
  },
];

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <div className="w-64 h-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-r border-border/50">
      <div className="p-6">
        {/* Logo */}
        <div className="flex items-center mb-8">
          <Shield className="h-8 w-8 text-blue-500 mr-3" />
          <div>
            <h2 className="text-lg font-bold text-primary">Spy Cat</h2>
            <p className="text-xs text-muted-foreground">Agency</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start h-auto p-3 text-left transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "hover:bg-muted/80"
                )}
                onClick={() => onSectionChange(item.id)}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 mr-3 flex-shrink-0",
                    isActive
                      ? "text-primary-foreground"
                      : "text-muted-foreground"
                  )}
                />
                <div className="flex-1 min-w-0">
                  <div
                    className={cn(
                      "font-medium text-sm",
                      isActive ? "text-primary-foreground" : "text-foreground"
                    )}
                  >
                    {item.label}
                  </div>
                  <div
                    className={cn(
                      "text-xs truncate",
                      isActive
                        ? "text-primary-foreground/80"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.description}
                  </div>
                </div>
              </Button>
            );
          })}
        </nav>

        {/* Stats Card */}
        <Card className="mt-8 p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border-blue-200 dark:border-blue-800">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              94%
            </div>
            <div className="text-xs text-blue-600/80 dark:text-blue-400/80">
              Mission Success Rate
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
