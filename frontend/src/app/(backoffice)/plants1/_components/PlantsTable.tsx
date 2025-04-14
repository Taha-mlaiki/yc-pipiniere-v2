"use client"

import { useState } from "react"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye, Trash2, Edit } from 'lucide-react'
import { PlantDetailsDialog } from "./PlantDetailsDialog"
import { DeletePlantDialog } from "./DeletePlantDialog"
import { Plant } from "@/app/plants/types/plants"
import LoadingSpin from "../../../_components/LoadingSpin"

interface PlantsTableProps {
    plants: Plant[];
    updatePlant: (plant: Plant) => void;
    deletePlant: (slug: string) => Promise<boolean>;
    isLoading: boolean;
    error: string | null;
}

export default function PlantsTable({ plants, updatePlant, deletePlant, isLoading, error }: PlantsTableProps) {
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)

  const handleViewDetails = (plant: Plant) => {
    setSelectedPlant(plant)
    setIsEditMode(false)
    setIsDetailsOpen(true)
  }

  const handleEditPlant = (plant: Plant) => {
    setSelectedPlant(plant)
    setIsEditMode(true)
    setIsDetailsOpen(true)
  }

  const handleDeletePlant = (plant: Plant) => {
    setSelectedPlant(plant)
    setIsDeleteOpen(true)
  }

  if (isLoading) {
    return <LoadingSpin/>
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error loading plants: {error}</div>
  }

  return (
    <>
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plants.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                  No plants found. Add a new plant to get started.
                </TableCell>
              </TableRow>
            ) : (
              plants.map((plant) => (
                <TableRow key={plant.id}>
                  <TableCell>
                    <div className="h-10 w-10 rounded-md overflow-hidden">
                      <img
                        src={plant.images[0]?.url}
                        alt={plant.name}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{plant.name}</TableCell>
                  <TableCell>{plant.category.name}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleViewDetails(plant)}
                      title="View details"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditPlant(plant)}
                      title="Edit plant"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeletePlant(plant)}
                      title="Delete plant"
                      className="text-red-600 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {selectedPlant && (
        <>
          <PlantDetailsDialog
            plant={selectedPlant}
            isOpen={isDetailsOpen}
            onClose={() => setIsDetailsOpen(false)}
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
            updatePlant={updatePlant}
          />
          
          <DeletePlantDialog
            plant={selectedPlant}
            isOpen={isDeleteOpen}
            deletePlant={deletePlant}
            onClose={() => setIsDeleteOpen(false)}
          />
        </>
      )}
    </>
  )
}