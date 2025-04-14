import { Plant } from "@/app/plants/types/plants"

export interface Order {
  id: number
  client_id: number
  status: "cancelled" | "pending" | "prepared" | "delivered"
  created_at: string
  updated_at: string
  client: {
    id: number
    name: string
    email: string
  }
  plants: Plant[]
}
