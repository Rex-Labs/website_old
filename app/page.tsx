"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Code2,
  Shield,
  Users,
  Mail,
  MapPin,
  Linkedin,
  Twitter,
  Github,
  Play,
  Rocket,
  Palette,
  ArrowDown,
} from "lucide-react"

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

export default function HomePage() {
  useScrollAnimation()

  useEffect(() => {
    // Enable smooth scrolling for the entire document
    document.documentElement.style.scrollBehavior = "smooth"
    return () => {
      document.documentElement.style.scrollBehavior = "auto"
    }
  }, [])

  const servicesPreview = [
    {
      icon: Palette,
      title: "Professional Design",
      description: "Modern, responsive websites that look great on all devices",
    },
    {
      icon: Code2,
      title: "Custom Development",
      description: "Hand-written code tailored to your specific requirements",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Industry-leading security features to protect your business",
    },
  ]

  const team = [
    {
      name: "Om Dwivedi",
      role: "Co-Founder",
      expertise: "Full-Stack Development & Strategy",
    },
    {
      name: "Aditya Singh",
      role: "Co-Founder",
      expertise: "Frontend Design & Marketing",
    },
    {
      name: "Yuvraj Singh",
      role: "Co-Founder",
      expertise: "Backend Development & Operations",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-8 relative">
        <div className="container mx-auto text-center max-w-6xl">
          <div data-scroll-animate="fade-up" className="opacity-0 translate-y-8 transition-all duration-1000 ease-out">
            <div className="inline-flex items-center space-x-3 mb-8 px-6 py-3 bg-white/[0.03] border border-white/[0.08] rounded-full backdrop-blur-xl">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300 font-medium">Website Commission Service</span>
              <Rocket className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div
            data-scroll-animate="scale"
            className="opacity-0 scale-95 transition-all duration-1200 ease-out delay-200"
          >
            <h1 className="text-8xl md:text-9xl font-black mb-8 tracking-tighter">
              <span className="text-white">Rex</span>
              <span className="text-gray-400 ml-4">Labs</span>
            </h1>
          </div>

          <div
            data-scroll-animate="fade-up"
            className="opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-400"
          >
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              We craft stunning, modern websites that help your business stand out. From startups to enterprises, we
              bring your digital vision to life with cutting-edge design and development.
            </p>
          </div>

          <div
            data-scroll-animate="fade-up"
            className="opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-600"
          >
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
              <Button
                className="bg-white text-black hover:bg-gray-200 px-10 py-4 text-lg rounded-full font-semibold transition-all duration-300 group"
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-10 py-4 text-lg rounded-full font-semibold bg-transparent group"
              >
                <Play className="mr-2 w-5 h-5" />
                View Our Work
              </Button>
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            data-scroll-animate="fade-up"
            className="opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-800"
          >
            <div className="flex flex-col items-center space-y-4">
              <span className="text-gray-500 text-sm">Scroll to explore</span>
              <ArrowDown className="w-5 h-5 text-gray-500 animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-32 px-8">
        <div className="container mx-auto max-w-6xl">
          <div data-scroll-animate="fade-up" className="opacity-0 translate-y-8 transition-all duration-1000 ease-out">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold mb-6 text-white">What We Do</h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light">
                Three core services that power modern web experiences
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {servicesPreview.map((service, index) => {
              const Icon = service.icon
              return (
                <div
                  key={index}
                  data-scroll-animate="fade-up"
                  className="opacity-0 translate-y-8 transition-all duration-1000 ease-out"
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <MonochromeCard className="p-10 text-center group h-full">
                    <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-500">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">{service.description}</p>
                    <div className="space-y-2">
                      {/* Removed specific features here as they are on the services page */}
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                        <span className="text-gray-500 text-xs">Learn more on Services page</span>
                      </div>
                    </div>
                  </MonochromeCard>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 px-8 border-t border-white/[0.05]">
        <div className="container mx-auto max-w-6xl">
          <div data-scroll-animate="fade-up" className="opacity-0 translate-y-8 transition-all duration-1000 ease-out">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold mb-6 text-white">Meet the Team</h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light">
                Three passionate developers building the future of web development
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                data-scroll-animate="fade-up"
                className="opacity-0 translate-y-8 transition-all duration-1000 ease-out"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <MonochromeCard className="p-8 text-center group">
                  <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-3xl mx-auto mb-6 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-500">
                    <Users className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-gray-400 mb-3 font-medium">{member.role}</p>
                  <p className="text-gray-500 text-sm">{member.expertise}</p>
                </MonochromeCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-8 border-t border-white/[0.05]">
        <div className="container mx-auto max-w-4xl text-center">
          <div data-scroll-animate="fade-up" className="opacity-0 translate-y-8 transition-all duration-1000 ease-out">
            <h3 className="text-3xl font-bold mb-8 text-white">Ready to Start Your Project?</h3>
            <p className="text-gray-400 mb-8 text-lg font-light">
              Get in touch with us to discuss your website needs and get a custom quote.
            </p>


            {/* Contact Us Form */}
            <form className="max-w-2xl mx-auto space-y-6 text-left bg-white/5 p-8 rounded-2xl border border-white/10 shadow-xl mb-12">
              <div>
                <label htmlFor="name" className="block text-white font-medium mb-2">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-black/60 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-white font-medium mb-2">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-black/60 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="you@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-white font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-black/60 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="Tell us about your project..."
                />
              </div>
              <div className="text-center">
                <Button type="submit" className="bg-white text-black hover:bg-gray-200 px-10 py-4 text-lg rounded-full font-semibold transition-all duration-300">
                  Send Message
                </Button>
              </div>
            </form>

            {/* Contact Info & Socials */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-12 mb-8">
              <div className="flex items-center space-x-3">
                <Mail className="w-6 h-6 text-gray-400" />
                <span className="text-white font-medium">RexLabsofficial@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-6 h-6 text-gray-400" />
                <span className="text-white font-medium">Irvine, California</span>
              </div>
            </div>

            <div className="flex justify-center space-x-6">
              {[
                { Icon: Github, href: "#" },
                { Icon: Linkedin, href: "#" },
                { Icon: Twitter, href: "#" },
              ].map(({ Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  className="w-14 h-14 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-center hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 group"
                >
                  <Icon className="w-7 h-7 text-gray-400 group-hover:text-white transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
