"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { LogOut, User } from "lucide-react"

interface AdminHeaderProps {
  user: {
    id: string
    email?: string
  }
  adminUser: {
    id: string
    email: string
    full_name: string
    role: string
    is_active: boolean
  }
}

export function AdminHeader({ user, adminUser }: AdminHeaderProps) {
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-red-500 text-white"
      case "manager":
        return "bg-blue-500 text-white"
      case "operator":
        return "bg-green-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-navy">Admin Dashboard</h2>
          <p className="text-sm text-gray-600">Manage shipping operations with military precision</p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <User className="h-5 w-5 text-gray-400" />
            <div className="text-right">
              <p className="text-sm font-medium text-navy">{adminUser.full_name}</p>
              <div className="flex items-center space-x-2">
                <p className="text-xs text-gray-500">{adminUser.email}</p>
                <Badge className={getRoleBadgeColor(adminUser.role)}>{adminUser.role.toUpperCase()}</Badge>
              </div>
            </div>
          </div>

          <Button
            onClick={handleSignOut}
            variant="outline"
            size="sm"
            className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  )
}
