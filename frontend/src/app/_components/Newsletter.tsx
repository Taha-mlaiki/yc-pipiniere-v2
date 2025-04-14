import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Newsletter() {
  return (
    <div className="bg-green-700">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
        <div className="rounded-lg shadow-xl bg-white p-6 md:p-12">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-0 md:flex-1">
              <h2 className="text-2xl font-bold text-gray-900">Subscribe to our newsletter</h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-500">
                Receive our care tips and discover our new plants in advance.
              </p>
            </div>
            <div className="mt-8 md:mt-0 md:ml-8">
              <form className="sm:flex">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-5 py-3"
                  placeholder="Your email address"
                />
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Subscribe
                  </Button>
                </div>
              </form>
              <p className="mt-3 text-sm text-gray-500">We respect your privacy. Unsubscribe at any time.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

