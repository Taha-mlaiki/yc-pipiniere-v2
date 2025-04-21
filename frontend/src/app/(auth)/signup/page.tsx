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
      console.log("Signup successful")
      router.push("/")
    } catch (err) {
      setError("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Create an Account"
      description="Sign up to start shopping or join our team"
      className="bg-gradient-to-br from-indigo-50 to-gray-100 min-h-screen flex items-center justify-center"
    >
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
        {error && (
          <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-700">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div className="space-y-3">
            <Label className="text-indigo-800 font-semibold">I want to sign up as</Label>
            <div className="flex gap-4">
              <Button
                type="button"
                onClick={() => handleRoleChange("client")}
                variant={formData.role === "client" ? "default" : "outline"}
                className={`flex-1 gap-2 rounded-lg transition-all duration-300 ${
                  formData.role === "client"
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                    : "border-indigo-300 text-indigo-600 hover:bg-indigo-50"
                }`}
              >
                <User className="h-4 w-4" />
                Client
              </Button>
              <Button
                type="button"
                onClick={() => handleRoleChange("employee")}
                variant={formData.role === "employee" ? "default" : "outline"}
                className={`flex-1 gap-2 rounded-lg transition-all duration-300 ${
                  formData.role === "employee"
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                    : "border-indigo-300 text-indigo-600 hover:bg-indigo-50"
                }`}
              >
                <Briefcase className="h-4 w-4" />
                Employee
              </Button>
            </div>
            {formErrors.role && <p className="text-sm font-medium text-red-600">{formErrors.role}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="name" className="text-indigo-800 font-semibold">Full Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg"
              aria-invalid={!!formErrors.name}
            />
            {formErrors.name && <p className="text-sm font-medium text-red-600">{formErrors.name}</p>}
          </div>

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

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-indigo-800 font-semibold">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg"
                aria-invalid={!!formErrors.confirmPassword}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 text-indigo-600 hover:text-indigo-800"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
              </Button>
            </div>
            {formErrors.confirmPassword && (
              <p className="text-sm font-medium text-red-600">{formErrors.confirmPassword}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white rounded-lg shadow-md transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-indigo-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-3 text-indigo-600 font-medium">Already have an account?</span>
            </div>
          </div>

          <div className="mt-6">
            <Button
              variant="outline"
              className="w-full border-indigo-300 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-800 rounded-lg"
              asChild
            >
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}