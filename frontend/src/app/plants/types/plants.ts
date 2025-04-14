import { Category } from "@/app/(backoffice)/plants1/_hooks/useCategories"

export interface Plant {
  id: number
  name: string
  slug: string
  category: Category
  images: {
    id: number
    url: string
  }[]
}