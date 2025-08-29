"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Package, Plus, BarChart3, Users, Settings, Shield } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "All Shipments", href: "/admin/shipments", icon: Package },
  { name: "Create Shipment", href: "/admin/shipments/create", icon: Plus },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Admin Users", href: "/admin/users", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-navy text-white min-h-screen">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <Shield className="h-8 w-8 text-gold" />
          <div>
            <h2 className="text-lg font-bold text-gold">Admin Portal</h2>
            <p className="text-sm text-gray-300">GuardFleetAgency</p>
          </div>
        </div>

        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                  isActive ? "bg-gold text-navy font-semibold" : "text-gray-300 hover:bg-navy-light hover:text-white",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
