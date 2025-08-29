import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"
import { Package, TrendingUp, Clock, CheckCircle } from "lucide-react"

async function getDashboardStats() {
  const supabase = await createClient()

  // Get total shipments
  const { count: totalShipments } = await supabase.from("shipments").select("*", { count: "exact", head: true })

  // Get shipments by status
  const { data: statusCounts } = await supabase.from("shipments").select("status")

  // Get recent shipments
  const { data: recentShipments } = await supabase
    .from("shipments")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5)

  // Calculate status statistics
  const statusStats =
    statusCounts?.reduce((acc: Record<string, number>, shipment) => {
      acc[shipment.status] = (acc[shipment.status] || 0) + 1
      return acc
    }, {}) || {}

  return {
    totalShipments: totalShipments || 0,
    inTransit: statusStats.in_transit || 0,
    delivered: statusStats.delivered || 0,
    pending: statusStats.pending || 0,
    recentShipments: recentShipments || [],
  }
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-navy">Admin Dashboard</h1>
        <p className="text-gray-600">Overview of your shipping operations</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Shipments</CardTitle>
            <Package className="h-4 w-4 text-navy" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy">{stats.totalShipments}</div>
            <p className="text-xs text-gray-500">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">In Transit</CardTitle>
            <TrendingUp className="h-4 w-4 text-army-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-army-green">{stats.inTransit}</div>
            <p className="text-xs text-gray-500">Currently shipping</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Delivered</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.delivered}</div>
            <p className="text-xs text-gray-500">Successfully completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-xs text-gray-500">Awaiting pickup</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Shipments */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-navy">Recent Shipments</CardTitle>
          <p className="text-gray-600">Latest shipments created</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.recentShipments.map((shipment: any) => (
              <div key={shipment.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="font-semibold text-navy">{shipment.tracking_number}</p>
                      <p className="text-sm text-gray-600">
                        {shipment.sender_name} → {shipment.recipient_name}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      shipment.status === "delivered"
                        ? "bg-green-100 text-green-800"
                        : shipment.status === "in_transit"
                          ? "bg-blue-100 text-blue-800"
                          : shipment.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {shipment.status.replace("_", " ").toUpperCase()}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{new Date(shipment.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
