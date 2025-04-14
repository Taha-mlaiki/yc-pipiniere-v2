"use client";

import type React from "react"
import { AdminSidebar } from "./_components/Sidebar"
import { DashboardHeader } from "./_components/Header"
import { useState } from "react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
  <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen bg-gray-100">
        <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
  
        <div className="flex-1 overflow-auto">
          <DashboardHeader isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

          {children}
  
        </div>
      </div>
  </div>
  )
}

