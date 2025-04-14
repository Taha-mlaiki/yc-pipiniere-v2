import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function TopSellingPlants() {
  // Sample data for top selling plants
  const topSellingPlants = [
    {
      id: 1,
      name: "Aromatic Basil",
      slug: "aromatic-basil",
      price: 8.99,
      category: "Aromatic Plants",
      description: "Perfect for Mediterranean cuisine",
      image: "/placeholder.svg?height=500&width=400",
    },
    {
      id: 2,
      name: "Monstera Deliciosa",
      slug: "monstera-deliciosa",
      price: 24.99,
      category: "Indoor Plants",
      description: "Tropical plant with split leaves",
      image: "/placeholder.svg?height=500&width=400",
    },
    {
      id: 3,
      name: "French Lavender",
      slug: "french-lavender",
      price: 12.5,
      category: "Aromatic Plants",
      description: "Ideal for fragrance and garden decoration",
      image: "/placeholder.svg?height=500&width=400",
    },
    {
      id: 4,
      name: "Euphorbia Cactus",
      slug: "euphorbia-cactus",
      price: 18.99,
      category: "Cacti & Succulents",
      description: "Resistant and easy to maintain plant",
      image: "/placeholder.svg?height=500&width=400",
    },
  ]

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Best Selling Plants</h2>
            <p className="mt-2 text-lg text-gray-500">Our customers' favorites</p>
          </div>
          <Link href="#" className="text-green-600 hover:text-green-800 flex items-center font-medium">
            View all
            <ArrowRight className="ml-1 h-5 w-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
          {topSellingPlants.map((plant) => (
            <div key={plant.id} className="group">
              <div className="relative bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-80 w-full overflow-hidden">
                  <Image
                    src={plant.image || "/placeholder.svg"}
                    alt={plant.name}
                    width={400}
                    height={500}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {plant.category}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-green-600">{plant.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{plant.description}</p>
                  <div className="mt-3 flex justify-between items-center">
                    <p className="text-lg font-bold text-green-700">${plant.price.toFixed(2)}</p>
                    <Button variant="default" className="bg-green-600 hover:bg-green-700 text-white" asChild>
                      <Link href={`/plants/${plant.slug}`}>See details</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

