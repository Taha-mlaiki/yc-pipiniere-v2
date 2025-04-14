"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'
import { CreatePlantDialog } from "./CreatePlantDialog"
import { Plant } from "@/app/plants/types/plants"

interface CreatePlantButtonProps {
  createPlant: (plant: Plant) => void
}

export function CreatePlantButton({ createPlant }: CreatePlantButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <Button 
        onClick={() => setIsDialogOpen(true)}
        className="bg-green-600 hover:bg-green-700"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add New Plant
      </Button>
      
      <CreatePlantDialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
        createPlant={createPlant}
      />
    </>
  )
}
