import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getCategoryByHandle } from "@lib/data/categories"
import CategoryTemplate from "@modules/categories/templates"

export const metadata: Metadata = {
  title: "Farmacêuticos",
  description: "Produtos farmacêuticos e soluções para saúde.",
}

type Props = {
  params: Promise<{
    countryCode: string
  }>
  searchParams: Promise<{
    sortBy?: string
    page?: string
  }>
}

export default async function FarmaceuticosPage(props: Props) {
  const params = await props.params
  const searchParams = await props.searchParams

  const category = await getCategoryByHandle(["saude"])

  if (!category) {
    notFound()
  }

  return (
    <CategoryTemplate
      category={category}
      sortBy={searchParams.sortBy as any}
      page={searchParams.page}
      countryCode={params.countryCode}
    />
  )
}
