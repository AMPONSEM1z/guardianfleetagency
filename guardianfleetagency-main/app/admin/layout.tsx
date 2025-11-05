import type React from "react"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"

async function getAdminUser() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  const { data: adminUser } = await supabase
    .from("admin_users")
    .select("*")
    .eq("id", user.id)
    .eq("is_active", true)
    .single()

  if (!adminUser) {
    redirect("/auth/access-denied")
  }

  return { user, adminUser }
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, adminUser } = await getAdminUser()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1">
          <AdminHeader user={user} adminUser={adminUser} />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  )
}
