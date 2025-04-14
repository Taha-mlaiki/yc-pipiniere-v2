import AuthWrapper from "@/lib/AuthWrapper"
import Title from "../_components/Title"
import OrdersTable from "./_components/OrdersTable"

export default async function OrdersPage() {

  return (
    <AuthWrapper allowedRoles={["admin", "employee"]}>
        <main className="p-6">
            <div className="mb-6">
                <Title
                pageName="Orders Management"
                description="Track and manage customer orders, update status, and view order details."
                />
            </div>

            <OrdersTable />
        </main>
    </AuthWrapper>
  )
}
