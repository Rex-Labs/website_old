"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Globe, Zap, Code2, X } from "lucide-react"

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

// Custom Success Pop-up Component
function SuccessPopup({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <MonochromeCard className="p-8 text-center max-w-md w-full relative animate-popup-zoom-in">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </Button>
        <h3 className="text-3xl font-bold text-white mb-4">Success!</h3>
        <p className="text-gray-300 text-lg mb-8 leading-relaxed">{message}</p>
        <Button
          onClick={onClose}
          className="bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-full font-semibold"
        >
          Got it!
        </Button>
      </MonochromeCard>
    </div>
  )
}

// Three.js Decorative Background Component
function ThreeJSProjects({ isWarping }: { isWarping: boolean }) {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<any>(null)
  const rendererRef = useRef<any>(null)
  const cameraRef = useRef<any>(null)
  const frameRef = useRef<number>()
  const THREE_ModuleRef = useRef<any>(null) // To store the dynamically imported THREE object

  const cubesRef = useRef<any[]>([])
  const warpLinesRef = useRef<any[]>([])
  const isWarpingActiveRef = useRef(false) // Internal state for warp animation

  // Store initial camera position and FOV for shake and zoom effect
  const initialCameraState = useRef({ x: 0, y: 0, z: 0, fov: 75 })

  useEffect(() => {
    if (typeof window === "undefined") return

    let scene: any, camera: any, renderer: any

    const initThreeJS = async () => {
      try {
        const THREE = await import("three")
        THREE_ModuleRef.current = THREE // Store THREE object

        if (!mountRef.current) return

        scene = new THREE.Scene()
        camera = new THREE.PerspectiveCamera(
          initialCameraState.current.fov,
          mountRef.current.clientWidth / mountRef.current.clientHeight,
          0.1,
          1000,
        )
        cameraRef.current = camera

        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
        renderer.setClearColor(0x000000, 0) // Transparent background
        mountRef.current.appendChild(renderer.domElement)
        rendererRef.current = renderer
        sceneRef.current = scene

        // Add a subtle fog for depth
        scene.fog = new THREE.FogExp2(0x000000, 0.005) // Black fog, density 0.005

        const numCubes = 200 // More cubes for denser space effect
        const cubeSpread = 150 // Wider spread for space
        const cubeMinSize = 0.5
        const cubeMaxSize = 3

        for (let i = 0; i < numCubes; i++) {
          const size = cubeMinSize + Math.random() * (cubeMaxSize - cubeMinSize)
          const material = new THREE.MeshBasicMaterial({
            // Create new material for each cube
            color: 0xffffff, // Pure white
            wireframe: true, // Outlines only
            transparent: true,
            opacity: 0.7 + Math.random() * 0.2, // Varying initial opacity for depth
          })
          const geometry = new THREE.BoxGeometry(size, size, size)
          const cube = new THREE.Mesh(geometry, material)

          cube.position.x = (Math.random() - 0.5) * cubeSpread
          cube.position.y = (Math.random() - 0.5) * cubeSpread
          cube.position.z = (Math.random() - 0.5) * cubeSpread // Initial Z spread
          cube.rotation.x = Math.random() * Math.PI
          cube.rotation.y = Math.random() * Math.PI
          cube.userData.speed = 0.05 + Math.random() * 0.05 // Individual speeds
          cube.userData.initialOpacity = material.opacity // Store initial opacity for fading
          scene.add(cube)
          cubesRef.current.push(cube)
        }

        camera.position.z = 50 // Adjust camera for wider range and more depth
        initialCameraState.current = { ...camera.position, fov: camera.fov } // Store initial state

        // Animation loop
        const animate = () => {
          frameRef.current = requestAnimationFrame(animate)

          // Camera shake and zoom effect
          if (isWarpingActiveRef.current) {
            const shakeIntensity = 0.5 // Adjust as needed
            camera.position.x = initialCameraState.current.x + (Math.random() - 0.5) * shakeIntensity
            camera.position.y = initialCameraState.current.y + (Math.random() - 0.5) * shakeIntensity
            // Zoom in effect: move camera forward
            camera.position.z = Math.max(
              initialCameraState.current.z - 40, // Max zoom-in distance
              camera.position.z - 0.8, // Zoom speed
            )
          } else {
            // Smoothly return camera to initial position and FOV
            camera.position.lerp(
              new THREE.Vector3(
                initialCameraState.current.x,
                initialCameraState.current.y,
                initialCameraState.current.z,
              ),
              0.05,
            )
            camera.fov = THREE.MathUtils.lerp(camera.fov, initialCameraState.current.fov, 0.05)
            camera.updateProjectionMatrix()
          }

          // Animate decorative cubes (flying through space with fade out)
          cubesRef.current.forEach((cube) => {
            cube.position.z -= cube.userData.speed // Move towards camera

            const resetZ = camera.position.z - cubeSpread / 2 // Point where cube resets
            const fadeStartZ = resetZ + 70 // Start fading 70 units before resetZ for a slower fade

            if (cube.position.z < fadeStartZ) {
              // Calculate fade progress: 1 (at fadeStartZ) down to 0 (at resetZ)
              const fadeProgress = Math.max(0, Math.min(1, (cube.position.z - resetZ) / (fadeStartZ - resetZ)))
              cube.material.opacity = cube.userData.initialOpacity * fadeProgress
            } else {
              cube.material.opacity = cube.userData.initialOpacity // Ensure full opacity outside fade zone
            }

            // Reset if too close (fully faded or past reset point)
            if (cube.position.z < resetZ) {
              cube.position.z = camera.position.z + cubeSpread / 2 // Reset to far end
              cube.position.x = (Math.random() - 0.5) * cubeSpread
              cube.position.y = (Math.random() - 0.5) * cubeSpread
              cube.material.opacity = cube.userData.initialOpacity // Reset opacity
            }

            cube.rotation.x += 0.001
            cube.rotation.y += 0.001
          })

          // Animate warp lines if active
          warpLinesRef.current.forEach((line) => {
            line.position.z -= 10 // Much faster movement
            line.material.opacity -= 0.01 // Slower fade out for warp lines
            if (line.position.z < camera.position.z - cubeSpread / 2 || line.material.opacity <= 0) {
              scene.remove(line)
              line.geometry.dispose()
              line.material.dispose()
              warpLinesRef.current = warpLinesRef.current.filter((l) => l !== line)
            }
          })

          renderer.render(scene, camera)
        }

        animate()
      } catch (error) {
        console.error("Three.js initialization failed:", error)
      }
    }

    initThreeJS()

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !cameraRef.current || !rendererRef.current) return
      cameraRef.current.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
      if (mountRef.current && rendererRef.current?.domElement) {
        try {
          mountRef.current.removeChild(rendererRef.current.domElement)
        } catch (error) {
          console.error("Error removing Three.js canvas:", error)
        }
      }
      window.removeEventListener("resize", handleResize)
      // Dispose of Three.js resources
      if (sceneRef.current) {
        sceneRef.current.traverse((object: any) => {
          if (object.isMesh || object.isLine) {
            object.geometry?.dispose()
            object.material?.dispose()
          }
        })
        rendererRef.current?.dispose()
      }
    }
  }, []) // Empty dependency array to run once on mount

  // Effect to trigger/stop warp animation based on prop
  useEffect(() => {
    const THREE = THREE_ModuleRef.current
    const scene = sceneRef.current
    const camera = cameraRef.current

    if (!scene || !camera || !THREE) return

    if (isWarping && !isWarpingActiveRef.current) {
      isWarpingActiveRef.current = true // Set internal flag

      const numWarpLines = 400 // More lines for a stronger effect
      const warpLineMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff,
        linewidth: 1,
        transparent: true,
        opacity: 1,
      })
      const warpLineLength = 30 // Longer lines
      const warpSpread = 200 // Wider spread for lines

      for (let i = 0; i < numWarpLines; i++) {
        const points = []
        points.push(new THREE.Vector3(0, 0, 0))
        points.push(new THREE.Vector3(0, 0, -warpLineLength))

        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        const line = new THREE.Line(geometry, warpLineMaterial)

        line.position.x = (Math.random() - 0.5) * warpSpread
        line.position.y = (Math.random() - 0.5) * warpSpread
        line.position.z = camera.position.z + warpSpread / 2 + Math.random() * warpSpread // Start far away

        scene.add(line)
        warpLinesRef.current.push(line)
      }

      // No explicit timeout here, lines will fade and remove themselves in animate loop
    } else if (!isWarping && isWarpingActiveRef.current) {
      // If isWarping becomes false externally, ensure all warp lines are removed
      warpLinesRef.current.forEach((line) => {
        scene.remove(line)
        line.geometry.dispose()
        line.material.dispose()
      })
      warpLinesRef.current = []
      isWarpingActiveRef.current = false
    }
  }, [isWarping]) // Only depend on isWarping prop

  return <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}

