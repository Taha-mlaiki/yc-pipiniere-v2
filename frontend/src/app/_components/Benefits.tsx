import { Check, Mail, Truck } from "lucide-react"

export default function Benefits() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Why choose PlantNursery?</h2>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="text-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mx-auto">
              <Check className="h-8 w-8" />
            </div>
            <h3 className="mt-3 text-xl font-medium text-gray-900">Guaranteed Quality</h3>
            <p className="mt-3 text-base text-gray-500">
              Our plants are carefully selected to ensure their health and beauty.
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mx-auto">
              <Mail className="h-8 w-8" />
            </div>
            <h3 className="mt-3 text-xl font-medium text-gray-900">Personalized Advice</h3>
            <p className="mt-3 text-base text-gray-500">
              Our team of enthusiasts guides you for optimal care of your plants.
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mx-auto">
              <Truck className="h-8 w-8" />
            </div>
            <h3 className="mt-3 text-xl font-medium text-gray-900">Secure Delivery</h3>
            <p className="mt-3 text-base text-gray-500">
              Special packaging to preserve the integrity of plants during transport.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}