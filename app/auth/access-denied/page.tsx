import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Shield, AlertTriangle } from "lucide-react"

export default function AccessDeniedPage() {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-12 w-12 text-gold" />
            <div>
              <h1 className="text-2xl font-bold text-gold">GuardFleetAgency</h1>
              <p className="text-gray-300">Admin Portal</p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <AlertTriangle className="h-16 w-16 text-red-500" />
            </div>
            <CardTitle className="text-2xl text-navy">Access Denied</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-800">
                You don't have admin privileges to access this area. Please contact an administrator to request access.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800 mb-2">Setting up your first admin account?</p>
              <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Link href="/auth/setup-admin">View Setup Instructions</Link>
              </Button>
            </div>

            <div className="space-y-2 pt-4">
              <Button asChild className="w-full bg-army-green hover:bg-army-green-light text-white">
                <Link href="/contact">Contact Support</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full border-navy text-navy hover:bg-navy hover:text-white bg-transparent"
              >
                <Link href="/">Back to Homepage</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
