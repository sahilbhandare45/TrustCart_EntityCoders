"use client"

import Link from "next/link"
import { Bot, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Bot className="w-8 h-8 text-primary-400 mr-2" />
              <span className="text-xl font-bold">TrustKart</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              AI-powered e-commerce platform revolutionizing online shopping with intelligent 
              recommendations and transparent pricing.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <Button key={i} variant="ghost" size="sm" className="p-2 text-slate-400 hover:text-white hover:bg-slate-800">
                  <Icon className="w-5 h-5" />
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "FAQ", href: "/faq" },
                { label: "Terms of Service", href: "/terms" },
                { label: "Privacy Policy", href: "/privacy" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <Button variant="link" className="p-0 h-auto text-slate-400 hover:text-white">
                      {link.label}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Service</h3>
            <ul className="space-y-2">
              {[
                { label: "Support Center", href: "/support" },
                { label: "Returns & Exchanges", href: "/returns" },
                { label: "Shipping Info", href: "/shipping" },
                { label: "Track Your Order", href: "/track" },
                { label: "Size Guide", href: "/size-guide" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <Button variant="link" className="p-0 h-auto text-slate-400 hover:text-white">
                      {link.label}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Categories</h3>
            <ul className="space-y-2">
              {[
                { label: "Electronics", href: "/category/electronics" },
                { label: "Fashion", href: "/category/fashion" },
                { label: "Home & Kitchen", href: "/category/home-kitchen" },
                { label: "Sports & Fitness", href: "/category/sports-fitness" },
                { label: "Books & Media", href: "/category/books-media" },
                { label: "Beauty & Personal Care", href: "/category/beauty-personal-care" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <Button variant="link" className="p-0 h-auto text-slate-400 hover:text-white">
                      {link.label}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
            <p className="text-slate-400 mb-6">
              Get the latest deals and AI-powered recommendations delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 focus:border-primary-500"
              />
              <Button className="bg-primary-600 hover:bg-primary-700 font-semibold">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h4 className="text-sm font-semibold mb-2">Secure Payment Methods</h4>
              <div className="flex space-x-4 text-slate-400 text-2xl">
                <span>💳</span>
                <span>🏦</span>
                <span>📱</span>
                <span>💰</span>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-slate-400 text-sm">
                © 2025 TrustKart. All rights reserved.
              </p>
              <p className="text-slate-500 text-xs mt-1">
                Empowered by AI for Transparent Shopping
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
