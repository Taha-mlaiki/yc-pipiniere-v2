import { notFound } from "next/navigation"
import PlantDetails from "./_components/PlantDetails"
import { serverFetch } from "@/lib/serverFetch";
import { Plant } from "../types/plants";

async function getPlantBySlug(slug: string) {
  const plant = await serverFetch.get(`/plants/${slug}`);

  return plant || null;
}

type Props = {
  params: { slug: string }
}

export default async function Page({ params }: Props) {
  const plant: Plant = await getPlantBySlug((await params).slug)

  if (!plant) {
    notFound()
  }

  return <PlantDetails plant={plant} />
}
