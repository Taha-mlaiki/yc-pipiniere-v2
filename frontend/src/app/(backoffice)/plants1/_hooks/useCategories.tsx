"use client"

import { useState, useEffect } from "react"
import { clientFetch } from "@/lib/clientFetch"

export interface Category {
  id: number
  name: string
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true)
        const data = await clientFetch.get("/categories")
        
        setCategories(data)
        setIsLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch categories")
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const createCategory = async (categoryName: string) => {
    try {
      const response = await clientFetch.post("/categories", categoryName)
      if (!response.ok) {
        throw new Error("Failed to create category")
      }
      const newCategory: Category = await response.json()
      setCategories((prev) => [...prev, newCategory])
      return newCategory
    } catch (err) {
      throw new Error("Failed to create category")
    }
  }

  const deleteCategory = async (categoryId: number) => {
    try {
      const response = await clientFetch.delete(`/categories/${categoryId}`)
      if (!response.ok) {
        throw new Error("Failed to delete category")
      }
      setCategories((prev) => prev.filter((cat) => cat.id !== categoryId))
      return true
    } catch (err) {
      throw new Error("Failed to delete category")
    }
  }

  return {
    categories,
    isLoading,
    error,
    createCategory,
    deleteCategory,
  }
}