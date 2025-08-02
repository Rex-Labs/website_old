"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Code2, Shield, CheckCircle, Palette } from "lucide-react"

// Scroll-triggered animation hook
function useScrollAnimation() {
  useEffect(() => {
    const observerElements = document.querySelectorAll("[data-scroll-animate]")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement
            const animationType = element.dataset.scrollAnimate

            // Apply animation styles
            element.style.opacity = "1"
            switch (animationType) {
              case "fade-up":
                element.style.transform = "translateY(0)"
                break
              case "fade-left":
                element.style.transform = "translateX(0)"
                break
              case "fade-right":
                element.style.transform = "translateX(0)"
                break
              case "scale":
                element.style.transform = "scale(1)"
                break
              case "rotate":
                element.style.transform = "rotate(0deg)"
                break
            }
            // Stop observing once animated
            observer.unobserve(element)
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    )

    observerElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}

// Monochrome Glass Card Component
function MonochromeCard({ children, className = "", hover = true, ...props }: any) {
  return (
    <div
      className={`
        bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] rounded-2xl
        ${hover ? "hover:bg-white/[0.04] hover:border-white/[0.12] hover:shadow-2xl hover:shadow-black/50" : ""}
        transition-all duration-700 ease-out
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}

export default function ServicesPage() {
  useScrollAnimation()

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"
    return () => {
      document.documentElement.style.scrollBehavior = "auto"
    }
  }, [])

  const services = [
    {
      icon: Palette,
      title: "Professional Design",
      description: "Modern, responsive websites that look great on all devices",
      features: ["Responsive Design", "Modern UI/UX", "Brand Integration", "Mobile-First"],
    },
    {
      icon: Code2,
      title: "Custom Development",
      description: "Hand-written code tailored to your specific requirements",
      features: ["Clean Code", "Performance Optimized", "SEO Ready", "Custom Features"],
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Industry-leading security features to protect your business",
      features: ["SSL Certificates", "Security Monitoring", "Data Protection", "Regular Updates"],
    },
  ]

  const tiers = [
    {
      name: "Starter",
      tier: "Tier I",
      price: "$100 - $250",
      description: "Perfect for small businesses getting started",
      features: [
        "6 pages included",
        "Template-based development",
        "Basic features & functionality",
        "Sharp, professional design",
        "Mobile responsive",
      ],
      popular: false,
    },
    {
      name: "Professional",
      tier: "Tier II",
      price: "$250 - $350",
      description: "Advanced features for growing businesses",
      features: [
        "12 pages included",
        "Hand-written custom code",
        "Advanced features & functionality",
        "$10/month maintenance discount",
        "Enhanced performance",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      tier: "Tier III",
      price: "$500 - $1,500",
      description: "Premium solution for enterprise needs",
      features: [
        "Unlimited pages",
        "Fully hand-written code",
        "Best-in-class security",
        "Cutting-edge features",
        "Free month maintenance yearly",
        "50% off maintenance for 2 years",
      ],
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen">
      <section className="py-32 px-8">
        <div className="container mx-auto max-w-7xl">
          <div data-scroll-animate="fade-up" className="opacity-0 translate-y-8 transition-all duration-1000 ease-out">
            <div className="text-center mb-20">
              <h2 className="text-6xl font-bold mb-8 text-white">Our Services</h2>
              <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-light">
                Choose from our tiered service offerings, each designed to meet different business needs and budgets.
              </p>
            </div>
          </div>

          {/* Service Details */}
          <div className="grid lg:grid-cols-3 gap-8 mb-32">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <div
                  key={index}
                  data-scroll-animate="fade-up"
                  className="opacity-0 translate-y-8 transition-all duration-1000 ease-out"
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <MonochromeCard className="p-10 group h-full">
                    <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-500">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                    <p className="text-gray-400 mb-6 leading-relaxed font-light">{service.description}</p>
                    <div className="grid grid-cols-1 gap-3">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <CheckCircle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </MonochromeCard>
                </div>
              )
            })}
          </div>

          {/* Service Tiers */}
          <div data-scroll-animate="fade-up" className="opacity-0 translate-y-8 transition-all duration-1000 ease-out">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-bold mb-6 text-white">Service Tiers</h3>
              <p className="text-gray-400 text-lg font-light">Choose the perfect plan for your business needs</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {tiers.map((tier, index) => (
              <div
                key={index}
                data-scroll-animate="fade-up"
                className="opacity-0 translate-y-8 transition-all duration-1000 ease-out"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <MonochromeCard className={`p-8 relative h-full ${tier.popular ? "ring-1 ring-white/20" : ""}`}>
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-white text-black px-4 py-1 font-medium">Popular</Badge>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <div className="text-sm text-gray-400 font-medium mb-2">{tier.tier}</div>
                    <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                    <div className="text-3xl font-bold text-white mb-4">{tier.price}</div>
                    <p className="text-gray-400 text-sm font-light">{tier.description}</p>
                  </div>

                  <div className="space-y-3 mb-8 flex-grow">
                    {tier.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className={`w-full py-3 rounded-full font-semibold transition-all duration-300 ${
                      tier.popular
                        ? "bg-white text-black hover:bg-gray-200"
                        : "bg-white/5 hover:bg-white/10 text-white border border-white/20"
                    }`}
                  >
                    Get Started
                  </Button>
                </MonochromeCard>
              </div>
            ))}
          </div>

          {/* Maintenance Plan */}
          <div data-scroll-animate="fade-up" className="opacity-0 translate-y-8 transition-all duration-1000 ease-out">
            <MonochromeCard className="p-12 mb-16">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-4">Maintenance Plan</h3>
                  <p className="text-gray-400 mb-6 font-light">Keep your website updated and secure</p>
                  <div className="text-4xl font-bold text-white mb-6">$80/month</div>
                  <div className="space-y-3">
                    {[
                      "Minor updates & maintenance",
                      "Security monitoring",
                      "Performance optimization",
                      "Priority support",
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-500 text-sm mt-6 font-light">
                    *Major updates require repurchasing a tier based on scope
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-32 h-32 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto">
                    <Shield className="w-16 h-16 text-white" />
                  </div>
                </div>
              </div>
            </MonochromeCard>
          </div>

          {/* BYO Plan */}
          <div data-scroll-animate="fade-up" className="opacity-0 translate-y-8 transition-all duration-1000 ease-out">
            <MonochromeCard className="p-12 text-center">
              <h3 className="text-3xl font-bold text-white mb-4">BYO Plan</h3>
              <p className="text-xl text-gray-400 mb-6 font-light">Build Your Own custom solution</p>
              <div className="text-3xl font-bold text-white mb-8">Starting at $150</div>
              <div className="grid md:grid-cols-2 gap-6 mb-8 max-w-2xl mx-auto">
                {["Mix & match tier features", "Custom requirements", "Flexible pricing", "Tailored to your needs"].map(
                  (feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ),
                )}
              </div>
              <p className="text-gray-400 mb-8 font-light">
                Email us at <span className="text-white font-medium">RexLabsofficial@gmail.com</span> to discuss your
                custom requirements
              </p>
              <Button className="bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-full font-semibold">
                Get Custom Quote
              </Button>
            </MonochromeCard>
          </div>
        </div>
      </section>
    </div>
  )
}
