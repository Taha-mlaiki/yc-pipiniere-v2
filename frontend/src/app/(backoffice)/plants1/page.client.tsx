"use client";

import Title from "../_components/Title"
import PlantsTable from "./_components/PlantsTable"
import { CreatePlantButton } from "./_components/CreatePlantButton"
import { usePlants } from "./_hooks/usePlants"

export default function PlantsPage() {
    const { plants, updatePlant, createPlant, deletePlant, isLoading, error } = usePlants()
    
  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Title 
          pageName="Plants Management" 
          description="Manage your plant inventory, add new plants, or update existing ones." 
        />
        <CreatePlantButton createPlant={createPlant}/>
      </div>
      
      <PlantsTable plants={plants} updatePlant={updatePlant} deletePlant={deletePlant} isLoading={isLoading} error={error}/>
    </main>
  )
}
