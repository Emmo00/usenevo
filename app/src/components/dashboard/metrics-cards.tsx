import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, FileText, Clock } from "lucide-react"

export function MetricsCards() {
    // This would typically come from an API or database
    const metrics = {
        totalInvoices: 2,
        outstandingInvoices: 0,
        totalRevenue: 5000.0,
    }

    return (
        <div className="grid gap-4 md:grid-cols-3">
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center gap-2">
                        <div className="rounded-full bg-gray-100 p-2">
                            <FileText className="h-5 w-5 text-gray-500" />
                        </div>
                        <div className="text-sm text-muted-foreground">All Invoices</div>
                    </div>
                    <div className="mt-3 text-2xl font-bold">{metrics.totalInvoices}</div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center gap-2">
                        <div className="rounded-full bg-amber-100 p-2">
                            <Clock className="h-5 w-5 text-amber-500" />
                        </div>
                        <div className="text-sm text-muted-foreground">Outstanding Invoices</div>
                    </div>
                    <div className="mt-3 text-2xl font-bold">{metrics.outstandingInvoices}</div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center gap-2">
                        <div className="rounded-full bg-green-100 p-2">
                            <DollarSign className="h-5 w-5 text-green-500" />
                        </div>
                        <div className="text-sm text-muted-foreground">Revenue</div>
                    </div>
                    <div className="mt-3 text-2xl font-bold">
                        ${metrics.totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
