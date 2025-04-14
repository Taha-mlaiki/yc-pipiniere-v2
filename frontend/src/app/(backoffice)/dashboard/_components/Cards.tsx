"use client"

import { Users, ShoppingBag, Leaf, Sprout } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DashboardCardsProps {
  totalOrders: number
  totalPlants: number
  totalCustomers: number
  totalPlantsWithOrders: number
}

export function DashboardCards({ totalOrders, totalPlants, totalCustomers, totalPlantsWithOrders }: DashboardCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="gap-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          <Users className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCustomers.toLocaleString()}</div>
          <p className="text-xs text-gray-500">Total registered clients</p>
        </CardContent>
      </Card>

      <Card className="gap-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          <ShoppingBag className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalOrders.toLocaleString()}</div>
          <p className="text-xs text-gray-500">All orders placed</p>
        </CardContent>
      </Card>

      <Card className="gap-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Plants in Orders</CardTitle>
          <Leaf className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPlantsWithOrders.toLocaleString()}</div>
          <p className="text-xs text-gray-500">Unique plants ordered</p>
        </CardContent>
      </Card>

      <Card className="gap-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Plants</CardTitle>
          <Sprout className="h-4 w-4 text-teal-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPlants.toLocaleString()}</div>
          <p className="text-xs text-gray-500">All available plants</p>
        </CardContent>
      </Card>
    </div>
  )
}