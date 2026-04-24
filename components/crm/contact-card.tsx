import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ContactCardProps {
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  role?: string;
  avatarUrl?: string;
  status?: "active" | "inactive" | "lead" | "customer";
  className?: string;
  onClick?: () => void;
}

export function ContactCard({
  name,
  email,
  phone,
  company,
  role,
  avatarUrl,
  status = "active",
  className,
  onClick,
}: ContactCardProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card
      className={cn("cursor-pointer transition-shadow hover:shadow-md", className)}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar>
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-semibold">{name}</span>
          {role && <span className="text-sm text-muted-foreground">{role}</span>}
        </div>
        <Badge variant={status === "active" ? "default" : "secondary"} className="ml-auto">
          {status}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-1 text-sm text-muted-foreground">
        {email && <p>{email}</p>}
        {phone && <p>{phone}</p>}
        {company && <p className="font-medium text-foreground">{company}</p>}
      </CardContent>
    </Card>
  );
}
