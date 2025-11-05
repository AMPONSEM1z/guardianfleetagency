import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShipmentsTable } from "@/components/shipments-table"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Plus, Search } from "lucide-react"

async function getShipments() {
  const supabase = await createClient()

  const { data: shipments, error } = await supabase
    .from("shipments")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching shipments:", error)
    return []
  }

  return shipments || []
}

export default async function ShipmentsPage() {
  const shipments = await getShipments()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-navy">All Shipments</h1>
          <p className="text-gray-600">Manage and track all shipments</p>
        </div>
        <Button asChild className="bg-army-green hover:bg-army-green-light text-white">
          <Link href="/admin/shipments/create">
            <Plus className="h-4 w-4 mr-2" />
            Create Shipment
          </Link>
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-navy">Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Search by tracking number, sender, or recipient..." className="pl-10" />
              </div>
            </div>
            <Button variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white bg-transparent">
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Shipments Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-navy">Shipments ({shipments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <ShipmentsTable shipments={shipments} />
        </CardContent>
      </Card>
    </div>
  )
}
