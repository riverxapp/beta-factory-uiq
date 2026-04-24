"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { GripVertical, Plus, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Deal {
  id: string;
  title: string;
  value: number;
  stage: string;
  company: string;
  contact: string;
  contactAvatar?: string;
  expectedCloseDate: string;
  probability: number;
}

export interface Stage {
  id: string;
  title: string;
  color: string;
  deals: Deal[];
}

interface KanbanBoardProps {
  stages: Stage[];
  onStageChange?: (dealId: string, newStage: string) => void;
  onAddDeal?: (stageId: string) => void;
  onDealClick?: (dealId: string) => void;
  className?: string;
}

export function KanbanBoard({
  stages,
  onStageChange,
  onAddDeal,
  onDealClick,
  className,
}: KanbanBoardProps) {
  const [boardStages, setBoardStages] = useState(stages);
  const [dragItem, setDragItem] = useState<{
    dealId: string;
    sourceStage: string;
  } | null>(null);

  const handleDragStart = useCallback(
    (dealId: string, stageId: string) => {
      setDragItem({ dealId, sourceStage: stageId });
    },
    []
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback(
    (targetStageId: string) => {
      if (!dragItem) return;
      const { dealId, sourceStage } = dragItem;
      if (sourceStage === targetStageId) {
        setDragItem(null);
        return;
      }
      const updatedStages = boardStages.map((stage) => {
        if (stage.id === sourceStage) {
          return {
            ...stage,
            deals: stage.deals.filter((deal) => deal.id !== dealId),
          };
        }
        if (stage.id === targetStageId) {
          const deal = boardStages
            .find((s) => s.id === sourceStage)
            ?.deals.find((d) => d.id === dealId);
          return deal
            ? { ...stage, deals: [...stage.deals, { ...deal, stage: targetStageId }] }
            : stage;
        }
        return stage;
      });
      setBoardStages(updatedStages);
      setDragItem(null);
      onStageChange?.(dealId, targetStageId);
    },
    [dragItem, boardStages, onStageChange]
  );

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);

  return (
    <div className={cn("flex gap-4 overflow-x-auto pb-4", className)}>
      {boardStages.map((stage) => (
        <div
          key={stage.id}
          className="flex-shrink-0 w-80"
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(stage.id)}
        >
          <Card className="h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: stage.color }}
                  />
                  <CardTitle className="text-sm font-medium">
                    {stage.title}
                  </CardTitle>
                  <Badge variant="secondary" className="ml-1">
                    {stage.deals.length}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onAddDeal?.(stage.id)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="p-3">
              <ScrollArea className="h-[calc(100vh-280px)]">
                <div className="space-y-3">
                  {stage.deals.map((deal) => (
                    <Card
                      key={deal.id}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      draggable
                      onDragStart={() => handleDragStart(deal.id, stage.id)}
                      onClick={() => onDealClick?.(deal.id)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-sm leading-tight">
                            {deal.title}
                          </h4>
                          <GripVertical className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        </div>
                        <div className="text-lg font-bold text-primary mb-2">
                          {formatCurrency(deal.value)}
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{deal.company}</span>
                          <span>{deal.expectedCloseDate}</span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={deal.contactAvatar} alt={deal.contact} />
                            <AvatarFallback className="text-[10px]">
                              {deal.contact.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <Badge
                            variant="outline"
                            className="text-[10px]"
                          >
                            {deal.probability}%
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {stage.deals.length === 0 && (
                    <div className="text-center py-8 text-sm text-muted-foreground">
                      No deals in this stage
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}