import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Plus, Search, Filter, Calendar } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tasks | CRM",
  description: "Manage personal and team tasks",
};

interface Task {
  id: string;
  title: string;
  status: "pending" | "in_progress" | "completed";
  priority: "low" | "medium" | "high" | "urgent";
  dueDate: string;
  assignee: string;
  relatedEntity?: string;
}

const tasks: Task[] = [
  {
    id: "T-001",
    title: "Follow up with Acme Corp lead",
    status: "pending",
    priority: "high",
    dueDate: "2025-04-15",
    assignee: "Alice Johnson",
    relatedEntity: "Acme Corp",
  },
  {
    id: "T-002",
    title: "Prepare Q2 proposal for Beta Inc",
    status: "in_progress",
    priority: "urgent",
    dueDate: "2025-04-12",
    assignee: "Bob Smith",
    relatedEntity: "Beta Inc",
  },
  {
    id: "T-003",
    title: "Update contact records for Q1 leads",
    status: "pending",
    priority: "medium",
    dueDate: "2025-04-20",
    assignee: "Carol Davis",
  },
  {
    id: "T-004",
    title: "Review contract terms for Gamma LLC",
    status: "completed",
    priority: "high",
    dueDate: "2025-04-08",
    assignee: "Alice Johnson",
    relatedEntity: "Gamma LLC",
  },
  {
    id: "T-005",
    title: "Setup demo environment for Delta Solutions",
    status: "pending",
    priority: "low",
    dueDate: "2025-04-25",
    assignee: "Bob Smith",
  },
];

const priorityColor = {
  low: "bg-gray-100 text-gray-800",
  medium: "bg-blue-100 text-blue-800",
  high: "bg-orange-100 text-orange-800",
  urgent: "bg-red-100 text-red-800",
};

const statusColor = {
  pending: "bg-yellow-100 text-yellow-800",
  in_progress: "bg-purple-100 text-purple-800",
  completed: "bg-green-100 text-green-800",
};

function TaskTable({ tasks }: { tasks: Task[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Assignee</TableHead>
          <TableHead>Related</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell className="font-medium">{task.id}</TableCell>
            <TableCell>{task.title}</TableCell>
            <TableCell>
              <Badge className={statusColor[task.status]} variant="outline">
                {task.status.replace("_", " ")}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge className={priorityColor[task.priority]} variant="outline">
                {task.priority}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                <span>{task.dueDate}</span>
              </div>
            </TableCell>
            <TableCell>{task.assignee}</TableCell>
            <TableCell>{task.relatedEntity || "-"}</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm">
                View
              </Button>
              <Button variant="ghost" size="sm">
                Edit
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function TasksPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tasks</h2>
          <p className="text-muted-foreground">
            Manage personal and team tasks with status, priority, and due dates.
          </p>
        </div>
        <Button asChild>
          <Link href="/tasks/new">
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            className="pl-8"
          />
        </div>
        <Select defaultValue="all">
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </Select>
        <Select defaultValue="all-priority">
          <option value="all-priority">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </Select>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="my">My Tasks</TabsTrigger>
          <TabsTrigger value="team">Team Tasks</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Tasks</CardTitle>
              <CardDescription>
                View and manage all tasks across the team.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TaskTable tasks={tasks} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="my" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Tasks</CardTitle>
              <CardDescription>
                Tasks assigned to you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TaskTable tasks={tasks.filter((t) => t.assignee === "Alice Johnson")} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Tasks</CardTitle>
              <CardDescription>
                Tasks assigned to other team members.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TaskTable tasks={tasks.filter((t) => t.assignee !== "Alice Johnson")} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
