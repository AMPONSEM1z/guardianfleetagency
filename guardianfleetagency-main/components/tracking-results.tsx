"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, MapPin, Calendar, Weight, Ruler, User } from "lucide-react";

interface TrackingEvent {
  id: string;
  event_type: string;
  event_description: string;
  location: string | null;
  event_timestamp: string;
}

interface Shipment {
  tracking_number: string;
  status: string;
  service_type: string;
  estimated_delivery_date: string | null;
  actual_delivery_date: string | null;
  sender_name: string;
  recipient_name: string;
  recipient_address: string;
  package_description: string | null;
  weight_kg: number | null;
  dimensions_cm: string | null;
  created_at: string;
}

interface TrackingData {
  shipment: Shipment;
  tracking_events: TrackingEvent[];
}

interface TrackingResultsProps {
  data: TrackingData;
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

const formatServiceType = (serviceType: string) => {
  switch (serviceType.toLowerCase()) {
    case "standard":
      return "Standard Shipping";
    case "express":
      return "Express Delivery";
    case "overnight":
      return "Overnight Service";
    default:
      return serviceType.charAt(0).toUpperCase() + serviceType.slice(1);
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export function TrackingResults({ data }: TrackingResultsProps) {
  const { shipment, tracking_events } = data;

  return (
    <div className="space-y-6">
      {/* Shipment Overview */}
      <Card className="p-6">
        <CardHeader className="p-0 mb-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl text-navy">
              Shipment Details
            </CardTitle>
            <Badge className={getStatusColor(shipment.status)}>
              {formatStatus(shipment.status)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <Package className="h-5 w-5 text-gold mt-1" />
              <div>
                <h3 className="font-semibold text-navy">Tracking Number</h3>
                <p className="text-gray-600 font-mono">
                  {shipment.tracking_number}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-gold mt-1" />
              <div>
                <h3 className="font-semibold text-navy">Service Type</h3>
                <p className="text-gray-600">
                  {formatServiceType(shipment.service_type)}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Calendar className="h-5 w-5 text-gold mt-1" />
              <div>
                <h3 className="font-semibold text-navy">
                  {shipment.actual_delivery_date
                    ? "Delivered On"
                    : "Estimated Delivery"}
                </h3>
                <p className="text-gray-600">
                  {shipment.actual_delivery_date
                    ? formatDate(shipment.actual_delivery_date)
                    : shipment.estimated_delivery_date
                    ? formatDate(shipment.estimated_delivery_date)
                    : "TBD"}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <User className="h-5 w-5 text-gold mt-1" />
              <div>
                <h3 className="font-semibold text-navy">From</h3>
                <p className="text-gray-600">{shipment.sender_name}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <User className="h-5 w-5 text-gold mt-1" />
              <div>
                <h3 className="font-semibold text-navy">To</h3>
                <p className="text-gray-600">{shipment.recipient_name}</p>
                <p className="text-sm text-gray-500">
                  {shipment.recipient_address}
                </p>
              </div>
            </div>

            {(shipment.weight_kg || shipment.dimensions_cm) && (
              <div className="flex items-start space-x-3">
                <div className="flex space-x-1">
                  <Weight className="h-5 w-5 text-gold mt-1" />
                  <Ruler className="h-5 w-5 text-gold mt-1" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy">Package Info</h3>
                  {shipment.weight_kg && (
                    <p className="text-gray-600">{shipment.weight_kg} kg</p>
                  )}
                  {shipment.dimensions_cm && (
                    <p className="text-gray-600">{shipment.dimensions_cm} cm</p>
                  )}
                  {shipment.package_description && (
                    <p className="text-sm text-gray-500">
                      {shipment.package_description}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tracking History */}
      <Card className="p-6">
        <CardHeader className="p-0 mb-6">
          <CardTitle className="text-xl text-navy">Tracking History</CardTitle>
          <p className="text-gray-600">
            Real-time updates on your package's journey
          </p>
        </CardHeader>
        <CardContent className="p-0">
          {tracking_events.length > 0 ? (
            <div className="space-y-4">
              {tracking_events.map((event, index) => (
                <div
                  key={event.id}
                  className="flex items-start space-x-4 pb-4 border-b border-gray-200 last:border-b-0"
                >
                  <div
                    className={`w-3 h-3 rounded-full mt-2 ${
                      index === 0 ? "bg-army-green" : "bg-gray-300"
                    }`}
                  ></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-navy">
                          {event.event_description}
                        </p>
                        {event.location && (
                          <p className="text-sm text-gray-600">
                            {event.location}
                          </p>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        {formatDateTime(event.event_timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No tracking events available yet.</p>
              <p className="text-sm text-gray-500">
                Check back later for updates.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
