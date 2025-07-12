import React from "react";
import { Target } from "@/types";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { MapPin, Calendar, FileText, Target as TargetIcon } from "lucide-react";

interface TargetDetailProps {
  target: Target;
}

export function TargetDetail({ target }: TargetDetailProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <TargetIcon className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">{target.name}</h3>
        <Badge variant={target.complete ? "destructive" : "secondary"}>
          {target.complete ? "Eliminated" : "In Progress"}
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="flex items-center space-x-2 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">Location:</span>
          <span>{target.country}</span>
        </div>

        <div className="flex items-center space-x-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">Created:</span>
          <span>
            {target.created_at ? formatDate(target.created_at) : "Unknown"}
          </span>
        </div>

        {target.updated_at && (
          <div className="flex items-center space-x-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Last Updated:</span>
            <span>{formatDate(target.updated_at)}</span>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium text-sm">Notes:</span>
        </div>
        <div className="bg-muted p-3 rounded-md text-sm">
          {target.notes || "No additional notes available."}
        </div>
      </div>

      {target.complete && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
          <div className="text-sm text-red-700 dark:text-red-300">
            <strong>Status:</strong> This target has been eliminated.
          </div>
        </div>
      )}
    </div>
  );
}
