"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Plant } from "../../types/plants"

export default function PlantDetails({ plant }: { plant: Plant}) {
  const [activeImage, setActiveImage] = useState(0)

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb and back button */}
        <div className="mb-6">
          <Link href="/plants" className="inline-flex items-center text-sm text-gray-600 hover:text-green-600">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all plants
          </Link>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <div className="flex flex-col">
            <div className="overflow-hidden rounded-lg bg-gray-100 mb-4">
              <img
                src={plant.images[activeImage].url || "/placeholder.svg"}
                alt={plant.name}
                width={600}
                height={600}
                className="h-full w-full object-cover object-center"
              />
            </div>
            {plant.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {plant.images.map((image, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`overflow-hidden rounded-lg ${
                      activeImage === i ? "ring-2 ring-green-600" : "bg-gray-100"
                    }`}
                  >
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={`${plant.name} view ${i + 1}`}
                      width={150}
                      height={150}
                      className="h-24 w-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Plant info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">{plant.name}</h1>
              <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                {plant.category.name}
              </Badge>
            </div>

            <div className="mt-6">
              <p className="text-lg text-gray-700">
                This beautiful {plant.category.name.toLowerCase()} is a perfect addition to your plant collection. Each plant
                is carefully grown and selected to ensure you receive a healthy, vibrant specimen.
              </p>
              <p className="mt-4 text-lg text-gray-700">
                Plant ID: <span className="font-medium">{plant.id}</span>
              </p>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-8">
              <h2 className="text-lg font-medium text-gray-900">About {plant.name}</h2>
              <p className="mt-4 text-gray-700">
                {plant.name} is a popular choice among plant enthusiasts for its distinctive appearance and relatively
                easy care requirements. Native to tropical regions, it thrives in environments that mimic its natural
                habitat.
              </p>
              <p className="mt-4 text-gray-700">
                This plant belongs to the {plant.category.name} family, known for their unique characteristics and benefits.
                Whether you're a seasoned plant parent or just starting your collection, {plant.name} makes a wonderful
                addition to any space.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
