"use client";

import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Phone,
  Mail,
  Building2,
  Calendar,
  DollarSign,
  CheckCircle2,
  Clock,
  MessageSquare,
} from "lucide-react";
import { useEffect, useState } from "react";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  title: string;
  notes: string;
  status: string;
  createdAt: string;
}

interface Deal {
  id: string;
  title: string;
  value: number;
  stage: string;
  status: string;
  createdAt: string;
}

interface Activity {
  id: string;
  type: string;
  description: string;
  date: string;
  user: string;
}

// Placeholder data
const placeholderContact: Contact = {
  id: "1",
  name: "Jane Smith",
  email: "jane.smith@acmecorp.com",
  phone: "+1 (555) 123-4567",
  company: "Acme Corporation",
  title: "VP of Sales",
  notes: "Key decision maker interested in enterprise plan. Follow up in Q2.",
  status: "active",
  createdAt: "2024-01-15",
};

const placeholderDeals: Deal[] = [
  { id: "1", title: "Enterprise Agreement", value: 120000, stage: "Negotiation", status: "open", createdAt: "2024-02-01" },
  { id: "2", title: "Professional Services", value: 45000, stage: "Proposal", status: "open", createdAt: "2024-02-10" },
];

const placeholderActivities: Activity[] = [
  { id: "1", type: "call", description: "Discussed contract terms and next steps", date: "2024-02-20", user: "You" },
  { id: "2", type: "email", description: "Sent proposal document", date: "2024-02-19", user: "You" },
  { id: "3", type: "note", description: "Updated contact information", date: "2024-02-18", user: "System" },
];

function getStageColor(stage: string): "default" | "secondary" | "destructive" | "outline" {
  switch (stage) {
    case "Closed Won": return "default";
    case "Closed Lost": return "destructive";
    case "Negotiation": return "secondary";
    default: return "outline";
  }
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(value);
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function ActivityIcon({ type }: { type: string }) {
  switch (type) {
    case "call":
      return <Phone className="h-4 w-4" />;
    case "email":
      return <Mail className="h-4 w-4" />;
    case "note":
      return <MessageSquare className="h-4 w-4" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
}

export default function ContactDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [contact, setContact] = useState<Contact | null>(null);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadContact() {
      try {
        setLoading(true);
        // In a real app, fetch from API
        // For now, simulate loading
        await new Promise((resolve) => setTimeout(resolve, 500));
        setContact(placeholderContact);
        setDeals(placeholderDeals);
        setActivities(placeholderActivities);
      } catch (err) {
        setError("Failed to load contact details.");
      } finally {
        setLoading(false);
      }
    }
    loadContact();
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto py-10 space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    );
  }

  if (error || !contact) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-20">
            <p className="text-muted-foreground mb-4">
              {error || "Contact not found."}
            </p>
            <Button variant="outline" onClick={() => router.push("/contacts")}>
              Back to Contacts
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/contacts")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Avatar className="h-12 w-12">
            <AvatarFallback className="text-lg">
              {getInitials(contact.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{contact.name}</h1>
            <p className="text-muted-foreground">{contact.title}</p>
          </div>
          <Badge variant={contact.status === "active" ? "default" : "secondary"}>
            {contact.status}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/contacts/${params.id}/edit`)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="destructive" size="sm">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="deals">
            Deals
            {deals.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {deals.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{contact.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{contact.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span>{contact.company}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Created {formatDate(contact.createdAt)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Deal Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Active Deals</span>
                  <span className="font-bold">
                    {deals.filter((d) => d.status === "open").length}
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Pipeline</span>
                  <span className="font-bold">
                    {formatCurrency(
                      deals
                        .filter((d) => d.status === "open")
                        .reduce((sum, d) => sum + d.value, 0)
                    )}
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Closed Won</span>
                  <span className="font-bold text-green-600">
                    {deals.filter((d) => d.stage === "Closed Won").length}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {contact.notes && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{contact.notes}</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Deals Tab */}
        <TabsContent value="deals" className="space-y-4">
          {deals.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-20">
                <DollarSign className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">No deals yet.</p>
                <Button
                  variant="outline"
                  onClick={() => router.push("/deals/new")}
                >
                  Create Deal
                </Button>
              </CardContent>
            </Card>
          ) : (
            deals.map((deal) => (
              <Card key={deal.id}>
                <CardContent className="flex items-center justify-between py-4">
                  <div className="space-y-1">
                    <p className="font-medium">{deal.title}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <DollarSign className="h-4 w-4" />
                      <span>{formatCurrency(deal.value)}</span>
                      <span>•</span>
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(deal.createdAt)}</span>
                    </div>
                  </div>
                  <Badge variant={getStageColor(deal.stage)}>{deal.stage}</Badge>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-4">
          {activities.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-20">
                <Clock className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">No activity yet.</p>
              </CardContent>
            </Card>
          ) : (
            activities.map((activity) => (
              <Card key={activity.id}>
                <CardContent className="flex items-start gap-4 py-4">
                  <div className="mt-1">
                    <ActivityIcon type={activity.type} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">{activity.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{activity.user}</span>
                      <span>•</span>
                      <span>{formatDate(activity.date)}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activity.type}
                  </Badge>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}