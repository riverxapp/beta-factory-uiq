import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

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
      <h1 className="text-2xl font-bold">Issues</h1>
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
