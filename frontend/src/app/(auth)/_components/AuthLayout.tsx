import type React from "react"
import Link from "next/link"
import { Leaf } from 'lucide-react'

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  description: string
  className?: string
}

export default function AuthLayout({ children, title, description, className }: AuthLayoutProps) {
  return (
    <div className={`min-h-screen flex items-center max-w-xl w-full justify-center bg-cover bg-center relative ${className}`} style={{
      backgroundImage: `url('https://images.unsplash.com/photo-1512428813834-c177b01b2393?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`
    }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-blue-900 bg-opacity-50 backdrop-blur-sm" />
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-md mx-auto p-6 sm:p-8">
        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6 backdrop-blur-lg bg-opacity-95">
          {/* Logo and Header */}
          <div className="text-center">
            <Link href="/" className="flex items-center justify-center text-blue-600 hover:text-blue-700 transition-colors">
              <Leaf className="h-10 w-10 mr-2" />
              <span className="text-3xl font-extrabold tracking-tight">PlantNursery</span>
            </Link>
            <h2 className="mt-4 text-2xl font-bold text-gray-800">{title}</h2>
            <p className="mt-2 text-sm text-gray-600">{description}</p>
          </div>

          {/* Form Content */}
          {children}
        </div>

        {/* Footer Text */}
        <div className="mt-6 text-center">
          <p className="text-white text-opacity-90 text-base font-medium">
            Grow your green world with PlantNursery. Discover plants that thrive in your space.
          </p>
        </div>
      </div>
    </div>
  )
}