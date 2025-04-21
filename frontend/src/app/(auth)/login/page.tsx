"use client"

import { useState, type FormEvent, type ChangeEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { Eye, EyeOff, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import AuthLayout from "../_components/AuthLayout"
import { clientFetch } from "@/lib/clientFetch"

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  })
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({})

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (formErrors[name as keyof LoginFormData]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    try {
      loginSchema.parse(formData)
      setFormErrors({})
      return true
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors: Partial<Record<keyof LoginFormData, string>> = {}
        err.errors.forEach((error) => {
          const path = error.path[0] as keyof LoginFormData
          errors[path] = error.message
        })
        setFormErrors(errors)
      }
      return false
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsLoading(true)
    setError(null)

    try {
      await clientFetch.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      })
      router.push("/")
    } catch (err) {
      setError("Invalid email or password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout title="Welcome Back" description="Enter your credentials to access your account">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8 space-y-6 backdrop-blur-lg bg-opacity-95">
        {error && (
          <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-700">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-indigo-800 font-semibold">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg"
              aria-invalid={!!formErrors.email}
            />
            {formErrors.email && <p className="text-sm font-medium text-red-600">{formErrors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-indigo-800 font-semibold">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg"
                aria-invalid={!!formErrors.password}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 text-indigo-600 hover:text-indigo-800"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
              </Button>
            </div>
            {formErrors.password && <p className="text-sm font-medium text-red-600">{formErrors.password}</p>}
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white rounded-lg shadow-md transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-indigo-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-3 text-indigo-600 font-medium">Don't have an account?</span>
            </div>
          </div>

          <div className="mt-6">
            <Button
              variant="outline"
              className="w-full border-indigo-300 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-800 rounded-lg"
              asChild
            >
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}