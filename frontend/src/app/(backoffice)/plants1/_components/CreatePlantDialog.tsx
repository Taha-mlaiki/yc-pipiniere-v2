"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCategories } from "../_hooks/useCategories"
import { X, Loader2 } from "lucide-react"
import { Plant } from "@/app/plants/types/plants"

interface CreatePlantDialogProps {
  isOpen: boolean
  onClose: () => void
  createPlant: (plant: Plant) => void
}

export function CreatePlantDialog({ isOpen, onClose, createPlant }: CreatePlantDialogProps) {
  const { categories, isLoading: categoryLoading } = useCategories()
  const [activeTab, setActiveTab] = useState<"details" | "images">("details")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newImageUrls, setNewImageUrls] = useState<string[]>([])
  const [formData, setFormData] = useState({
    name: "",
    category_id: 0,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCategoryChange = (categoryId: string) => {
    setFormData((prev) => ({
      ...prev,
      category_id: parseInt(categoryId),
    }))
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

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const selectedCategory = categories.find((cat) => cat.id === formData.category_id)
      if (!selectedCategory) {
        throw new Error("Invalid category selected")
      }

      const validImageUrls = newImageUrls.filter((url) => url.trim() !== "")
      if (validImageUrls.length === 0) {
        throw new Error("At least one image URL is required")
      }

      const newPlant: Plant = {
        id: Math.floor(Math.random() * 10000), // Note: Ideally, ID should come from backend
        name: formData.name,
        slug: formData.name.toLowerCase().replace(/\s+/g, "-"),
        category: {
          id: formData.category_id,
          name: selectedCategory.name,
        },
        images: validImageUrls.map((url, i) => ({
          id: i,
          url,
        })),
      }

      await createPlant(newPlant)
      resetForm()
      onClose()
    } catch (error) {
      console.error("Error creating plant:", error)
      // Optionally add toast notification here
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    resetForm()
    onClose()
  }

  const resetForm = () => {
    setFormData({
      name: "",
      category_id: 0,
    })
    setNewImageUrls([])
    setActiveTab("details")
  }

  const isFormValid = () => {
    return (
      formData.name.trim() !== "" &&
      formData.category_id !== 0 &&
      newImageUrls.some((url) => url.trim() !== "")
    )
  }

  const remainingSlots = 4 - newImageUrls.length

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Plant</DialogTitle>
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
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Plant name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category_id">Category</Label>
                <Select
                  value={formData.category_id.toString()}
                  onValueChange={handleCategoryChange}
                  disabled={categoryLoading}
                >
                  <SelectTrigger className="w-full">
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
              </div>
            </div>
          </TabsContent>

          <TabsContent value="images" className="pt-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {newImageUrls.map((url, index) =>
                  url.trim() !== "" && (
                    <div key={`new-url-${index}`} className="relative group">
                      <div className="aspect-square overflow-hidden rounded-md border">
                        <img
                          src={url}
                          alt={`New plant image ${index + 1}`}
                          className="object-cover w-full h-full"
                          onError={(e) => (e.currentTarget.src = "/fallback-image.png")} // Fallback image
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveNewImageUrl(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label={`Remove image ${index + 1}`}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )
                )}
              </div>

              <div className="space-y-2">
                {newImageUrls.map((url, index) => (
                  <div key={`url-input-${index}`} className="flex items-center gap-2">
                    <Input
                      value={url}
                      onChange={(e) => handleNewImageUrlChange(index, e.target.value)}
                      placeholder="Enter image URL"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveNewImageUrl(index)}
                      aria-label={`Remove image URL ${index + 1}`}
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

              <p className="text-sm text-gray-500 mt-2">
                {remainingSlots} of 4 image slots remaining
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !isFormValid()}
            className="bg-green-600 hover:bg-green-700"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}