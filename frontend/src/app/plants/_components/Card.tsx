import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Plant } from "../types/plants"
import type { JSX } from "react"

interface PlantCardProps {
  plant: Plant
}

export default function PlantCard({ plant }: PlantCardProps): JSX.Element {
  return (
    <div className="group bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={plant.images[0].url || "/placeholder.svg"}
          alt={plant.name}
          width={400}
          height={500}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {plant.category_name}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 group-hover:text-green-600">{plant.name}</h3>
        <p className="mt-1 text-sm text-gray-500">Perfect for Mediterranean cuisine</p>
        <div className="mt-3 flex justify-between items-center">
          <Button variant="default" className="bg-green-600 hover:bg-green-700 text-white" asChild>
            <Link href={`/plants/${plant.slug}`}>See details</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

