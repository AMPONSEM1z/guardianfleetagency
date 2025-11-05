"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Edit } from "lucide-react"
import Link from "next/link"

interface Shipment {
  id: string
  tracking_number: string
  sender_name: string
  recipient_name: string
  recipient_address: string
  status: string
  service_type: string
  estimated_delivery_date: string | null
  created_at: string
  shipping_cost: number | null
}

interface ShipmentsTableProps {
  shipments: Shipment[]
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "delivered":
      return "bg-green-500 text-white"
    case "out_for_delivery":
      return "bg-blue-500 text-white"
    case "in_transit":
      return "bg-army-green text-white"
    case "picked_up":
      return "bg-yellow-500 text-black"
    case "pending":
      return "bg-gray-500 text-white"
    case "exception":
      return "bg-red-500 text-white"
    default:
      return "bg-gray-500 text-white"
  }
}

const formatStatus = (status: string) => {
  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

const formatServiceType = (serviceType: string) => {
  switch (serviceType.toLowerCase()) {
    case "standard":
      return "Standard"
    case "express":
      return "Express"
    case "overnight":
      return "Overnight"
    default:
      return serviceType.charAt(0).toUpperCase() + serviceType.slice(1)
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function ShipmentsTable({ shipments }: ShipmentsTableProps) {
  if (shipments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No shipments found.</p>
        <Button asChild className="mt-4 bg-army-green hover:bg-army-green-light text-white">
          <Link href="/admin/shipments/create">Create First Shipment</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tracking Number</TableHead>
            <TableHead>From → To</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Est. Delivery</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shipments.map((shipment) => (
            <TableRow key={shipment.id}>
              <TableCell className="font-mono font-medium">{shipment.tracking_number}</TableCell>
              <TableCell>
                <div className="space-y-1">
                  <p className="font-medium">{shipment.sender_name}</p>
                  <p className="text-sm text-gray-600">↓</p>
                  <p className="font-medium">{shipment.recipient_name}</p>
                  <p className="text-xs text-gray-500 truncate max-w-[200px]">{shipment.recipient_address}</p>
                </div>
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(shipment.status)}>{formatStatus(shipment.status)}</Badge>
              </TableCell>
              <TableCell>{formatServiceType(shipment.service_type)}</TableCell>
              <TableCell>
                {shipment.estimated_delivery_date ? formatDate(shipment.estimated_delivery_date) : "TBD"}
              </TableCell>
              <TableCell>{shipment.shipping_cost ? `$${shipment.shipping_cost.toFixed(2)}` : "—"}</TableCell>
              <TableCell>{formatDate(shipment.created_at)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="border-navy text-navy hover:bg-navy hover:text-white bg-transparent"
                  >
                    <Link href={`/track?tracking=${shipment.tracking_number}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="border-army-green text-army-green hover:bg-army-green hover:text-white bg-transparent"
                  >
                    <Link href={`/admin/shipments/${shipment.id}/edit`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
