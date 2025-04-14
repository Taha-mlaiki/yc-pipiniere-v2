import Navbar from "@/app/_components/Navbar"
import Hero from "@/app/_components/Hero"
import Categories from "@/app/_components/Categories"
import TopSellingPlants from "@/app/_components/TopSellingPlants"
import Benefits from "@/app/_components/Benefits"
import Newsletter from "@/app/_components/Newsletter"
import Footer from "@/app/_components/Footer"
import AuthWrapper from "@/lib/AuthWrapper"

export default function HomePage() {
  return (
    <AuthWrapper allowedRoles={["client"]}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Hero />
        <Categories />
        <TopSellingPlants />
        <Benefits />
        <Newsletter />
        <Footer />
      </div>
    </AuthWrapper>
  )
}
