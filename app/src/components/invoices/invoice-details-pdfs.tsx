import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"

// Define PDF styles
const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: "Helvetica",
    },
    header: {
        marginBottom: 20,
    },
    logo: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    flexRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
    },
    label: {
        fontSize: 10,
        color: "#666",
        marginBottom: 3,
    },
    value: {
        fontSize: 12,
        marginBottom: 10,
    },
    table: {
        marginTop: 20,
        marginBottom: 20,
    },
    tableHeader: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        paddingBottom: 5,
        paddingTop: 5,
        fontSize: 10,
        fontWeight: "bold",
        color: "#666",
    },
    tableRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        paddingTop: 8,
        paddingBottom: 8,
    },
    colDescription: {
        flex: 3,
        fontSize: 11,
    },
    colAmount: {
        flex: 1,
        textAlign: "right",
        fontSize: 11,
    },
    total: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 10,
        paddingBottom: 10,
        borderTopWidth: 1,
        borderTopColor: "#999",
        fontWeight: "bold",
    },
    footer: {
        marginTop: 30,
        fontSize: 10,
        textAlign: "center",
        color: "#666",
    },
    status: {
        padding: 5,
        borderRadius: 4,
        alignSelf: "flex-start",
        fontSize: 10,
        fontWeight: "bold",
    },
    statusPaid: {
        backgroundColor: "#e6f9ee",
        color: "#3b7a4e",
    },
    statusPending: {
        backgroundColor: "#fff8e6",
        color: "#9a6700",
    },
    statusExpired: {
        backgroundColor: "#ffebee",
        color: "#c62828",
    },
})

// Format date helper
const formatPDFDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
    }
    return date.toLocaleDateString("en-US", options)
}

// Get status style helper
const getStatusStyle = (status: string) => {
    switch (status) {
        case "Paid":
            return styles.statusPaid
        case "Pending":
            return styles.statusPending
        case "Expired":
            return styles.statusExpired
        default:
            return {}
    }
}

interface InvoiceItem {
    id: string
    description: string
    price: number
}

interface Invoice {
    id: string
    title: string
    client: string
    status: string
    dueDate: Date
    createdAt: Date
    items: InvoiceItem[]
}

interface InvoiceDetailsPDFProps {
    invoice: Invoice
    total: number
}

export function InvoiceDetailsPDF({ invoice, total }: InvoiceDetailsPDFProps) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.logo}>Nevo</Text>
                    <View style={styles.flexRow}>
                        <View>
                            <Text style={styles.label}>INVOICE</Text>
                            <Text style={styles.value}>{invoice.id}</Text>
                        </View>
                        <View>
                            <Text style={[styles.status, getStatusStyle(invoice.status)]}>{invoice.status}</Text>
                        </View>
                    </View>
                </View>

                {/* Invoice Details */}
                <Text style={styles.title}>{invoice.title}</Text>

                <View style={styles.flexRow}>
                    <View>
                        <Text style={styles.label}>CLIENT</Text>
                        <Text style={styles.value}>{invoice.client}</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>ISSUE DATE</Text>
                        <Text style={styles.value}>{formatPDFDate(invoice.createdAt)}</Text>
                    </View>
                </View>

                <View style={styles.flexRow}>
                    <View>
                        <Text style={styles.label}>DUE DATE</Text>
                        <Text style={styles.value}>{formatPDFDate(invoice.dueDate)}</Text>
                    </View>
                </View>

                {/* Invoice Items */}
                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={styles.colDescription}>DESCRIPTION</Text>
                        <Text style={styles.colAmount}>AMOUNT</Text>
                    </View>

                    {invoice.items.map((item) => (
                        <View key={item.id} style={styles.tableRow}>
                            <Text style={styles.colDescription}>{item.description}</Text>
                            <Text style={styles.colAmount}>${item.price.toFixed(2)}</Text>
                        </View>
                    ))}

                    <View style={styles.total}>
                        <Text>Total</Text>
                        <Text>${total.toFixed(2)}</Text>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text>This invoice was generated by Nevo - Web3 Invoicing Platform</Text>
                    <Text>www.usenevo.com</Text>
                </View>
            </Page>
        </Document>
    )
}
