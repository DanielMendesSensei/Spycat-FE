import React from "react";
import { SpyCat } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/validations";
import { formatDate } from "@/lib/utils";

interface SpyCatDetailProps {
  spyCat: SpyCat;
}

export function SpyCatDetail({ spyCat }: SpyCatDetailProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{spyCat.name}</span>
          <Badge variant="secondary">{spyCat.breed}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-sm text-muted-foreground">
              Experience
            </h4>
            <p className="text-lg">
              {spyCat.years_of_experience} year
              {spyCat.years_of_experience !== 1 ? "s" : ""}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-muted-foreground">
              Salary
            </h4>
            <p className="text-lg">{formatCurrency(spyCat.salary)}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-sm text-muted-foreground">
              Created
            </h4>
            <p className="text-sm">
              {spyCat.created_at ? formatDate(spyCat.created_at) : "N/A"}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-muted-foreground">
              Last Updated
            </h4>
            <p className="text-sm">
              {spyCat.updated_at ? formatDate(spyCat.updated_at) : "N/A"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
