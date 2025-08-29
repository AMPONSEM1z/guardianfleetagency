import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Shield, Truck, Clock, Globe, CheckCircle, Star } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy to-navy-light text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
                Military-Grade <span className="text-gold">Shipping</span> & Logistics
              </h1>
              <p className="text-xl mb-8 text-gray-200 text-pretty">
                Precision. Reliability. Excellence. Your packages delivered with the discipline and commitment of
                military operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-gold text-navy hover:bg-gold-light font-semibold">
                  <Link href="/track">Track Your Package</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-gold text-gold hover:bg-gold hover:text-navy bg-transparent"
                >
                  <Link href="/services">Our Services</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="/military-truck-convoy-shipping-logistics.png"
                alt="Military-style shipping convoy"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Track Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-navy mb-8">Track Your Package</h2>
          <Card className="p-6">
            <CardContent className="p-0">
              <form action="/track" method="GET" className="flex flex-col sm:flex-row gap-4">
                <Input
                  name="trackingNumber"
                  placeholder="Enter tracking number (e.g., GFA001234567890)"
                  className="flex-1"
                  required
                />
                <Button type="submit" className="bg-army-green hover:bg-army-green-light text-white font-semibold">
                  Track Package
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">Why Choose GuardFleetAgency?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
              We bring military precision to civilian shipping, ensuring your packages are handled with the utmost care
              and delivered on time, every time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <Shield className="h-12 w-12 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-navy mb-2">Secure Transport</h3>
                <p className="text-gray-600">
                  Military-grade security protocols protect your packages throughout the entire journey.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <Clock className="h-12 w-12 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-navy mb-2">On-Time Delivery</h3>
                <p className="text-gray-600">Precision timing ensures your packages arrive exactly when promised.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <Truck className="h-12 w-12 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-navy mb-2">Real-Time Tracking</h3>
                <p className="text-gray-600">Advanced tracking technology keeps you informed every step of the way.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <Globe className="h-12 w-12 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-navy mb-2">Global Reach</h3>
                <p className="text-gray-600">Worldwide shipping network with local expertise in every region.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
              From standard shipping to express overnight delivery, we have the right solution for your logistics needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <CheckCircle className="h-8 w-8 text-army-green mr-3" />
                  <h3 className="text-xl font-semibold text-navy">Standard Shipping</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Reliable delivery within 3-5 business days with full tracking and insurance coverage.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• 3-5 business days</li>
                  <li>• Full package insurance</li>
                  <li>• Real-time tracking</li>
                  <li>• Signature confirmation</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow border-gold border-2">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <Star className="h-8 w-8 text-gold mr-3" />
                  <h3 className="text-xl font-semibold text-navy">Express Delivery</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Priority handling with guaranteed delivery within 1-2 business days.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• 1-2 business days</li>
                  <li>• Priority handling</li>
                  <li>• Enhanced tracking</li>
                  <li>• Money-back guarantee</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <Clock className="h-8 w-8 text-navy mr-3" />
                  <h3 className="text-xl font-semibold text-navy">Overnight Service</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Critical delivery service with next business day guarantee by 10:30 AM.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Next business day</li>
                  <li>• By 10:30 AM delivery</li>
                  <li>• Critical handling</li>
                  <li>• Direct routing</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-navy hover:bg-navy-light text-white font-semibold">
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-army-green text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
            Ready to Experience Military-Grade Shipping?
          </h2>
          <p className="text-xl mb-8 text-gray-200 text-pretty">
            Join thousands of satisfied customers who trust GuardFleetAgency for their most important deliveries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gold text-navy hover:bg-gold-light font-semibold">
              <Link href="/contact">Get Started Today</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-army-green bg-transparent"
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
