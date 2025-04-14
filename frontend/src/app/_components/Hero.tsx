import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <div className="relative bg-green-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 md:py-20 lg:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Discover our exceptional selection of plants
              </h1>
              <p className="mt-4 text-lg text-green-100">
                Cultivated with passion to beautify your indoor and outdoor spaces.
              </p>
              <div className="mt-8">
                <Link
                  href="#"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-green-700 bg-white hover:bg-green-50 transition-colors"
                >
                  Explore the shop
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/047/385/522/small_2x/young-green-plants-sprouting-from-the-soil-with-the-sun-s-rays-c-free-photo.jpg"
                alt="Various plants"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

