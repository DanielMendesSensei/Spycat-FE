import React from "react";
import { Mission } from "@/types";
import { useMissions } from "@/hooks/useMissions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Edit, Play, CheckCircle, Plus, Trash2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface MissionListProps {
  onEdit?: (mission: Mission) => void;
  onView?: (mission: Mission) => void;
  onStart?: (mission: Mission) => void;
  onComplete?: (mission: Mission) => void;
  onDelete?: (mission: Mission) => void;
  onAdd?: () => void;
}

export function MissionList({
  onEdit,
  onView,
  onStart,
  onComplete,
  onDelete,
  onAdd,
}: MissionListProps) {
  const { data: missions, isLoading, error } = useMissions();

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <Spinner className="mr-2" />
          <span>Loading missions...</span>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-500">
            Error loading missions: {error.message}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col h-[600px]">
      <CardHeader className="flex flex-row items-center justify-between flex-shrink-0">
        <CardTitle>Missions ({missions?.length || 0})</CardTitle>
        {onAdd && (
          <Button onClick={onAdd} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Create Mission
          </Button>
        )}
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        {!missions || missions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No missions found
          </div>
        ) : (
          <div className="h-full overflow-y-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-background z-10">
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Spy Cat</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {missions.map((mission) => (
                  <TableRow key={mission.id}>
                    <TableCell className="font-mono text-sm">
                      {mission.id}
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">
                        {typeof mission.cat === "string"
                          ? mission.cat || "Unassigned"
                          : mission.cat?.name || "Unassigned"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={mission.complete ? "success" : "warning"}>
                        {mission.complete ? "Completed" : "In Progress"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {mission.created_at
                        ? formatDate(mission.created_at)
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {onView && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onView(mission)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}
                        {onEdit && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(mission)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                        {!mission.complete && onComplete && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onComplete(mission)}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                        {!mission.cat && onStart && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onStart(mission)}
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                        )}
                        {onDelete && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDelete(mission)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
