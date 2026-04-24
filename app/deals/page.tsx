import { KanbanBoard } from "@/components/crm/kanban-board";

export default function DealsPipelinePage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <h1 className="text-3xl font-bold tracking-tight">Deals Pipeline</h1>
      <KanbanBoard />
    </div>
  );
}
