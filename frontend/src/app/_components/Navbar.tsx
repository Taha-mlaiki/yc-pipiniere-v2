"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, LogOut } from "lucide-react"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { usePathname, useRouter } from "next/navigation"
import { clientFetch } from "@/lib/clientFetch"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const handleLogout = async () => {
    await clientFetch.post("/logout")
    router.push("/login")
    setIsOpen(false) // Close mobile menu on logout
  }

  const links = [
    { name: "Home", url: "/" },
    { name: "Plants", url: "/plants" },
    { name: "My Orders", url: "/my-orders" },
  ]

  const isActive = (url: string) => {
    if (url === "/plants" && pathname?.startsWith("/plants")) {
      return true
    }
    return pathname === url
  }

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-green-600">PlantNursery</h1>
            </div>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-8">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.url}
                className={`${
                  isActive(link.url) ? "text-green-600" : "text-gray-700"
                } hover:text-green-600 px-3 py-2 font-medium`}
              >
                {link.name}
              </Link>
            ))}
            <Button
              className="text-white bg-red-400 hover:bg-red-500 flex items-center"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
          </div>

          <div className="flex items-center md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button className="md:hidden text-gray-700 hover:text-green-600">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[250px] sm:w-[300px]">
                <SheetTitle aria-description="Links"></SheetTitle>
                <div className="flex flex-col gap-6 mt-6">
                  {links.map((link) => (
                    <Link
                      key={link.name}
                      href={link.url}
                      className={`${
                        isActive(link.url) ? "text-green-600" : "text-gray-700"
                      } hover:text-green-600 px-3 py-2 font-medium`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Button
                    className="text-white bg-red-400 hover:bg-red-500 flex items-center justify-start px-3"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Logout
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}