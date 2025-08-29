import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Shield, Mail, CheckCircle } from "lucide-react"

export default function SignUpSuccessPage() {
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
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl text-navy">Account Created</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <Mail className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <p className="text-sm text-blue-800">
                Please check your email and click the confirmation link to verify your account.
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Admin Access Required:</strong> Your account has been created, but admin privileges must be
                granted by an existing administrator.
              </p>
            </div>

            <div className="space-y-2 pt-4">
              <Button asChild className="w-full bg-army-green hover:bg-army-green-light text-white">
                <Link href="/auth/login">Try Signing In</Link>
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
