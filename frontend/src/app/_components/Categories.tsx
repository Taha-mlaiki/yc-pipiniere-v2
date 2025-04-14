import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { serverFetch } from "@/lib/serverFetch";

interface Category {
  id: number;
  name: string;
}

export default async function Categories() {
  let categories: Category[] = [];

  try {
    categories = (await serverFetch.get("/categories")).slice(0, 4);
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }

  if (!categories.length) {
    return (
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Our Categories</h2>
            <p className="mt-4 text-lg text-gray-500">No categories available at the moment.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Our Categories</h2>
          <p className="mt-4 text-lg text-gray-500">Explore our plant collection by category</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative overflow-hidden rounded-lg shadow-md bg-gray-200 h-48"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-xl font-bold text-white">{category.name}</h3>
                <Link href="#" className="mt-2 text-sm text-green-200 flex items-center">
                  Discover
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}