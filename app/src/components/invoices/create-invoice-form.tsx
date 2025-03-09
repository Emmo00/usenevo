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
    const [titleError, setTitleError] = useState<string | undefined>()
    const [dueDate, setDueDate] = useState<Date | undefined>()
    const [dueDateError, setDueDateError] = useState<string | undefined>()
    const [items, setItems] = useState<InvoiceItemType[]>([{ id: "1", description: "", price: "", errors: {} }])
    const [isSubmitting, setIsSubmitting] = useState(false)

    const addItem = () => {
        setItems([
            ...items,
            {
                id: Math.random().toString(36).substring(2, 9),
                description: "",
                price: "",
                errors: {},
            },
        ])
    }

    const removeItem = (id: string) => {
        if (items.length > 1) {
            setItems(items.filter((item) => item.id !== id))
        }
    }

    const updateItem = (id: string, field: "description" | "price", value: string) => {
        setItems(
            items.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        [field]: value,
                        errors: {
                            ...item.errors,
                            [field]: undefined,
                        },
                    }
                }
                return item
            }),
        )
    }

    const calculateTotal = () => {
        return items.reduce((total, item) => {
            const price = Number.parseFloat(item.price) || 0
            return total + price
        }, 0)
    }

    const validateForm = () => {
        let isValid = true

        // Validate title
        if (!title.trim()) {
            setTitleError("Invoice title is required")
            isValid = false
        } else {
            setTitleError(undefined)
        }

        // Validate due date
        if (!dueDate) {
            setDueDateError("Due date is required")
            isValid = false
        } else {
            setDueDateError(undefined)
        }

        // Validate items
        const updatedItems = items.map((item) => {
            const errors: { description?: string; price?: string } = {}

            if (!item.description.trim()) {
                errors.description = "Description is required"
                isValid = false
            }

            if (!item.price.trim()) {
                errors.price = "Price is required"
                isValid = false
            } else if (isNaN(Number.parseFloat(item.price)) || Number.parseFloat(item.price) <= 0) {
                errors.price = "Price must be a positive number"
                isValid = false
            }

            return { ...item, errors }
        })

        setItems(updatedItems)

        return isValid
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsSubmitting(true)

        // Simulate API call
        setTimeout(() => {
            const invoiceData = {
                title,
                dueDate,
                items: items.map(({ id, description, price }) => ({
                    id,
                    description,
                    price: Number.parseFloat(price),
                })),
                total: calculateTotal(),
            }

            console.log("Invoice created:", invoiceData)

            toast({
                title: "Invoice created",
                description: "Your invoice has been created successfully.",
            })

            setIsSubmitting(false)
            router.push("/dashboard")
        }, 1500)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <Card>
                <CardContent className="pt-6">
                    <div className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Invoice Title</Label>
                            <Input
                                id="title"
                                placeholder="Enter invoice title"
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value)
                                    setTitleError(undefined)
                                }}
                                className={cn(titleError && "border-red-500")}
                            />
                            {titleError && <p className="text-sm text-red-500">{titleError}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="dueDate">Due Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !dueDate && "text-muted-foreground",
                                            dueDateError && "border-red-500",
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {dueDate ? format(dueDate, "PPP") : "Select due date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={dueDate}
                                        onSelect={(date) => {
                                            setDueDate(date)
                                            setDueDateError(undefined)
                                        }}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            {dueDateError && <p className="text-sm text-red-500">{dueDateError}</p>}
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
