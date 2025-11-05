import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function SetupAdminPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-army-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-navy-900">Admin Setup Instructions</CardTitle>
          <CardDescription>Follow these steps to set up your admin account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-navy-600 text-white rounded-full flex items-center justify-center font-semibold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-navy-900">Create Auth Account</h3>
                <p className="text-gray-600 mt-1">First, create your admin account using the signup form.</p>
                <Link href="/auth/signup">
                  <Button className="mt-2 bg-navy-600 hover:bg-navy-700">Sign Up →</Button>
                </Link>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-navy-600 text-white rounded-full flex items-center justify-center font-semibold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-navy-900">Run Database Script</h3>
                <p className="text-gray-600 mt-1">After signing up, run the admin setup script:</p>
                <div className="mt-2 p-3 bg-gray-100 rounded-md">
                  <code className="text-sm">scripts/004_create_admin_from_email.sql</code>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Make sure to update the email address in the script to match your signup email.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-navy-600 text-white rounded-full flex items-center justify-center font-semibold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-navy-900">Access Admin Dashboard</h3>
                <p className="text-gray-600 mt-1">Once the script is run, you can access the admin dashboard.</p>
                <Link href="/admin">
                  <Button className="mt-2 bg-army-600 hover:bg-army-700">Go to Admin Dashboard →</Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold text-navy-900 mb-2">Need Help?</h4>
            <p className="text-sm text-gray-600">
              If you're still having issues, make sure all database scripts have been run in order:
            </p>
            <ul className="text-sm text-gray-600 mt-2 space-y-1">
              <li>• 001_create_shipments_schema.sql</li>
              <li>• 002_seed_sample_data.sql</li>
              <li>• 003_create_admin_user.sql (optional)</li>
              <li>• 004_create_admin_from_email.sql (recommended)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
