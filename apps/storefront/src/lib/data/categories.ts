import { cache } from "react"
import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import { getCacheOptions } from "./cookies"

export const listCategories = async (query?: Record<string, unknown>) => {
  const next = {
    ...(await getCacheOptions("categories")),
  }

  const limit = query?.limit || 100

  return sdk.client
    .fetch<{ product_categories: HttpTypes.StoreProductCategory[] }>(
      "/store/product-categories",
      {
        query: {
          fields:
            "*category_children, *products, *parent_category, *parent_category.parent_category",
          limit,
          ...query,
        },
        next: { ...next, revalidate: 30 },
        cache: "force-cache",
      }
    )
    .then(({ product_categories }) => product_categories)
}

export const getCategoryByHandle = cache(async (categoryHandle: string[]) => {
  const handle = categoryHandle[categoryHandle.length - 1]

  const next = {
    ...(await getCacheOptions("categories")),
  }

  return sdk.client
    .fetch<HttpTypes.StoreProductCategoryListResponse>(
      "/store/product-categories",
      {
        query: {
          fields:
            "id,name,handle,description,*category_children,products.id,*parent_category,*parent_category.parent_category",
          handle,
          include_ancestors_tree: true,
        },
        next: { ...next, revalidate: 30 },
        cache: "force-cache",
      }
    )
    .then(({ product_categories }) => {
      const category = product_categories[0]

      if (!category) {
        return undefined
      }

      if (categoryHandle.length <= 1) {
        return category
      }

      let parent = category.parent_category

      for (let i = categoryHandle.length - 2; i >= 0; i--) {
        if (!parent || parent.handle !== categoryHandle[i]) {
          return undefined
        }

        parent = parent.parent_category
      }

      return category
    })
})


// Read only identifiers so every descendant is included without loading products.
export const getCategoryBranchIds = cache(async (categoryId: string) => {
  const categories: { id: string; parent_category_id: string | null }[] = []
  const next = { ...(await getCacheOptions("categories")) }
  let offset = 0
  let count = Infinity

  while (offset < count) {
    const response = await sdk.client.fetch<{
      product_categories: { id: string; parent_category_id: string | null }[]
      count: number
    }>("/store/product-categories", {
      query: { fields: "id,parent_category_id", limit: 100, offset },
      next: { ...next, revalidate: 30 },
      cache: "force-cache",
    })
    categories.push(...response.product_categories)
    count = response.count
    if (!response.product_categories.length) break
    offset += response.product_categories.length
  }

  const ids = new Set([categoryId])
  const pending = [categoryId]
  for (let i = 0; i < pending.length; i++) {
    for (const category of categories) {
      if (category.parent_category_id === pending[i] && !ids.has(category.id)) {
        ids.add(category.id)
        pending.push(category.id)
      }
    }
  }
  return Array.from(ids)
})
