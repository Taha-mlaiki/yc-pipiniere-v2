"use client"

import { Plant } from "@/app/plants/types/plants"
import { clientFetch } from "@/lib/clientFetch"
import { useState, useEffect } from "react"

export function usePlants() {
  const [plants, setPlants] = useState<Plant[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        setIsLoading(true)
        const data = await clientFetch.get("/plants");
        
        setPlants(data)
        setIsLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch plants")
        setIsLoading(false)
      }
    }

    fetchPlants()
  }, [])

  const createPlant = async (plant: Omit<Plant, "id">) => {
    try {

        let createdData = {
            name: plant.name,
            category_id: plant.category.id,
            images: plant.images.map( img => img.url),
        }
      const createdPlant = await clientFetch.post("/plants", createdData)
      
      setPlants((prev) => [createdPlant, ...prev])
      return createdPlant
    } catch (err) {
      throw new Error("Failed to create plant")
    }
  }

  const updatePlant = async (updatedPlant: Plant) => {
    try {

        let updatedData = {
            name: updatedPlant.name,
            category_id: updatedPlant.category.id,
            images: updatedPlant.images.map( img => img.url),
        }

      const updated = await clientFetch.put(`/plants/${updatedPlant.slug}`, updatedData)

      setPlants((prev) =>
        prev.map((plant) => (plant.id === updated.id ? updated : plant))
      );

      return updated;
    } catch (err) {
      throw new Error("Failed to update plant")
    }
  }

  const deletePlant = async (slug: string) => {
    try {
      const data = await clientFetch.delete(`/plants/${slug}`)

      setPlants((prev) => prev.filter((plant) => plant.slug !== slug))
      return true
    } catch (err) {
      throw new Error("Failed to delete plant")
    }
  }

  return {
    plants,
    isLoading,
    error,
    createPlant,
    updatePlant,
    deletePlant,
  }
}