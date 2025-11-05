import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/server"
import { Users, UserPlus, Shield, Mail, Calendar } from "lucide-react"

async function getAdminUsers() {
  const supabase = await createClient()

  const { data: adminUsers, error } = await supabase
    .from("admin_users")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching admin users:", error)
    return []
  }

  return adminUsers || []
}

export default async function AdminUsersPage() {
  const adminUsers = await getAdminUsers()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-navy">Admin Users</h1>
          <p className="text-gray-600">Manage administrator accounts and permissions</p>
        </div>
        <Button className="bg-army-green hover:bg-army-green-light text-white">
          <UserPlus className="h-4 w-4 mr-2" />
          Add Admin User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Admins</CardTitle>
            <Users className="h-4 w-4 text-navy" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy">{adminUsers.length}</div>
            <p className="text-xs text-gray-500">Active administrators</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Users</CardTitle>
            <Shield className="h-4 w-4 text-army-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-army-green">
              {adminUsers.filter((user) => user.is_active).length}
            </div>
            <p className="text-xs text-gray-500">Currently active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Super Admins</CardTitle>
            <Shield className="h-4 w-4 text-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gold">
              {adminUsers.filter((user) => user.role === "super_admin").length}
            </div>
            <p className="text-xs text-gray-500">Full access</p>
          </CardContent>
        </Card>
      </div>

      {/* Admin Users Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-navy">Administrator Accounts</CardTitle>
          <p className="text-gray-600">Manage admin user permissions and access</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {adminUsers.map((adminUser: any) => (
              <div
                key={adminUser.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-navy rounded-full flex items-center justify-center">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-navy">{adminUser.email}</h3>
                      <Badge variant={adminUser.is_active ? "default" : "secondary"}>
                        {adminUser.is_active ? "Active" : "Inactive"}
                      </Badge>
                      {adminUser.role === "super_admin" && <Badge className="bg-gold text-navy">Super Admin</Badge>}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <div className="flex items-center space-x-1">
                        <Mail className="h-3 w-3" />
                        <span>Role: {adminUser.role}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>Added: {new Date(adminUser.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-navy text-navy hover:bg-navy hover:text-white bg-transparent"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={
                      adminUser.is_active
                        ? "border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                        : "border-army-green text-army-green hover:bg-army-green hover:text-white"
                    }
                  >
                    {adminUser.is_active ? "Deactivate" : "Activate"}
                  </Button>
                </div>
              </div>
            ))}

            {adminUsers.length === 0 && (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No admin users found</h3>
                <p className="text-gray-600 mb-4">Get started by adding your first administrator.</p>
                <Button className="bg-army-green hover:bg-army-green-light text-white">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add First Admin
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Permissions Guide */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-navy">Permission Levels</CardTitle>
          <p className="text-gray-600">Understanding admin roles and capabilities</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="h-5 w-5 text-gold" />
                <h4 className="font-semibold text-gold">Super Admin</h4>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Full system access</li>
                <li>• Manage all shipments</li>
                <li>• Add/remove admin users</li>
                <li>• System configuration</li>
                <li>• View all analytics</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="h-5 w-5 text-navy" />
                <h4 className="font-semibold text-navy">Admin</h4>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Manage shipments</li>
                <li>• View analytics</li>
                <li>• Update tracking status</li>
                <li>• Customer support</li>
                <li>• Limited settings access</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
