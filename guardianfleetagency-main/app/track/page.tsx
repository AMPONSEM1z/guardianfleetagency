"use client"

import type React from "react"
import { useSearchParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TrackingResults } from "@/components/tracking-results"
import { Search, AlertCircle, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"

interface TrackingData {
  shipment: {
    tracking_number: string
    status: string
    service_type: string
    estimated_delivery_date: string | null
    actual_delivery_date: string | null
    sender_name: string
    recipient_name: string
    recipient_address: string
    package_description: string | null
    weight_kg: number | null
    dimensions_cm: string | null
    created_at: string
  }
  tracking_events: Array<{
    id: string
    event_type: string
    event_description: string
    location: string | null
    event_timestamp: string
  }>
}

export default function TrackPage() {
  const searchParams = useSearchParams()
  const [trackingNumber, setTrackingNumber] = useState("")
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const urlTrackingNumber = searchParams.get("trackingNumber")
    if (urlTrackingNumber) {
      setTrackingNumber(urlTrackingNumber)
      handleSearch(urlTrackingNumber)
    }
  }, [searchParams])

  const handleSearch = async (trackingNum: string) => {
    if (!trackingNum.trim()) {
      setError("Please enter a tracking number")
      return
    }

    setIsLoading(true)
    setError(null)
    setTrackingData(null)

    try {
      const response = await fetch(`/api/track/${trackingNum.trim()}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch tracking information")
      }

      setTrackingData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await handleSearch(trackingNumber)
  }

  const handleQuickSearch = (sampleNumber: string) => {
    setTrackingNumber(sampleNumber)
    handleSearch(sampleNumber)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              Track Your <span className="text-gold">Package</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto text-pretty">
              Enter your tracking number below to get real-time updates on your shipment's location and delivery status.
            </p>
          </div>
        </div>
      </section>

      {/* Tracking Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8">
            <CardHeader className="text-center p-0 mb-8">
              <CardTitle className="text-2xl text-navy">Enter Tracking Information</CardTitle>
              <p className="text-gray-600">Your tracking number starts with "GFA" followed by 12 digits</p>
            </CardHeader>
            <CardContent className="p-0">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="trackingNumber" className="text-lg">
                    Tracking Number
                  </Label>
                  <div className="flex gap-4 mt-2">
                    <Input
                      id="trackingNumber"
                      placeholder="GFA001234567890"
                      className="flex-1 text-lg p-4"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      disabled={isLoading}
                    />
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isLoading}
                      className="bg-army-green hover:bg-army-green-light text-white font-semibold px-8"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                          Tracking...
                        </>
                      ) : (
                        <>
                          <Search className="h-5 w-5 mr-2" />
                          Track
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Error Message */}
          {error && (
            <Card className="mt-6 p-6 border-red-200 bg-red-50">
              <div className="flex items-center space-x-3">
                <AlertCircle className="h-6 w-6 text-red-500" />
                <div>
                  <h3 className="font-semibold text-red-800">Tracking Error</h3>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            </Card>
          )}

          {/* Tracking Results */}
          {trackingData && (
            <div className="mt-12">
              <TrackingResults data={trackingData} />
            </div>
          )}

          {/* Sample Data Info */}
          {!trackingData  && !error && !isLoading && (
            <div className="mt-12">
              <Card className="p-6 bg-gray-50">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-lg text-navy">Provide your  Tracking Number </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <button
                        onClick={() => handleQuickSearch("GFA001234567890")}
                        className="bg-white px-3 py-2 rounded border text-sm hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        xxxxxxxxxxxx
                      </button>
                      <p className="text-xs text-gray-600 mt-1">In Transit</p>
                    </div>
                    <div className="text-center">
                      <button
                        onClick={() => handleQuickSearch("GFA001234567891")}
                        className="bg-white px-3 py-2 rounded border text-sm hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        xxxxxxxxxxxx
                      </button>
                      <p className="text-xs text-gray-600 mt-1">Out for Delivery</p>
                    </div>
                    <div className="text-center">
                      <button
                        onClick={() => handleQuickSearch("GFA001234567892")}
                        className="bg-white px-3 py-2 rounded border text-sm hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        xxxxxxxxxxxx
                      </button>
                      <p className="text-xs text-gray-600 mt-1">Delivered</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Help Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-navy mb-6">Need Help?</h2>
          <p className="text-lg text-gray-600 mb-8 text-pretty">
            Can't find your tracking number or having issues with tracking? Our customer support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gold text-navy hover:bg-gold-light font-semibold">
              <a href="/contact">Contact Support</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-navy text-navy hover:bg-navy hover:text-white bg-transparent"
            >
              <a href="tel:1-800-482-7335">Call 1-800-GUARD-FL</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
