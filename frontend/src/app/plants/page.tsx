import Navbar from "@/app/_components/Navbar"
import Footer from "@/app/_components/Footer"
import PageHeader from "./_components/Header"
import PlantCard from "./_components/Card"
import type { Plant } from "./types/plants"
import { handleApiError, serverFetch } from "@/lib/serverFetch"


export default async function PlantsPage() {

  let plants: Plant[];

  try {
    plants = await serverFetch.get("/plants");
  } catch (error: unknown) {
    handleApiError(error);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <PageHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Plants Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {plants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

