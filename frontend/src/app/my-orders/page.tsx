import Navbar from "@/app/_components/Navbar"
import Footer from "@/app/_components/Footer"
import OrdersList from "./_components/OrderList"
import type { Metadata } from "next"
import AuthWrapper from "@/lib/AuthWrapper"

export const metadata: Metadata = {
  title: "My Orders | PlantNursery",
  description: "View your order history at PlantNursery",
}

export default function MyOrdersPage() {
  return (
    <AuthWrapper allowedRoles={["client"]}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">My Orders</h1>
            <OrdersList />
          </div>
        </main>
        <Footer />
      </div>
    </AuthWrapper>
  )
}
