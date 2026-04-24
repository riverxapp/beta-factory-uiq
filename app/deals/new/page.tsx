import { DealForm } from "@/components/crm/deal-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import Link from "next/link"

export const metadata = {
  title: "New Deal | CRM",
  description: "Create a new deal in the CRM pipeline",
}

export default function NewDealPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/deals">Deals</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>New Deal</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">New Deal</h1>
          <p className="text-muted-foreground">
            Add a new opportunity to the pipeline
          </p>
        </div>
      </div>
      <Separator />
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Deal Details</CardTitle>
          <CardDescription>
            Fill in the information below to create a new deal.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DealForm />
        </CardContent>
      </Card>
    </div>
  )
}
