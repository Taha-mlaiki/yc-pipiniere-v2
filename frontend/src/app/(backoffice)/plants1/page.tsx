import AuthWrapper from "@/lib/AuthWrapper";
import PlantsPage from "./page.client";

export default async function Page() {
  return (
    <AuthWrapper allowedRoles={["admin", "employee"]}>
        <PlantsPage/>
    </AuthWrapper>
  )
}
