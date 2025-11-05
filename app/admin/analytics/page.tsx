import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"
import { TrendingUp, Package, Clock, CheckCircle, AlertCircle } from "lucide-react"

async function getAnalyticsData() {
  const supabase = await createClient()

  // Get shipments data for analytics
  const { data: shipments } = await supabase.from("shipments").select("status, created_at, estimated_delivery")

  // Calculate monthly shipments
  const monthlyData =
    shipments?.reduce((acc: Record<string, number>, shipment) => {
      const month = new Date(shipment.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })
      acc[month] = (acc[month] || 0) + 1
      return acc
    }, {}) || {}

  // Calculate status distribution
  const statusData =
    shipments?.reduce((acc: Record<string, number>, shipment) => {
      acc[shipment.status] = (acc[shipment.status] || 0) + 1
      return acc
    }, {}) || {}

  // Calculate delivery performance
  const deliveredShipments = shipments?.filter((s) => s.status === "delivered") || []
  const onTimeDeliveries = deliveredShipments.filter((s) => new Date(s.estimated_delivery) >= new Date()).length

  return {
    totalShipments: shipments?.length || 0,
    monthlyData,
    statusData,
    deliveryRate: deliveredShipments.length > 0 ? Math.round((onTimeDeliveries / deliveredShipments.length) * 100) : 0,
    recentMonths: Object.entries(monthlyData).slice(-6),
  }
}

export default async function AnalyticsPage() {
  const analytics = await getAnalyticsData()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-navy">Analytics & Reports</h1>
        <p className="text-gray-600">Insights into your shipping operations</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Shipments</CardTitle>
            <Package className="h-4 w-4 text-navy" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy">{analytics.totalShipments}</div>
            <p className="text-xs text-gray-500">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Delivery Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{analytics.deliveryRate}%</div>
            <p className="text-xs text-gray-500">On-time deliveries</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">In Transit</CardTitle>
            <TrendingUp className="h-4 w-4 text-army-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-army-green">{analytics.statusData.in_transit || 0}</div>
            <p className="text-xs text-gray-500">Currently shipping</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{analytics.statusData.pending || 0}</div>
            <p className="text-xs text-gray-500">Awaiting pickup</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-navy">Monthly Shipments</CardTitle>
            <p className="text-gray-600">Shipment volume over time</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.recentMonths.map(([month, count]) => (
                <div key={month} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{month}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-navy h-2 rounded-full"
                        style={{
                          width: `${Math.min((count / Math.max(...analytics.recentMonths.map(([, c]) => c))) * 100, 100)}%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-navy">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-navy">Status Distribution</CardTitle>
            <p className="text-gray-600">Current shipment statuses</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(analytics.statusData).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {status === "delivered" && <CheckCircle className="h-4 w-4 text-green-600" />}
                    {status === "in_transit" && <TrendingUp className="h-4 w-4 text-army-green" />}
                    {status === "pending" && <Clock className="h-4 w-4 text-yellow-600" />}
                    {status === "cancelled" && <AlertCircle className="h-4 w-4 text-red-600" />}
                    <span className="text-sm font-medium text-gray-700 capitalize">{status.replace("_", " ")}</span>
                  </div>
                  <span className="text-sm font-bold text-navy">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-navy">Performance Insights</CardTitle>
          <p className="text-gray-600">Key operational metrics</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-army-green">{analytics.deliveryRate}%</div>
              <p className="text-sm text-gray-600">On-Time Delivery Rate</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-navy">{Math.round(analytics.totalShipments / 30)}</div>
              <p className="text-sm text-gray-600">Avg. Daily Shipments</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-gold">{analytics.statusData.delivered || 0}</div>
              <p className="text-sm text-gray-600">Total Delivered</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
