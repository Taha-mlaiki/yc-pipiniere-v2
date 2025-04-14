"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { BarChart3, Leaf, ShoppingCart, Users, Settings, HelpCircle, LogOut, ChevronLeft, Home } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { clientFetch } from "@/lib/clientFetch"

interface AdminSidebarProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export function AdminSidebar({ isOpen, setIsOpen }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()


  const handleLogout = async() => {
    await clientFetch.post("/logout");

    router.push("/login");
  }

  const routes = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: BarChart3,
    },
    {
      title: "Plants",
      href: "/plants1",
      icon: Leaf,
    },
    {
      title: "Orders",
      href: "/orders",
      icon: ShoppingCart,
    }
  ]

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 min-w-60 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-auto",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <Link href="/admin/dashboard" className="flex items-center">
              <Leaf className="h-6 w-6 text-green-600" />
              <span className="ml-2 text-lg font-semibold text-gray-900">PlantAdmin</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="lg:hidden">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-auto py-4 px-3">

            <div className="mt-6">
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Management</h3>
              <div className="mt-2 space-y-1">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                      pathname === route.href
                        ? "text-green-700 bg-green-50"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                    )}
                  >
                    <route.icon className="mr-3 h-5 w-5" />
                    <span>{route.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-200">
            <Button variant="outline" onClick={handleLogout} className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
              <LogOut className="mr-3 h-5 w-5" />
              <span>Log out</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden" onClick={() => setIsOpen(false)} />
      )}
    </>
  )
}

