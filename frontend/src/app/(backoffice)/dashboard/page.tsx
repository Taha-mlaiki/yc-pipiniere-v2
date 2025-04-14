import { DashboardCards } from "./_components/Cards";
import { PopularPlantsChart } from "./_components/PopularPlantsChart";
import { CategoryDistribution } from "./_components/CategoryDistribution";
import Title from "../_components/Title";
import { handleApiError, serverFetch } from "@/lib/serverFetch";

export default async function AdminDashboard() {
  let data;

  try {
    data = await serverFetch.get("/statistics");
  } catch (error: unknown) {
    handleApiError(error);
  }

  const categoryDistributionData = data.categoryDistribution.map((item: { category_name: string; plant_count: number }) => ({
    name: item.category_name,
    value: item.plant_count,
  }));

  return (
    <main className="p-6">
      <Title
        pageName="Dashboard"
        description="Welcome back, Admin! Here's what's happening with your plant store today."
      />

      <DashboardCards
        totalOrders={data.totalOrders}
        totalPlants={data.totalPlants}
        totalCustomers={data.totalCustomers}
        totalPlantsWithOrders={data.totalPlantsWithOrders}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <PopularPlantsChart data={data.mostPopularPlants} />
        <CategoryDistribution data={categoryDistributionData} />
      </div>
    </main>
  );
}