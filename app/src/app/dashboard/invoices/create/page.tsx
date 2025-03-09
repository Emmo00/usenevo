import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { CreateInvoiceForm } from "@/components/invoices/create-invoice-form"

export default function CreateInvoicePage() {
    return (
        <DashboardShell>
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold">Create Invoice</h1>
                    <p className="text-muted-foreground mt-1">Fill out the form below to create a new invoice</p>
                </div>
                <CreateInvoiceForm />
            </div>
        </DashboardShell>
    )
}

