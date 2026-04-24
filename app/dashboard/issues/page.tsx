import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Plus, Search } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Issues | Dashboard",
};

// Placeholder data — replace with real data fetching
const issues: { id: string; title: string; status: string }[] = [];
const isLoading = false;
const error: string | null = null;

export default function IssuesPage() {
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4 p-6">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-4 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Issues</h1>
        <Button asChild>
          <Link href="/issues/new">
            <Plus className="mr-2 h-4 w-4" />
            New Issue
          </Link>
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search issues..."
            className="pl-8"
          />
        </div>
      </div>
      {issues.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No issues yet</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              There are no issues to display. New issues will appear here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {issues.map((issue) => (
            <Card key={issue.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">{issue.title}</CardTitle>
                <Badge variant="secondary">{issue.status}</Badge>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}