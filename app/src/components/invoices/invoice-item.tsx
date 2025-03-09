"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface InvoiceItemProps {
    item: {
        id: string
        description: string
        price: string
        errors: {
            description?: string
            price?: string
        }
    }
    index: number
    updateItem: (id: string, field: "description" | "price", value: string) => void
    removeItem: () => void
    showRemoveButton: boolean
}

export function InvoiceItem({ item, index, updateItem, removeItem, showRemoveButton }: InvoiceItemProps) {
    return (
        <div className="grid gap-4 md:grid-cols-[1fr_auto_auto] items-start">
            <div className="grid gap-2">
                <Label htmlFor={`item-description-${item.id}`}>Item Description {index + 1}</Label>
                <Input
                    id={`item-description-${item.id}`}
                    placeholder="Enter item description"
                    value={item.description}
                    onChange={(e) => updateItem(item.id, "description", e.target.value)}
                    className={cn(item.errors.description && "border-red-500")}
                />
                {item.errors.description && <p className="text-sm text-red-500">{item.errors.description}</p>}
            </div>

            <div className="grid gap-2">
                <Label htmlFor={`item-price-${item.id}`}>Price</Label>
                <Input
                    id={`item-price-${item.id}`}
                    type="text"
                    placeholder="0.00"
                    value={item.price}
                    onChange={(e) => {
                        // Allow only numbers and decimal point
                        const value = e.target.value.replace(/[^0-9.]/g, "")
                        updateItem(item.id, "price", value)
                    }}
                    className={cn("w-32", item.errors.price && "border-red-500")}
                />
                {item.errors.price && <p className="text-sm text-red-500">{item.errors.price}</p>}
            </div>

            <div className="flex items-end pb-2">
                {showRemoveButton && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={removeItem}
                        className="h-9 w-9 text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove item</span>
                    </Button>
                )}
            </div>
        </div>
    )
}
