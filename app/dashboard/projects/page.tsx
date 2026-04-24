```tsx
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, MoreHorizontal } from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  status: "active" | "completed" | "on-hold" | "cancelled";
  priority: "high" | "medium" | "low";
  dueDate: string;
  progress: number;
}

const statusColors: Record<string, string> = {
  active: "bg-green-500/10 text-green-600",
  completed: "bg-blue-500/10 text-blue-600",
  "on-hold": "bg-yellow-500/10 text-yellow-600",
  cancelled: "bg-red-500/10 text-red-600",
};

const priorityColors: Record<string, string> = {
  high: "bg-red-500/10 text-red-600",
  medium: "bg-yellow-500/10 text-yellow-600",
  low: "bg-green-500/10 text-green-600",
};

export default function ProjectsPage() {
  const [projects] = useState<Project[]>([
    {
      id: "1",
      name: "Website Redesign",
      description: "Complete overhaul of company website with modern design",
      status: "active",
      priority: "high",
      dueDate: "2024-03-01",
      progress: 65,
    },
    {
      id: "2",
      name: "Mobile App Development",
      description: "iOS and Android app for customer portal",
      status: "active",
      priority: "high",
      dueDate: "2024-04-15",
      progress: 30,
    },
    {
      id: "3",
      name: "API Integration",
      description: "Third-party API integration for payment processing",
      status: "on-hold",
      priority: "medium",
      dueDate: "2024-05-01",
      progress: 45,
    },
    {
      id: "4",
      name: "Database Migration",
      description: "Migrate legacy database to new cloud infrastructure",
      status: "completed",
      priority: "high",
      dueDate: "2024-02-15",
      progress: 100,
    },
    {
      id: "5",
      name: "Security Audit",
      description: "Annual security audit and penetration testing",
      status: "active",
      priority: "medium",
      dueDate: "2024-03-15",
      progress: 20,
    },
    {
      id: "6",
      name: "Documentation Update",
      description: "Update internal documentation and runbooks",
      status: "active",
      priority: "low",
      dueDate: "2024-04-01",
      progress: 50,
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Manage and track your projects
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-8"
          />
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="on-hold">On Hold</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All priorities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All priorities</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {project.description}
                  </p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className={statusColors[project.status]}
                  >
                    {project.status}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className={priorityColors[project.priority]}
                  >
                    {project.priority}
                  </Badge>
                  <span className="text-sm text-muted-foreground ml-auto">
                    Due {project.dueDate}
                  </span>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
```