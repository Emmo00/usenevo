import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { InvoicesList } from "@/components/dashboard/invoices-list"
import { MetricsCards } from "@/components/dashboard/metrics-cards"

export default function DashboardPage() {
    return (
        <div>
            <DashboardShell>
                <DashboardHeader heading="Dashboard" text="View and manage your invoices" />
                <MetricsCards />
                <InvoicesList />
            </DashboardShell>
        </div>
    )
}
