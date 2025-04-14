"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, Loader2, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useOrders } from "@/app/_hooks/useOrders";
import LoadingSpin from "@/app/_components/LoadingSpin"
import { Order } from "@/app/types/order";
export default function OrdersList() {
  const { orders, isLoading, error, updateOrder } = useOrders();
  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>({});
  const [cancellingOrderId, setCancellingOrderId] = useState<number | null>(null);

  const toggleOrderExpansion = (orderId: number) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const handleCancelOrder = async (order: Order) => {
    if (order.status !== "pending") return;
    setCancellingOrderId(order.id);
    try {
      await updateOrder({ ...order, status: "cancelled" });
    } catch (err) {
      console.error("Error cancelling order:", err);
    } finally {
      setCancellingOrderId(null);
    }
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "prepared":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  if (isLoading) {
    return <LoadingSpin />;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        <p>Error loading orders: {error}</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">No orders yet</h3>
        <p className="mt-1 text-gray-500">You haven't placed any orders yet.</p>
        <div className="mt-6">
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link href="/plants">Start Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <Card key={order.id} className="overflow-hidden">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                <CardDescription>
                  Placed on {formatDate(order.created_at)}
                </CardDescription>
              </div>
              <div className="mt-2 sm:mt-0 flex items-center">
                <Badge variant="outline" className={`${getStatusColor(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">
                  {order.plants.length} {order.plants.length === 1 ? "item" : "items"}
                </p>
                <div className="mt-1">
                  {!expandedOrders[order.id] && (
                    <p className="text-gray-700">
                      {order.plants
                        .slice(0, 2)
                        .map((plant) => plant.name)
                        .join(", ")}
                      {order.plants.length > 2 && ", ..."}
                    </p>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleOrderExpansion(order.id)}
                className="flex items-center text-gray-500 hover:text-gray-700"
              >
                {expandedOrders[order.id] ? (
                  <>
                    <span className="mr-1">Show less</span>
                    <ChevronUp className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    <span className="mr-1">Show details</span>
                    <ChevronDown className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>

            {expandedOrders[order.id] && (
              <div className="mt-4 border-t pt-4">
                <ul className="divide-y divide-gray-200">
                  {order.plants.map((plant) => (
                    <li key={plant.id} className="py-4 flex">
                      <div className="flex-shrink-0 w-16 h-16 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={plant.images[0].url || "/placeholder.svg"}
                          alt={plant.name}
                          width={64}
                          height={64}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="ml-4 flex-1 flex flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <Link
                                href={`/plants/${plant.slug}`}
                                className="hover:text-green-600"
                              >
                                {plant.name}
                              </Link>
                            </h3>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">{plant.category.name}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
          <CardFooter className="bg-gray-50 border-t border-gray-200 flex justify-between">
            <Button variant="outline" asChild>
              <Link href={`/plants`}>Buy Again</Link>
            </Button>
            {order.status === "pending" && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleCancelOrder(order)}
                disabled={cancellingOrderId === order.id}
              >
                {cancellingOrderId === order.id ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Cancelling...
                  </>
                ) : (
                  "Cancel Order"
                )}
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}