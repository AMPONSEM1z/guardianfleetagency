"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Shield } from "lucide-react";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-navy text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-gold" />
            <span className="text-xl font-bold text-gold">
              GuardianFleetAgency
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-gold transition-colors">
              Home
            </Link>
            <Link href="/about" className="hover:text-gold transition-colors">
              About
            </Link>
            <Link
              href="/services"
              className="hover:text-gold transition-colors"
            >
              Services
            </Link>
            <Link href="/track" className="hover:text-gold transition-colors">
              Track Package
            </Link>
            <Link href="/contact" className="hover:text-gold transition-colors">
              Contact
            </Link>
            {/* <Button asChild className="bg-navy text-navy hover:bg-gold-light font-semibold">
              <Link href="/auth/login">ALERT🚨</Link>
            </Button> */}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-gold"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-navy-light">
              <Link
                href="/"
                className="block px-3 py-2 hover:text-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 hover:text-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/services"
                className="block px-3 py-2 hover:text-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/track"
                className="block px-3 py-2 hover:text-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Track Package
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 hover:text-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="px-3 py-2">
                {/* <Button asChild className="w-full bg-gold text-navy hover:bg-gold-light font-semibold">
                  <Link href="/auth/login">Admin Portal</Link>
                </Button> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
