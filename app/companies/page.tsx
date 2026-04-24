import { CompaniesList } from "@/components/crm/companies-list";
import { PageHeader } from "@/components/crm/page-header";

export default function CompaniesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader title="Companies" description="Manage your companies and organizations." />
      <CompaniesList />
    </div>
  );
}
