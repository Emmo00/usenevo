"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Plus } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { InvoiceItem } from "./invoice-item"
import { toast } from "@/components/ui/use-toast"
import { useAccount, useWriteContract } from "wagmi"
import { nevoContractABI as contractABI, nevoContractAddress as contractAddress } from "@/lib/contract"

interface InvoiceItemType {
    id: string
    description: string
    price: string
    errors: {
        description?: string
        price?: string
    }
}

export function CreateInvoiceForm() {
    const router = useRouter()
    const [title, setTitle] = useState("")
    const [clientName, setClientName] = useState("")
    const [titleError, setTitleError] = useState<string | undefined>()
    const [clientNameError, setClientNameError] = useState<string | undefined>()
    const [dueDate, setDueDate] = useState<Date | undefined>()
    const [dueDateError, setDueDateError] = useState<string | undefined>()
    const [items, setItems] = useState<InvoiceItemType[]>([{ id: "1", description: "", price: "", errors: {} }])
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { address: creator } = useAccount();

    const { writeContract, isPending } = useWriteContract()

    const addItem = () => {
        setItems([...items, { id: Math.random().toString(36).substring(2, 9), description: "", price: "", errors: {} }])
    }

    const removeItem = (id: string) => {
        if (items.length > 1) {
            setItems(items.filter((item) => item.id !== id))
        }
    }

    const updateItem = (id: string, field: "description" | "price", value: string) => {
        setItems(items.map((item) => (item.id === id ? { ...item, [field]: value, errors: { ...item.errors, [field]: undefined } } : item)))
    }

    const calculateTotal = () => items.reduce((total, item) => total + (Number.parseFloat(item.price) || 0), 0)

    const validateForm = () => {
        let isValid = true

        if (!title.trim()) {
            setTitleError("Invoice title is required")
            isValid = false
        } else {
            setTitleError(undefined)
        }

        if (!clientName.trim()) {
            setClientNameError("Client name is required")
            isValid = false
        } else {
            setClientNameError(undefined)
        }

        if (!dueDate) {
            setDueDateError("Due date is required")
            isValid = false
        } else {
            setDueDateError(undefined)
        }

        setItems(items.map((item) => ({ ...item, errors: { description: !item.description.trim() ? "Description is required" : undefined, price: !item.price.trim() || isNaN(Number.parseFloat(item.price)) || Number.parseFloat(item.price) <= 0 ? "Price must be a positive number" : undefined } })))

        return isValid
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        setIsSubmitting(true)

        try {
            const itemDescriptions = items.map((item) => item.description)
            const itemPrices = items.map((item) => Number.parseFloat(item.price) * 100);
            await writeContract({
                address: contractAddress,
                abi: contractABI,
                functionName: "createInvoice",
                args: [title, clientName, itemDescriptions, itemPrices, creator, dueDate?.getTime() ?? 0],
            })

            toast({ title: "Invoice created", description: "Your invoice has been created successfully." })
            router.push("/dashboard")
        } catch (error) {
            toast({ title: "Error", description: "Failed to create invoice." })
            console.error("Contract call failed:", error)
        }

        setIsSubmitting(false)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <Card>
                <CardContent className="pt-6">
                    <div className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Invoice Title</Label>
                            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="clientName">Client Name</Label>
                            <Input id="clientName" value={clientName} onChange={(e) => setClientName(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="dueDate">Due Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline">{dueDate ? format(dueDate, "PPP") : "Select due date"}</Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <Calendar mode="single" selected={dueDate} onSelect={setDueDate} />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium">Invoice Items</h2>
                    <Button type="button" onClick={addItem} variant="outline" size="sm" className="h-8">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Item
                    </Button>
                </div>

                <Card>
                    <CardContent className="pt-6">
                        <div className="space-y-4">
                            {items.map((item, index) => (
                                <InvoiceItem
                                    key={item.id}
                                    item={item}
                                    index={index}
                                    updateItem={updateItem}
                                    removeItem={() => removeItem(item.id)}
                                    showRemoveButton={items.length > 1}
                                />
                            ))}

                            <div className="flex justify-end border-t pt-4">
                                <div className="text-right">
                                    <p className="text-sm text-muted-foreground">Total Amount</p>
                                    <p className="text-2xl font-bold">${calculateTotal().toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => router.push("/dashboard")}>
                    Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Create Invoice"}
                </Button>
            </div>
        </form>
    )
}
