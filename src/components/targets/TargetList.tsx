import React from "react";
import { Target } from "@/types";
import { useTargetsByMission } from "@/hooks/useTargets";
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
import {
  Eye,
  Edit,
  Trash2,
  Plus,
  Target as TargetIcon,
  CheckCircle,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

interface TargetListProps {
  missionId?: string;
  onEdit?: (target: Target) => void;
  onView?: (target: Target) => void;
  onDelete?: (target: Target) => void;
  onComplete?: (target: Target) => void;
  onAdd?: () => void;
}

export function TargetList({
  missionId,
  onEdit,
  onView,
  onDelete,
  onComplete,
  onAdd,
}: TargetListProps) {
  const { data: targets, isLoading, error } = useTargetsByMission(missionId);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <Spinner className="mr-2" />
          <span>Loading targets...</span>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-500">
            Error loading targets: {error.message}
          </div>
        </CardContent>
      </Card>
    );
  }

  const getStatusBadge = (target: Target) => {
    if (target.complete) {
      return <Badge variant="destructive">Eliminated</Badge>;
    }
    return <Badge variant="secondary">In Progress</Badge>;
  };

  return (
    <Card className="flex flex-col h-[600px]">
      <CardHeader className="flex flex-row items-center justify-between flex-shrink-0">
        <CardTitle className="flex items-center">
          <TargetIcon className="mr-2 h-5 w-5" />
          Targets ({targets?.length || 0})
        </CardTitle>
        {onAdd && (
          <Button onClick={onAdd} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Target
          </Button>
        )}
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        {!targets || targets.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No targets found
          </div>
        ) : (
          <div className="h-full overflow-y-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-background z-10">
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {targets.map((target: Target) => (
                  <TableRow key={target.id}>
                    <TableCell className="font-medium">{target.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{target.country}</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(target)}</TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {target.notes || "No notes"}
                    </TableCell>
                    <TableCell>
                      {target.created_at
                        ? formatDate(target.created_at)
                        : "Unknown"}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {onView && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onView(target)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}
                        {onEdit && !target.complete && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(target)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                        {onDelete && !target.complete && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDelete(target)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                        {onComplete && !target.complete && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onComplete(target)}
                          >
                            <CheckCircle className="h-4 w-4" />
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
