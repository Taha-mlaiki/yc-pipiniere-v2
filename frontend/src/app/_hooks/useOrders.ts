"use client"

import { useState, useEffect } from "react"
import type { Order } from "../types/order"
import { clientFetch } from "@/lib/clientFetch"

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true)
        const { data } = await clientFetch.get("/orders")
        setOrders(data)
        setIsLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch orders")
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const updateOrder = async (updatedOrder: Order) => {
    try {
      const updatedData = {
        status: updatedOrder.status,
      }

      const { data: updated } = await clientFetch.put(`/orders/${updatedOrder.id}`, updatedData)

      setOrders((prev) => prev.map((order) => (order.id === updated.id ? updated : order)))

      return updated
    } catch (err) {
      throw new Error("Failed to update order")
    }
  }

  return {
    orders,
    isLoading,
    error,
    updateOrder,
  }
}
