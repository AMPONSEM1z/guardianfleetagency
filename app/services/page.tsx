import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Clock, Truck, Globe, Shield, CheckCircle, Star, Zap } from "lucide-react"

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              Our <span className="text-gold">Services</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto text-pretty">
              Comprehensive shipping and logistics solutions designed with military precision to meet all your delivery
              needs.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Standard Shipping */}
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardHeader className="p-0 mb-6">
                <div className="flex items-center mb-4">
                  <CheckCircle className="h-10 w-10 text-army-green mr-3" />
                  <CardTitle className="text-2xl text-navy">Standard Shipping</CardTitle>
                </div>
                <p className="text-gray-600">Reliable and cost-effective delivery for everyday shipping needs.</p>
              </CardHeader>
              <CardContent className="p-0">
                <div className="mb-6">
                  <div className="text-3xl font-bold text-navy mb-2">$12.99</div>
                  <div className="text-sm text-gray-500">Starting price</div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-army-green mr-2" />
                    <span className="text-sm">3-5 business days delivery</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-army-green mr-2" />
                    <span className="text-sm">Full package insurance included</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-army-green mr-2" />
                    <span className="text-sm">Real-time tracking updates</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-army-green mr-2" />
                    <span className="text-sm">Signature confirmation</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-army-green mr-2" />
                    <span className="text-sm">Up to 50 lbs weight limit</span>
                  </li>
                </ul>
                <Button className="w-full bg-army-green hover:bg-army-green-light text-white">Choose Standard</Button>
              </CardContent>
            </Card>

            {/* Express Delivery */}
            <Card className="p-6 hover:shadow-lg transition-shadow border-gold border-2 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gold text-navy px-4 py-1 rounded-full text-sm font-semibold">Most Popular</span>
              </div>
              <CardHeader className="p-0 mb-6">
                <div className="flex items-center mb-4">
                  <Star className="h-10 w-10 text-gold mr-3" />
                  <CardTitle className="text-2xl text-navy">Express Delivery</CardTitle>
                </div>
                <p className="text-gray-600">Priority handling with guaranteed fast delivery.</p>
              </CardHeader>
              <CardContent className="p-0">
                <div className="mb-6">
                  <div className="text-3xl font-bold text-navy mb-2">$24.99</div>
                  <div className="text-sm text-gray-500">Starting price</div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-gold mr-2" />
                    <span className="text-sm">1-2 business days delivery</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-gold mr-2" />
                    <span className="text-sm">Priority handling & routing</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-gold mr-2" />
                    <span className="text-sm">Enhanced tracking with SMS alerts</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-gold mr-2" />
                    <span className="text-sm">Money-back guarantee</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-gold mr-2" />
                    <span className="text-sm">Up to 70 lbs weight limit</span>
                  </li>
                </ul>
                <Button className="w-full bg-gold text-navy hover:bg-gold-light font-semibold">Choose Express</Button>
              </CardContent>
            </Card>

            {/* Overnight Service */}
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardHeader className="p-0 mb-6">
                <div className="flex items-center mb-4">
                  <Zap className="h-10 w-10 text-navy mr-3" />
                  <CardTitle className="text-2xl text-navy">Overnight Service</CardTitle>
                </div>
                <p className="text-gray-600">Critical delivery service for urgent shipments.</p>
              </CardHeader>
              <CardContent className="p-0">
                <div className="mb-6">
                  <div className="text-3xl font-bold text-navy mb-2">$49.99</div>
                  <div className="text-sm text-gray-500">Starting price</div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-navy mr-2" />
                    <span className="text-sm">Next business day by 10:30 AM</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-navy mr-2" />
                    <span className="text-sm">Critical handling protocols</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-navy mr-2" />
                    <span className="text-sm">Direct routing - no transfers</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-navy mr-2" />
                    <span className="text-sm">Dedicated customer support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-navy mr-2" />
                    <span className="text-sm">Up to 100 lbs weight limit</span>
                  </li>
                </ul>
                <Button className="w-full bg-navy hover:bg-navy-light text-white">Choose Overnight</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">Additional Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
              Specialized solutions for unique shipping requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6">
              <CardContent className="p-0">
                <Globe className="h-12 w-12 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-navy mb-2">International Shipping</h3>
                <p className="text-gray-600 text-sm">
                  Worldwide delivery with customs handling and documentation support.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="p-0">
                <Shield className="h-12 w-12 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-navy mb-2">High-Value Items</h3>
                <p className="text-gray-600 text-sm">Specialized handling for valuable and sensitive packages.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="p-0">
                <Truck className="h-12 w-12 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-navy mb-2">Freight Services</h3>
                <p className="text-gray-600 text-sm">Large shipment solutions for business and industrial needs.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="p-0">
                <Clock className="h-12 w-12 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-navy mb-2">Same-Day Delivery</h3>
                <p className="text-gray-600 text-sm">Ultra-fast local delivery for urgent requirements.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-army-green text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Ready to Ship with Confidence?</h2>
          <p className="text-xl mb-8 text-gray-200 text-pretty">
            Choose the service that best fits your needs and experience military-grade shipping excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gold text-navy hover:bg-gold-light font-semibold">
              <Link href="/contact">Get Quote</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-army-green bg-transparent"
            >
              <Link href="/track">Track Package</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
