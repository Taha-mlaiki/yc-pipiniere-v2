import type React from "react"
import Link from "next/link"
import { Leaf } from 'lucide-react'

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  description: string
}

export default function AuthLayout({ children, title, description }: AuthLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Left side - Form (scrollable) */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        <div className="flex min-h-full flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div className="mb-8">
              <Link href="/" className="flex items-center text-green-600">
                <Leaf className="h-8 w-8 mr-2" />
                <span className="text-2xl font-bold">PlantNursery</span>
              </Link>
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">{title}</h2>
              <p className="mt-2 text-sm text-gray-600">{description}</p>
            </div>

            {children}
          </div>
        </div>
      </div>

      {/* Right side - Image (fixed, non-scrollable) */}
      <div className="relative hidden w-0 flex-1 overflow-hidden lg:block">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-green-400 to-green-600 opacity-90" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Grow Your Green World With Us</h1>
          <p className="text-xl text-green-100 max-w-md">
            Join our community of plant enthusiasts and discover the perfect plants for your space.
          </p>
        </div>
      </div>
    </div>
  )
}
