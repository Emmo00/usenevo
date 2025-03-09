import { DollarSign, FileText, Clock } from "lucide-react"

export default function DashboardMockup() {
    return (
        <div className="p-16 py-32">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Dashboard</h2>
                <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                    New Invoice
                </button>
            </div>

            <div className="mb-8 grid gap-6 md:grid-cols-3">
                <div className="rounded-lg border bg-card p-4 shadow-sm">
                    <div className="flex items-center gap-2">
                        <div className="rounded-full bg-primary/10 p-2">
                            <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div className="text-sm text-muted-foreground">All Invoices</div>
                    </div>
                    <div className="mt-3 text-2xl font-bold">2</div>
                </div>
                <div className="rounded-lg border bg-card p-4 shadow-sm">
                    <div className="flex items-center gap-2">
                        <div className="rounded-full bg-amber-500/10 p-2">
                            <Clock className="h-5 w-5 text-amber-500" />
                        </div>
                        <div className="text-sm text-muted-foreground">Outstanding Invoices</div>
                    </div>
                    <div className="mt-3 text-2xl font-bold">0</div>
                </div>
                <div className="rounded-lg border bg-card p-4 shadow-sm">
                    <div className="flex items-center gap-2">
                        <div className="rounded-full bg-green-500/10 p-2">
                            <DollarSign className="h-5 w-5 text-green-500" />
                        </div>
                        <div className="text-sm text-muted-foreground">Revenue</div>
                    </div>
                    <div className="mt-3 text-2xl font-bold">$5,000.00</div>
                </div>
            </div>

            <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-medium">Recent Invoices</h3>
                <button className="text-sm text-primary hover:underline">View all →</button>
            </div>

            <div className="overflow-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b text-left text-sm text-muted-foreground">
                            <th className="pb-3 font-medium">Number</th>
                            <th className="pb-3 font-medium">Status</th>
                            <th className="pb-3 font-medium">Amount</th>
                            <th className="pb-3 font-medium">Client</th>
                            <th className="pb-3 font-medium">Last Updated</th>
                            <th className="pb-3 font-medium"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="py-3 text-sm">NEVO-0001</td>
                            <td className="py-3">
                                <span className="rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500">Paid</span>
                            </td>
                            <td className="py-3 text-sm">$3,000.00</td>
                            <td className="py-3 text-sm">TechNova Innovations Inc.</td>
                            <td className="py-3 text-sm">Mar 04</td>
                            <td className="py-3 text-right">
                                <button className="rounded-full p-1 hover:bg-muted">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-4 w-4"
                                    >
                                        <circle cx="12" cy="12" r="1" />
                                        <circle cx="19" cy="12" r="1" />
                                        <circle cx="5" cy="12" r="1" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td className="py-3 text-sm">NEVO-0002</td>
                            <td className="py-3">
                                <span className="rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500">Paid</span>
                            </td>
                            <td className="py-3 text-sm">$2,000.00</td>
                            <td className="py-3 text-sm">TechNova Innovations Inc.</td>
                            <td className="py-3 text-sm">Mar 01</td>
                            <td className="py-3 text-right">
                                <button className="rounded-full p-1 hover:bg-muted">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-4 w-4"
                                    >
                                        <circle cx="12" cy="12" r="1" />
                                        <circle cx="19" cy="12" r="1" />
                                        <circle cx="5" cy="12" r="1" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
