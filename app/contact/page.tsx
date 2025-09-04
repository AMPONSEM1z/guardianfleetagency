"use client";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.message || "Message sent!");
      })
      .catch(() => {
        alert("Something went wrong, please try again.");
      });
  }
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              Contact <span className="text-gold">Us</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto text-pretty">
              Get in touch with our team for shipping quotes, support, or any
              questions about our services.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-6">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl text-navy">
                  Send us a Message
                </CardTitle>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you within 24
                  hours.
                </p>
              </CardHeader>
              <CardContent className="p-0">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Smith"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john.smith@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Select name="subject">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quote">Request Quote</SelectItem>
                        <SelectItem value="support">
                          Customer Support
                        </SelectItem>
                        <SelectItem value="tracking">Tracking Issue</SelectItem>
                        <SelectItem value="partnership">
                          Business Partnership
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us how we can help you..."
                      rows={5}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-navy hover:bg-navy-light text-white font-semibold"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="p-6">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-2xl text-navy">
                    Get in Touch
                  </CardTitle>
                  <p className="text-gray-600">
                    Multiple ways to reach our team
                  </p>
                </CardHeader>
                <CardContent className="p-0 space-y-6">
                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-gold mt-1" />
                    <div>
                      <h3 className="font-semibold text-navy">Phone</h3>
                      <p className="text-gray-600">
                        1-800-GUARD-FL (1-800-482-7335)
                      </p>
                      <p className="text-sm text-gray-500">
                        Available 24/7 for customer support
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-gold mt-1" />
                    <div>
                      <h3 className="font-semibold text-navy">Email</h3>
                      <p className="text-gray-600">
                        info@guardianfleetagency.com
                      </p>
                      <p className="text-sm text-gray-500">
                        Response within 24 hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-gold mt-1" />
                    <div>
                      <h3 className="font-semibold text-navy">Headquarters</h3>
                      <p className="text-gray-600">
                        1734 Military Way
                        <br />
                        Fort Logistics, FL 32801
                        <br />
                        United States
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Clock className="h-6 w-6 text-gold mt-1" />
                    <div>
                      <h3 className="font-semibold text-navy">
                        Business Hours
                      </h3>
                      <p className="text-gray-600">
                        Monday - Friday: 6:00 AM - 8:00 PM EST
                        <br />
                        Saturday: 8:00 AM - 6:00 PM EST
                        <br />
                        Sunday: 10:00 AM - 4:00 PM EST
                      </p>
                      <p className="text-sm text-gray-500">
                        Emergency support available 24/7
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6 bg-gray-50">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-xl text-navy">
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  <Button
                    asChild
                    className="w-full bg-army-green hover:bg-army-green-light text-white"
                  >
                    <a href="/track">Track Your Package</a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-navy text-navy hover:bg-navy hover:text-white bg-transparent"
                  >
                    <a href="/services">View Our Services</a>
                  </Button>
                  {/* <Button
                    asChild
                    variant="outline"
                    className="w-full border-gold text-gold hover:bg-gold hover:text-navy bg-transparent"
                  >
                    <a href="/admin">Admin Portal</a>
                  </Button> */}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 text-pretty">
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-navy mb-2">
                How can I track my package?
              </h3>
              <p className="text-gray-600">
                Use our tracking tool on the homepage or visit the Track Package
                page. Enter your tracking number (starting with GFA) to get
                real-time updates on your shipment's location and status.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-navy mb-2">
                What are your shipping rates?
              </h3>
              <p className="text-gray-600">
                Our rates start at $12.99 for standard shipping, $24.99 for
                express delivery, and $49.99 for overnight service. Final
                pricing depends on package size, weight, and destination.
                Contact us for a detailed quote.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-navy mb-2">
                Do you offer international shipping?
              </h3>
              <p className="text-gray-600">
                Yes, we provide international shipping services to over 50
                countries worldwide. We handle all customs documentation and
                provide end-to-end tracking for international shipments.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-navy mb-2">
                What if my package is damaged or lost?
              </h3>
              <p className="text-gray-600">
                All packages include full insurance coverage. If your package is
                damaged or lost, contact our customer support team immediately.
                We'll investigate and provide compensation according to our
                guarantee policy.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
