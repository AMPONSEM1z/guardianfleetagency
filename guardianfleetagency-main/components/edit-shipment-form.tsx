"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2, Mail } from "lucide-react";

interface Shipment {
  id: string;
  tracking_number: string;
  sender_name: string;
  sender_email: string;
  sender_phone: string | null;
  sender_address: string;
  recipient_name: string;
  recipient_email: string;
  recipient_phone: string | null;
  recipient_address: string;
  package_description: string | null;
  weight_kg: number | null;
  dimensions_cm: string | null;
  service_type: string;
  status: string;
  estimated_delivery_date: string | null;
  actual_delivery_date: string | null;
  shipping_cost: number | null;
  created_at: string;
}

interface EditShipmentFormProps {
  shipment: Shipment;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "delivered":
      return "bg-green-500 text-white";
    case "out_for_delivery":
      return "bg-blue-500 text-white";
    case "in_transit":
      return "bg-army-green text-white";
    case "picked_up":
      return "bg-yellow-500 text-black";
    case "pending":
      return "bg-gray-500 text-white";
    case "on hold":
      return "bg-red-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

const formatStatus = (status: string) => {
  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export function EditShipmentForm({ shipment }: EditShipmentFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStatusUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdatingStatus(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const statusData = {
      status: formData.get("new_status") as string,
      event_description: formData.get("event_description") as string,
      location: formData.get("location") as string,
    };

    try {
      const response = await fetch(
        `/api/admin/shipments/${shipment.id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(statusData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update status");
      }

      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <p className="text-red-800">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Current Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-navy">Current Status</CardTitle>
            <Badge className={getStatusColor(shipment.status)}>
              {formatStatus(shipment.status)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-600">
                Tracking Number
              </Label>
              <p className="font-mono font-bold text-navy">
                {shipment.tracking_number}
              </p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">
                Service Type
              </Label>
              <p className="capitalize">{shipment.service_type}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">
                Created
              </Label>
              <p>{new Date(shipment.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Update Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-navy">Update Status</CardTitle>
          <p className="text-gray-600">
            Change shipment status and send notifications
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleStatusUpdate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="new_status">New Status *</Label>
                <Select name="new_status" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select new status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="picked_up">Picked Up</SelectItem>
                    <SelectItem value="in_transit">In Transit</SelectItem>
                    <SelectItem value="out_for_delivery">
                      Out for Delivery
                    </SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="on hold">on hold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="Current location or facility"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="event_description">Event Description *</Label>
              <Textarea
                id="event_description"
                name="event_description"
                placeholder="Describe what happened with this status update..."
                required
              />
            </div>
            <Button
              type="submit"
              disabled={isUpdatingStatus}
              className="bg-army-green hover:bg-army-green-light text-white"
            >
              {isUpdatingStatus ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4 mr-2" />
                  Update Status & Send Notifications
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Shipment Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-navy">Shipment Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-navy mb-3">
                Sender Information
              </h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Name:</span>{" "}
                  {shipment.sender_name}
                </p>
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  {shipment.sender_email}
                </p>
                {shipment.sender_phone && (
                  <p>
                    <span className="font-medium">Phone:</span>{" "}
                    {shipment.sender_phone}
                  </p>
                )}
                <p>
                  <span className="font-medium">Address:</span>{" "}
                  {shipment.sender_address}
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-navy mb-3">
                Recipient Information
              </h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Name:</span>{" "}
                  {shipment.recipient_name}
                </p>
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  {shipment.recipient_email}
                </p>
                {shipment.recipient_phone && (
                  <p>
                    <span className="font-medium">Phone:</span>{" "}
                    {shipment.recipient_phone}
                  </p>
                )}
                <p>
                  <span className="font-medium">Address:</span>{" "}
                  {shipment.recipient_address}
                </p>
              </div>
            </div>
          </div>

          {(shipment.package_description ||
            shipment.weight_kg ||
            shipment.dimensions_cm) && (
            <div>
              <h3 className="font-semibold text-navy mb-3">
                Package Information
              </h3>
              <div className="space-y-2">
                {shipment.package_description && (
                  <p>
                    <span className="font-medium">Description:</span>{" "}
                    {shipment.package_description}
                  </p>
                )}
                {shipment.weight_kg && (
                  <p>
                    <span className="font-medium">Weight:</span>{" "}
                    {shipment.weight_kg} kg
                  </p>
                )}
                {shipment.dimensions_cm && (
                  <p>
                    <span className="font-medium">Dimensions:</span>{" "}
                    {shipment.dimensions_cm} cm
                  </p>
                )}
                {shipment.shipping_cost && (
                  <p>
                    <span className="font-medium">Shipping Cost:</span> $
                    {shipment.shipping_cost.toFixed(2)}
                  </p>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
