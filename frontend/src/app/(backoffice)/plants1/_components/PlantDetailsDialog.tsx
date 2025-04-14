"use client"

import React, { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { usePlants } from "../_hooks/usePlants"
import { useCategories } from "../_hooks/useCategories"
import { X, Loader2 } from "lucide-react"
import { Plant } from "@/app/plants/types/plants"

interface PlantDetailsDialogProps {
  plant: Plant
  isOpen: boolean
  onClose: () => void
  isEditMode: boolean
  setIsEditMode: (isEditMode: boolean) => void
  updatePlant: (plant: Plant) => void
}

export function PlantDetailsDialog({
  plant,
  isOpen,
  onClose,
  isEditMode,
  setIsEditMode,
  updatePlant
}: PlantDetailsDialogProps) {
  const { categories, isLoading: categoryLoading } = useCategories()
  const [formData, setFormData] = useState<Plant>({ ...plant })
  const [activeTab, setActiveTab] = useState<"details" | "images">("details")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagesToRemove, setImagesToRemove] = useState<number[]>([])
  const [newImageUrls, setNewImageUrls] = useState<string[]>([])

  // Reset form when plant or dialog state changes
  useEffect(() => {
    setFormData({
      ...plant,
      category: {
        id: plant.category.id,
        name: plant.category.name,
      },
    })
    setImagesToRemove([])
    setNewImageUrls([])
  }, [plant, isOpen])

  // Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (categoryId: string) => {
    const selectedCategory = categories.find((cat) => cat.id === parseInt(categoryId))
    setFormData((prev) => ({
      ...prev,
      category_id: parseInt(categoryId),
      category: {
        id: parseInt(categoryId),
        name: selectedCategory?.name || "Unknown Category",
      },
    }))
  }

  const handleImageRemove = (imageId: number) => {
    setImagesToRemove((prev) => [...prev, imageId])
  }

  const handleNewImageUrlChange = (index: number, value: string) => {
    setNewImageUrls((prev) => {
      const updated = [...prev]
      updated[index] = value
      return updated
    })
  }

  const handleAddImageUrl = () => {
    setNewImageUrls((prev) => [...prev, ""])
  }

  const handleRemoveNewImageUrl = (index: number) => {
    setNewImageUrls((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSave = async () => {
    setIsSubmitting(true)
    try {
      const updatedImagesUrls = [
        ...formData.images
          .filter((img) => !imagesToRemove.includes(img.id))
          .map((img) => img.url),
        ...newImageUrls.filter((url) => url.trim() !== ""),
      ]

      const updatedPlant = {
        ...formData,
        images: updatedImagesUrls.map((url, i) => ({
          id: i,
          url,
        })),
        category: {
          id: formData.category.id,
          name: formData.category.name,
        },
      }
      await updatePlant(updatedPlant)
      setIsEditMode(false)
      onClose()
    } catch (error) {
      console.error("Error updating plant:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    if (isEditMode) {
      setIsEditMode(false)
      setFormData({ ...plant })
      setNewImageUrls([])
      setImagesToRemove([])
    } else {
      onClose()
    }
  }

  const remainingSlots = 4 - (formData.images.length - imagesToRemove.length + newImageUrls.length)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Plant" : plant.name}</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(tab) => setActiveTab(tab as "details" | "images")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                {isEditMode ? (
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                ) : (
                  <div className="p-2 border rounded-md bg-gray-50">{plant.name}</div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category_id">Category</Label>
                {isEditMode ? (
                  <Select
                    value={formData.category.id?.toString() || ""}
                    onValueChange={handleSelectChange}
                    disabled={categoryLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={categoryLoading ? "Loading categories..." : "Select category"} />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="p-2 border rounded-md bg-gray-50">{plant.category.name}</div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="images" className="pt-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.images.map((image) =>
                  !imagesToRemove.includes(image.id) && (
                    <div key={image.id} className="relative group">
                      <div className="aspect-square overflow-hidden rounded-md border">
                        <img
                          src={image.url}
                          alt={`${plant.name} image`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      {isEditMode && (
                        <button
                          type="button"
                          onClick={() => handleImageRemove(image.id)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  )
                )}
              </div>

              {isEditMode && (
                <div className="space-y-2">
                  {newImageUrls.map((url, index) => (
                    <div key={`new-url-${index}`} className="flex items-center gap-2">
                      <Input
                        value={url}
                        onChange={(e) => handleNewImageUrlChange(index, e.target.value)}
                        placeholder="Enter image URL"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveNewImageUrl(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}

                  {remainingSlots > 0 && (
                    <Button
                      variant="outline"
                      onClick={handleAddImageUrl}
                      className="mt-2"
                    >
                      Add Image URL
                    </Button>
                  )}
                </div>
              )}

              {isEditMode && (
                <p className="text-sm text-gray-500 mt-2">
                  {remainingSlots} of 4 image slots remaining
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={handleCancel}>
            {isEditMode ? "Cancel" : "Close"}
          </Button>
          {isEditMode ? (
            <Button onClick={handleSave} disabled={isSubmitting} className="bg-green-600 hover:bg-green-700">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </Button>
          ) : (
            <Button onClick={() => setIsEditMode(true)} className="bg-green-600 hover:bg-green-700">Edit</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}