"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Package } from "lucide-react"

export function CreateShipmentForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const shipmentData = {
      sender_name: formData.get("sender_name") as string,
      sender_email: formData.get("sender_email") as string,
      sender_phone: formData.get("sender_phone") as string,
      sender_address: formData.get("sender_address") as string,
      recipient_name: formData.get("recipient_name") as string,
      recipient_email: formData.get("recipient_email") as string,
      recipient_phone: formData.get("recipient_phone") as string,
      recipient_address: formData.get("recipient_address") as string,
      package_description: formData.get("package_description") as string,
      weight_kg: Number.parseFloat(formData.get("weight_kg") as string) || null,
      dimensions_cm: formData.get("dimensions_cm") as string,
      service_type: formData.get("service_type") as string,
      shipping_cost: Number.parseFloat(formData.get("shipping_cost") as string) || null,
    }

    try {
      const response = await fetch("/api/admin/shipments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shipmentData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to create shipment")
      }

      router.push(`/admin/shipments?created=${result.tracking_number}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <p className="text-red-800">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Sender Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-navy">Sender Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sender_name">Full Name *</Label>
              <Input id="sender_name" name="sender_name" required />
            </div>
            <div>
              <Label htmlFor="sender_email">Email *</Label>
              <Input id="sender_email" name="sender_email" type="email" required />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sender_phone">Phone</Label>
              <Input id="sender_phone" name="sender_phone" type="tel" />
            </div>
          </div>
          <div>
            <Label htmlFor="sender_address">Address *</Label>
            <Textarea id="sender_address" name="sender_address" required />
          </div>
        </CardContent>
      </Card>

      {/* Recipient Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-navy">Recipient Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="recipient_name">Full Name *</Label>
              <Input id="recipient_name" name="recipient_name" required />
            </div>
            <div>
              <Label htmlFor="recipient_email">Email *</Label>
              <Input id="recipient_email" name="recipient_email" type="email" required />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="recipient_phone">Phone</Label>
              <Input id="recipient_phone" name="recipient_phone" type="tel" />
            </div>
          </div>
          <div>
            <Label htmlFor="recipient_address">Address *</Label>
            <Textarea id="recipient_address" name="recipient_address" required />
          </div>
        </CardContent>
      </Card>

      {/* Package Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-navy">Package Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="package_description">Description</Label>
            <Textarea
              id="package_description"
              name="package_description"
              placeholder="Electronics, Documents, Clothing, etc."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="weight_kg">Weight (kg)</Label>
              <Input id="weight_kg" name="weight_kg" type="number" step="0.1" min="0" />
            </div>
            <div>
              <Label htmlFor="dimensions_cm">Dimensions (cm)</Label>
              <Input id="dimensions_cm" name="dimensions_cm" placeholder="L x W x H" />
            </div>
            <div>
              <Label htmlFor="shipping_cost">Shipping Cost ($)</Label>
              <Input id="shipping_cost" name="shipping_cost" type="number" step="0.01" min="0" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Service Options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-navy">Service Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="service_type">Service Type *</Label>
            <Select name="service_type" required>
              <SelectTrigger>
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard Shipping (3-5 days)</SelectItem>
                <SelectItem value="express">Express Delivery (1-2 days)</SelectItem>
                <SelectItem value="overnight">Overnight Service (Next day)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading} className="bg-army-green hover:bg-army-green-light text-white">
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Package className="h-4 w-4 mr-2" />
              Create Shipment
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