export default function ProjectsPage() {
  const [email, setEmail] = useState("")
  const [isWarping, setIsWarping] = useState(false) // State for warp animation
  const [showSuccessPopup, setShowSuccessPopup] = useState(false) // State for success popup
  useScrollAnimation()

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"
    return () => {
      document.documentElement.style.scrollBehavior = "auto"
    }
  }, [])

  const handleWaitlistSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (email.trim() === "") {
        alert("Please enter your email to join the waitlist!")
        return
      }

      setIsWarping(true) // Trigger warp animation

      // Simulate submission and then show popup after animation
      setTimeout(() => {
        console.log("Waitlist email:", email)
        setEmail("")
        setIsWarping(false) // Reset warp state
        setShowSuccessPopup(true) // Show success popup
      }, 1500) // Match warp duration
    },
    [email],
  )

  const handleClosePopup = useCallback(() => {
    setShowSuccessPopup(false)
  }, [])

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {/* Three.js Decorative Background */}
      <ThreeJSProjects isWarping={isWarping} />

      {/* Waitlist Form - positioned on top of the 3D background */}
      <section className="py-32 px-8 relative z-20 w-full flex justify-center">
        <div data-scroll-animate="fade-up" className="opacity-0 translate-y-8 transition-all duration-1000 ease-out">
          <MonochromeCard className="p-12 max-w-2xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-white mb-6">Stay in Touch</h3>
            <p className="text-gray-400 mb-8 font-light leading-relaxed">
              Be the first to experience our cutting-edge web technologies.
            </p>

            <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-4 mb-8">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all duration-300"
                required
              />
              <Button
                type="submit"
                className="bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-full font-semibold whitespace-nowrap"
                disabled={isWarping} // Disable button during warp
              >
                {isWarping ? "Warping..." : "Join Waitlist"}
              </Button>
            </form>

            <div className="flex justify-center space-x-8">
              {[
                { icon: Globe, label: "Web3 Ready" },
                { icon: Zap, label: "Lightning Fast" },
                { icon: Code2, label: "Open Source" },
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2 text-gray-500">
                  <item.icon className="w-4 h-4" />
                  <span className="text-xs font-light">{item.label}</span>
                </div>
              ))}
            </div>
          </MonochromeCard>
        </div>
      </section>

      {showSuccessPopup && (
        <SuccessPopup
          message="You just signed up for the next best thing since sliced bread! We will keep you updated."
          onClose={handleClosePopup}
        />
      )}
    </div>
  )
}
