import type React from "react"
import Link from "next/link"
import { Zap, Megaphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Inter } from "next/font/google" // Assuming Inter font is used

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

// Monochrome Background Component
function MonochromeBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>

      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Geometric lines */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/3 to-transparent"></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/3 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/3 to-transparent"></div>
      </div>

      {/* Subtle moving orb */}
      <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-white/[0.01] rounded-full blur-3xl animate-pulse-slow"></div>
    </div>
  )
}

export const metadata = {
  title: "Rex Labs",

}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const navigation = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/projects", label: "Projects" },
  ]

  // Helper to determine active path (works on server and client)
  const getActivePath = () => {
    if (typeof window !== "undefined") {
      return window.location.pathname
    }
    if (typeof global !== "undefined" && global.location) {
      return global.location.pathname
    }
    return "/"
  }
  const activePath = typeof window !== "undefined" ? window.location.pathname : "/"

  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-black text-white overflow-x-hidden">
        <MonochromeBackground />

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-black/50 border-b border-white/[0.08]">
          <div className="container mx-auto px-8 py-6">
            <div className="flex items-center justify-between">
              {/* Left: Logo/Title */}
              <div className="flex items-center space-x-4">
                <span className="text-2xl font-bold tracking-tight text-white">Rex Labs</span>
                <div className="text-xs text-gray-400">Irvine, CA</div>
              </div>

              {/* Center: Navigation */}
              <div className="flex-1 flex justify-center">
                <div className="flex space-x-1 bg-white/[0.03] rounded-full p-1 backdrop-blur-xl border border-white/10">
                  {navigation.map((item) => {
                    const isActive = typeof window !== "undefined" ? window.location.pathname === item.href : false
                    return (
                      <Link key={item.href} href={item.href} passHref legacyBehavior>
                        <Button
                          variant="ghost"
                          className={`
                            px-6 py-3 rounded-full text-sm font-medium transition-all duration-500
                            ${isActive ? "bg-white text-black shadow-lg" : "text-gray-300 hover:text-white hover:bg-white/[0.05]"}
                          `}
                        >
                          {item.label}
                        </Button>
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* Right: Internship Button */}
              <div className="flex items-center space-x-4">
                <Link href="https://example.com/internships" passHref legacyBehavior>
                  <Button
                    variant="outline"
                    className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-gray-300 font-medium hover:bg-white/10 transition-colors"
                  >
                    <Megaphone className="w-4 h-4 text-gray-300 mr-2" />
                    <span>Internships Closed!</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="pt-24 relative z-10">{children}</main>
      </body>
    </html>
  )
}
