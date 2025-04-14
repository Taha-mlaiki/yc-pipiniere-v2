"use client"

import { useState, type FormEvent, type ChangeEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { Eye, EyeOff, Loader2, User, Briefcase } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import AuthLayout from "../_components/AuthLayout"
import { clientFetch } from "@/lib/clientFetch"

const signupSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
    role: z.enum(["client", "employee"], {
      required_error: "Please select a role",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type SignupFormData = z.infer<typeof signupSchema>

export default function SignupForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "client",
  })
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof SignupFormData, string>>>({})

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error for this field when user types
    if (formErrors[name as keyof SignupFormData]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleRoleChange = (value: string) => {
    if (value === "client" || value === "employee") {
      setFormData((prev) => ({ ...prev, role: value as "client" | "employee" }))

      if (formErrors.role) {
        setFormErrors((prev) => ({ ...prev, role: undefined }))
      }
    }
  }

  const validateForm = (): boolean => {
    try {
      signupSchema.parse(formData)
      setFormErrors({})
      return true
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors: Partial<Record<keyof SignupFormData, string>> = {}
        err.errors.forEach((error) => {
          const path = error.path[0] as keyof SignupFormData
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
        const roleId = formData.role === "client" ? 3 : 2
        await clientFetch.post("/auth/signup", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.confirmPassword,
          role_id: roleId,
        })
  
        router.push("/")
    } catch (err) {
      setError("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout title="Create an account" description="Sign up for account to start shopping or join our team">
      <div className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="space-y-3">
            <Label>I want to sign up as</Label>
            <div className="flex gap-4">
              <Button
                type="button"
                onClick={() => handleRoleChange("client")}
                variant={formData.role === "client" ? "default" : "outline"}
                className={`flex-1 gap-2 ${formData.role === "client" ? "bg-green-600 hover:bg-green-700" : ""}`}
              >
                <User className="h-4 w-4" />
                Client
              </Button>
              <Button
                type="button"
                onClick={() => handleRoleChange("employee")}
                variant={formData.role === "employee" ? "default" : "outline"}
                className={`flex-1 gap-2 ${formData.role === "employee" ? "bg-green-600 hover:bg-green-700" : ""}`}
              >
                <Briefcase className="h-4 w-4" />
                Employee
              </Button>
            </div>
            {formErrors.role && <p className="text-sm font-medium text-red-500">{formErrors.role}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              aria-invalid={!!formErrors.name}
            />
            {formErrors.name && <p className="text-sm font-medium text-red-500">{formErrors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              aria-invalid={!!formErrors.email}
            />
            {formErrors.email && <p className="text-sm font-medium text-red-500">{formErrors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                aria-invalid={!!formErrors.password}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
              </Button>
            </div>
            {formErrors.password && <p className="text-sm font-medium text-red-500">{formErrors.password}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                aria-invalid={!!formErrors.confirmPassword}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
              </Button>
            </div>
            {formErrors.confirmPassword && (
              <p className="text-sm font-medium text-red-500">{formErrors.confirmPassword}</p>
            )}
          </div>

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </Button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-gray-100 px-2 text-gray-500">Already have an account?</span>
            </div>
          </div>

          <div className="mt-6">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/login">Sign in</Link>
            </Button>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}
