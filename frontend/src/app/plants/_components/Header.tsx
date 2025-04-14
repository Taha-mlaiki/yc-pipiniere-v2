import type { JSX } from "react"

export default function PageHeader(): JSX.Element {
  return (
    <div className="bg-green-600 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">All Plants</h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-green-100 sm:mt-4">
            Discover our diverse collection of high-quality plants
          </p>
        </div>
      </div>
    </div>
  )
}