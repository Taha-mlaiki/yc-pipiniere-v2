"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Package, Loader2 } from "lucide-react"
import { OrderDetailsDialog } from "./OrderDetailsDialog"
import type { Order } from "@/app/types/order"
import { formatDate } from "../_utils/formatDate"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import LoadingSpin from "../../../_components/LoadingSpin"
import { useOrders } from "@/app/_hooks/useOrders"

export default function OrdersTable() {
  const { orders, updateOrder, isLoading, error } = useOrders()
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [updatingOrderId, setUpdatingOrderId] = useState<number | null>(null)

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order)
    setIsDetailsOpen(true)
  }

  const handleStatusChange = async (order: Order, newStatus: Order["status"]) => {
    if (order.status === newStatus) return

    setUpdatingOrderId(order.id)
    try {
      await updateOrder({ ...order, status: newStatus })
    } catch (error) {
      console.error("Error updating order status:", error)
    } finally {
      setUpdatingOrderId(null)
    }
  }

  const OrderStatuses = ["pending", "prepared", "delivered"];

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "prepared":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
    }
  }

  if (isLoading) {
    return (
      <LoadingSpin/>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        <p>Error loading orders: {error}</p>
        <Button variant="outline" className="mt-4">
          Retry
        </Button>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12 border rounded-md bg-gray-50">
        <Package className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">No orders yet</h3>
        <p className="mt-1 text-gray-500">Orders will appear here once customers start placing them.</p>
      </div>
    )
  }

  return (
    <>
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Plants</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">#{order.id}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{order.client.name}</div>
                    <div className="text-sm text-gray-500">{order.client.email}</div>
                  </div>
                </TableCell>
                <TableCell>{order.plants.length} plants</TableCell>
                <TableCell>{formatDate(order.created_at)}</TableCell>
                <TableCell>
                  {updatingOrderId === order.id ? (
                    <div className="flex items-center">
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      <span>Updating...</span>
                    </div>
                  ) : (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Badge variant="outline" className={`${getStatusColor(order.status)} cursor-pointer`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        {OrderStatuses.map((status) => {
                            return status != order.status && (<DropdownMenuItem
                                key={status}
                                onClick={() => handleStatusChange(order, status as Order["status"])}
                                className={order.status === status ? "bg-gray-100" : ""}
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </DropdownMenuItem>)
                        })}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewDetails(order)}
                    className="flex items-center text-gray-500 hover:text-gray-700"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedOrder && (
        <OrderDetailsDialog
          order={selectedOrder}
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
        />
      )}
    </>
  )
}
