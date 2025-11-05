import Link from "next/link";
import { Shield, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-gold" />
              <span className="text-xl font-bold text-gold">
                guardianfleetagency
              </span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Military-grade shipping and logistics services with precision,
              reliability, and unwavering commitment to excellence. Your
              packages are our mission.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-gold" />
                <span>1-800-GUARD-FL</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-gold" />
                <span>info@guardianfleetagency.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/track"
                  className="text-gray-300 hover:text-gold transition-colors"
                >
                  Track Package
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-300 hover:text-gold transition-colors"
                >
                  Our Services
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-gold transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-gold transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-gold mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">Standard Shipping</li>
              <li className="text-gray-300">Express Delivery</li>
              <li className="text-gray-300">Overnight Service</li>
              <li className="text-gray-300">International</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-light mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2000-2025 GuardianFleetAgency. All rights reserved. |
            <Link
              href="/privacy"
              className="hover:text-gold transition-colors ml-1"
            >
              Privacy Policy
            </Link>{" "}
            |
            <Link
              href="/terms"
              className="hover:text-gold transition-colors ml-1"
            >
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
