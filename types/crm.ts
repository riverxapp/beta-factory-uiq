export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  website: string;
  phone: string;
  address: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export type DealStage = "Lead" | "Qualified" | "Proposal" | "Negotiation" | "Closed Won" | "Closed Lost";

export interface Deal {
  id: string;
  title: string;
  value: number;
  stage: DealStage;
  companyId: string;
  contactId: string;
  expectedCloseDate: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export type TaskStatus = "Pending" | "In Progress" | "Completed";
export type TaskPriority = "Low" | "Medium" | "High";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId: string;
  dueDate: string;
  relatedEntityType: "contact" | "company" | "deal" | "";
  relatedEntityId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Note {
  id: string;
  content: string;
  authorId: string;
  relatedEntityType: "contact" | "company" | "deal" | "";
  relatedEntityId: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  createdAt: string;
}

export interface Activity {
  id: string;
  type: "note" | "deal_update" | "contact_update" | "task_update";
  description: string;
  userId: string;
  user: User;
  relatedEntityType: string;
  relatedEntityId: string;
  createdAt: string;
}
