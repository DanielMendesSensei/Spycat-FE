import React from "react";
import { SpyCat, SearchFilters } from "@/types";
import { useSpyCats } from "@/hooks/useSpyCats";
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
import { Eye, Edit, Trash2, Plus } from "lucide-react";
import { formatCurrency } from "@/lib/validations";

interface SpyCatListProps {
  filters?: SearchFilters;
  onEdit?: (spyCat: SpyCat) => void;
  onView?: (spyCat: SpyCat) => void;
  onDelete?: (spyCat: SpyCat) => void;
  onAdd?: () => void;
}

export function SpyCatList({
  filters,
  onEdit,
  onView,
  onDelete,
  onAdd,
}: SpyCatListProps) {
  const { data: spyCats, isLoading, error } = useSpyCats(filters);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <Spinner className="mr-2" />
          <span>Loading spy cats...</span>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-500">
            Error loading spy cats: {error.message}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col h-[600px]">
      <CardHeader className="flex flex-row items-center justify-between flex-shrink-0">
        <CardTitle>Spy Cats ({spyCats?.length || 0})</CardTitle>
        {onAdd && (
          <Button onClick={onAdd} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Spy Cat
          </Button>
        )}
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        {!spyCats || spyCats.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No spy cats found
          </div>
        ) : (
          <div className="h-full overflow-y-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-background z-10">
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Breed</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Salary</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {spyCats.map((spyCat) => (
                  <TableRow key={spyCat.id}>
                    <TableCell className="font-medium">{spyCat.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{spyCat.breed}</Badge>
                    </TableCell>
                    <TableCell>
                      {spyCat.years_of_experience} year
                      {spyCat.years_of_experience !== 1 ? "s" : ""}
                    </TableCell>
                    <TableCell>{formatCurrency(spyCat.salary)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {onView && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onView(spyCat)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}
                        {onEdit && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(spyCat)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                        {onDelete && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDelete(spyCat)}
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
