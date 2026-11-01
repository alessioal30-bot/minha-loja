import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getCategoryByHandle, listCategories } from "@lib/data/categories"
import { listRegions } from "@lib/data/regions"
import { HttpTypes, StoreRegion } from "@medusajs/types"
import CategoryTemplate from "@modules/categories/templates"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { parseOptionValueIds } from "@lib/util/product-option-filters"

type Props = {
  params: Promise<{ category: string[]; countryCode: string }>
  searchParams: Promise<
    Record<string, string | string[] | undefined> & {
      sortBy?: SortOptions
      page?: string
      optionValueIds?: string | string[]
    }
  >
}

export const dynamic = "force-dynamic"

export async function generateStaticParams() {
  if (process.env.STOREFRONT_BUILD_ON_DEMAND === "1") return []

  // Local navigation does not need to enumerate every category and region.
  if (process.env.NODE_ENV === "development") return []

  const product_categories = await listCategories({
    fields: "id,handle,*parent_category,*parent_category.parent_category",
    include_ancestors_tree: true,
  })

  if (!product_categories) {
    return []
  }

  const countryCodes = await listRegions().then((regions: StoreRegion[]) =>
    regions?.map((r) => r.countries?.map((c) => c.iso_2)).flat()
  )

  const categoryPaths = product_categories.map(
    (category: HttpTypes.StoreProductCategory) => {
      const path: string[] = [category.handle]
      let parent = category.parent_category

      while (parent) {
        path.unshift(parent.handle)
        parent = parent.parent_category
      }

      return path
    }
  )

  return countryCodes
    ?.map((countryCode: string | undefined) =>
      categoryPaths.map((category) => ({
        countryCode,
        category,
      }))
    )
    .flat()
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const productCategory = await getCategoryByHandle(params.category)
  if (!productCategory) return { title: "Categoria não encontrada" }
  const title = productCategory.name + " | AM Suplementos e Vestuário"
  return { title, description: productCategory.description ?? title, alternates: { canonical: "/"+params.countryCode+"/categories/"+params.category.join("/") } }
}

export default async function CategoryPage(props: Props) {
  const searchParams = await props.searchParams
  const params = await props.params
  const { sortBy, page } = searchParams
  const optionValueIds = parseOptionValueIds(searchParams)

  const productCategory = await getCategoryByHandle(params.category)

  if (!productCategory) {
    notFound()
  }

  return (
    <CategoryTemplate
      category={productCategory}
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
      optionValueIds={optionValueIds}
    />
  )
}

