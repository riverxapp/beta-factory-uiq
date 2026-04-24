import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const notes = [
  { id: 1, title: "Q2 Planning Notes", content: "Review quarterly goals and assign action items.", tags: ["planning", "q2"], date: "2025-04-01" },
  { id: 2, title: "Client Meeting with Acme Corp", content: "Discussed project timeline and deliverables.", tags: ["client", "acme"], date: "2025-03-28" },
  { id: 3, title: "Feature Request: Dashboard Export", content: "Users need CSV export for pipeline data.", tags: ["feature", "dashboard"], date: "2025-03-25" },
  { id: 4, title: "Bug Report: Login Redirect", content: "Login redirect loops on certain mobile browsers.", tags: ["bug", "auth"], date: "2025-03-22" },
  { id: 5, title: "Sprint Retrospective Notes", content: "What went well: delivered on time. Improve: more QA.", tags: ["sprint", "retro"], date: "2025-03-20" },
];

export default function NotesPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Notes</h1>
      </div>
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search notes..."
          className="max-w-sm"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {notes.length > 0 ? (
          notes.map((note) => (
            <Card key={note.id}>
              <CardHeader>
                <CardTitle className="text-lg">{note.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{note.date}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{note.content}</p>
                <div className="flex flex-wrap gap-2">
                  {note.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <p className="text-lg font-medium">No notes yet</p>
            <p className="text-sm text-muted-foreground">
              Notes you create will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
