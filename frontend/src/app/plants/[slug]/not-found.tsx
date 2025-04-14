import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PlantNotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Plant Not Found</h2>
      <p className="mt-4 text-lg text-gray-500">
        We couldn't find the plant you're looking for. It might have been removed or the URL is incorrect.
      </p>
      <div className="mt-8">
        <Button asChild className="bg-green-600 hover:bg-green-700">
          <Link href="/plants">Browse All Plants</Link>
        </Button>
      </div>
    </div>
  )
}
