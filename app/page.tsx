"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Users,
  DollarSign,
  Briefcase,
  CheckCircle2,
  Plus,
  ArrowUpRight,
  Activity,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div className="flex-1" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" className="gap-1">
                <Plus className="h-4 w-4" />
                Quick Action
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Users className="mr-2 h-4 w-4" />
                Add Contact
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Briefcase className="mr-2 h-4 w-4" />
                New Deal
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Create Task
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Activity className="mr-2 h-4 w-4" />
                Schedule Meeting
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Contacts
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,350</div>
                <p className="text-xs text-muted-foreground">
                  +180 from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Deals
                </CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">
                  +6 since last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Revenue Pipeline
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$248,000</div>
                <p className="text-xs text-muted-foreground">
                  +12.5% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Tasks Due Today
                </CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  3 are overdue
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Alex Johnson",
                      action: "moved deal to Negotiation stage",
                      deal: "Acme Corp - Enterprise Plan",
                      time: "2 minutes ago",
                    },
                    {
                      name: "Sarah Chen",
                      action: "added a new contact",
                      deal: "TechStart Inc.",
                      time: "15 minutes ago",
                    },
                    {
                      name: "Mike Rivera",
                      action: "closed a deal",
                      deal: "Greenfield LLC - Growth Package",
                      time: "1 hour ago",
                    },
                    {
                      name: "Emily Watson",
                      action: "updated task status",
                      deal: "Q2 Planning",
                      time: "3 hours ago",
                    },
                    {
                      name: "David Kim",
                      action: "created new deal",
                      deal: "Meridian Health - Custom Solution",
                      time: "5 hours ago",
                    },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={`http://avatar.vercel.sh/${activity.name}`}
                          alt={activity.name}
                        />
                        <AvatarFallback>
                          {activity.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm">
                          <span className="font-medium">{activity.name}</span>{" "}
                          {activity.action}{" "}
                          <span className="font-medium">{activity.deal}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.time}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <Button variant="outline" className="justify-start gap-2">
                    <Users className="h-4 w-4" />
                    Add Contact
                  </Button>
                  <Button variant="outline" className="justify-start gap-2">
                    <Briefcase className="h-4 w-4" />
                    New Deal
                  </Button>
                  <Button variant="outline" className="justify-start gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Create Task
                  </Button>
                  <Button variant="outline" className="justify-start gap-2">
                    <Activity className="h-4 w-4" />
                    Schedule Meeting
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}