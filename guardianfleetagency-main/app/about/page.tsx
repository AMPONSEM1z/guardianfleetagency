import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, Award, Target } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              About <span className="text-gold">GuardianFleetAgency</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto text-pretty">
              Founded on military principles of precision, discipline, and
              unwavering commitment to excellence in logistics and shipping
              services.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6 text-pretty">
                At GuardianFleetAgency, we bring military-grade precision to
                civilian shipping and logistics. Our mission is to provide
                unparalleled reliability, security, and efficiency in package
                delivery services.
              </p>
              <p className="text-lg text-gray-600 text-pretty">
                Every package is treated as a critical mission, handled with the
                same discipline and attention to detail that defines military
                operations worldwide.
              </p>
            </div>
            <div>
              <img
                src="/military-logistics-team-professional-shipping-ware.png"
                alt="Professional logistics team"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
              These principles guide every decision we make and every service we
              provide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6">
              <CardContent className="p-0">
                <Shield className="h-16 w-16 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-navy mb-3">
                  Security
                </h3>
                <p className="text-gray-600">
                  Every package is protected with military-grade security
                  protocols from pickup to delivery.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="p-0">
                <Target className="h-16 w-16 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-navy mb-3">
                  Precision
                </h3>
                <p className="text-gray-600">
                  Exact timing, accurate tracking, and precise delivery to the
                  right location every time.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="p-0">
                <Users className="h-16 w-16 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-navy mb-3">
                  Teamwork
                </h3>
                <p className="text-gray-600">
                  Our coordinated team approach ensures seamless operations
                  across all service levels.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="p-0">
                <Award className="h-16 w-16 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-navy mb-3">
                  Excellence
                </h3>
                <p className="text-gray-600">
                  We strive for perfection in every aspect of our service
                  delivery and customer experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Our History
            </h2>
          </div>

          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1">
                <h3 className="text-2xl font-bold text-navy mb-4">
                  Founded on Military Excellence
                </h3>
                <p className="text-gray-600 text-pretty">
                  GuardianFleetAgency was established by former military
                  logistics officers who recognized the need for precision and
                  reliability in civilian shipping services. Drawing from
                  decades of experience in military supply chain management, we
                  built a company that operates with the same discipline and
                  commitment to mission success.
                </p>
              </div>
              <div className="order-1 lg:order-2">
                <img
                  src="/military-founders-logistics-officers-professional-.png"
                  alt="Company founders"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <img
                  src="/modern-shipping-facility-technology-warehouse.png"
                  alt="Modern shipping facility"
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-navy mb-4">
                  Innovation & Growth
                </h3>
                <p className="text-gray-600 text-pretty">
                  Today, we operate state-of-the-art facilities equipped with
                  advanced tracking technology and employ a team of dedicated
                  professionals who share our commitment to excellence. Our
                  network spans globally while maintaining the personal touch
                  and reliability that sets us apart.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-army-green text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              By the Numbers
            </h2>
            <p className="text-xl text-gray-200 text-pretty">
              Our track record speaks for itself
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2">
                99.8%
              </div>
              <div className="text-lg">On-Time Delivery</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2">
                500K+
              </div>
              <div className="text-lg">Packages Delivered</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2">
                50+
              </div>
              <div className="text-lg">Countries Served</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2">
                24/7
              </div>
              <div className="text-lg">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
