import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Clock,
  Mail,
  Phone,
  FileText,
  Star,
  UserPlus,
  Briefcase,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface Activity {
  id: string;
  type: "email" | "call" | "note" | "meeting" | "deal" | "contact" | "task" | "status";
  title: string;
  description?: string;
  timestamp: string;
  user: {
    name: string;
    avatar?: string;
    initials: string;
  };
}

interface ActivityTimelineProps {
  activities: Activity[];
  className?: string;
  title?: string;
}

const activityIcons = {
  email: Mail,
  call: Phone,
  note: FileText,
  meeting: Star,
  deal: Briefcase,
  contact: UserPlus,
  task: CheckCircle2,
  status: AlertCircle,
};

export function ActivityTimeline({
  activities,
  className,
  title = "Activity",
}: ActivityTimelineProps) {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Clock className="mb-2 h-10 w-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No recent activity</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity, index) => {
              const Icon = activityIcons[activity.type];
              return (
                <div key={activity.id}>
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                      <AvatarFallback className="text-xs">{activity.user.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{activity.title}</span>
                        {activity.type && (
                          <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{activity.type}</Badge>
                        )}
                      </div>
                      {activity.description && (
                        <p className="text-xs text-muted-foreground">{activity.description}</p>
                      )}
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{activity.timestamp}</span>
                        <span aria-hidden="true">&middot;</span>
                        <span>{activity.user.name}</span>
                      </div>
                    </div>
                  </div>
                  {index < activities.length - 1 && <Separator className="mt-4" />}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
