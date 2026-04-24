"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { AppShell } from "@/components/layout/app-shell";

type TaskPriority = "low" | "medium" | "high" | "urgent";
type TaskStatus = "todo" | "in_progress" | "review" | "done";

interface TaskFormData {
  title: string;
  description: string;
  assignee: string;
  dueDate: Date | undefined;
  priority: TaskPriority;
  status: TaskStatus;
  relatedEntityType: "contact" | "deal" | "company" | "none";
  relatedEntityId: string;
}

export default function NewTaskPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    assignee: "",
    dueDate: undefined,
    priority: "medium",
    status: "todo",
    relatedEntityType: "none",
    relatedEntityId: "",
  });

  const handleChange = (field: keyof TaskFormData, value: string | Date | undefined) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast({
        title: "Validation Error",
        description: "Task title is required.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          dueDate: formData.dueDate?.toISOString(),
        }),
      });
      if (!res.ok) throw new Error("Failed to create task");
      toast({
        title: "Task created",
        description: "The task has been created successfully.",
      });
      router.push("/tasks");
    } catch {
      toast({
        title: "Error",
        description: "Failed to create task. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppShell>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Create New Task</h2>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Task Details</CardTitle>
            <CardDescription>
              Fill in the details below to create a new task.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter task title"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the task"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="assignee">Assignee</Label>
                  <Input
                    id="assignee"
                    placeholder="Enter assignee name"
                    value={formData.assignee}
                    onChange={(e) => handleChange("assignee", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Due Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.dueDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.dueDate ? format(formData.dueDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.dueDate}
                        onSelect={(date) => handleChange("dueDate", date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value: TaskPriority) => handleChange("priority", value)}
                  >
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: TaskStatus) => handleChange("status", value)}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todo">To Do</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="review">Review</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="relatedEntityType">Related Entity</Label>
                <Select
                  value={formData.relatedEntityType}
                  onValueChange={(value: "contact" | "deal" | "company" | "none") =>
                    handleChange("relatedEntityType", value)
                  }
                >
                  <SelectTrigger id="relatedEntityType">
                    <SelectValue placeholder="Select entity type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="contact">Contact</SelectItem>
                    <SelectItem value="deal">Deal</SelectItem>
                    <SelectItem value="company">Company</SelectItem>
                  </SelectContent>
                </Select>
                {formData.relatedEntityType !== "none" && (
                  <div className="mt-2">
                    <Input
                      placeholder="Enter entity ID"
                      value={formData.relatedEntityId}
                      onChange={(e) => handleChange("relatedEntityId", e.target.value)}
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Task"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/tasks")}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
