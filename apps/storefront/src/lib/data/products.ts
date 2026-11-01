"use server"

import { sdk } from "@lib/config"
import { OptionValueIds } from "@lib/util/product-option-filters"
import { sortProducts } from "@lib/util/sort-products"
import { availableProductsFirst } from "@lib/util/product-stock"
import { HttpTypes } from "@medusajs/types"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { getAuthHeaders, getCacheOptions } from "./cookies"
import { getRegion, retrieveRegion } from "./regions"

type ProductListQueryParams = (HttpTypes.FindParams &
  HttpTypes.StoreProductListParams) & {
  options?: string[]
  option_value_id?: string | string[]
}

export const listProducts = async ({
  pageParam = 1,
  queryParams,
  countryCode,
  regionId,
}: {
  pageParam?: number
  queryParams?: ProductListQueryParams
  countryCode?: string
  regionId?: string
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number }
  nextPage: number | null
  queryParams?: ProductListQueryParams
}> => {
  if (!countryCode && !regionId) {
    throw new Error("Country code or region ID is required")
  }

  const limit = queryParams?.limit || 12
  const _pageParam = Math.max(pageParam, 1)
  const offset = _pageParam === 1 ? 0 : (_pageParam - 1) * limit

  let region: HttpTypes.StoreRegion | undefined | null

  if (countryCode) {
    region = await getRegion(countryCode)
  } else {
    region = await retrieveRegion(regionId!)
  }

  if (!region) {
    return {
      response: { products: [], count: 0 },
      nextPage: null,
    }
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  const next = {
    ...(await getCacheOptions("products")),
  }

  return sdk.client
    .fetch<{ products: HttpTypes.StoreProduct[]; count: number }>(
      `/store/products`,
      {
        method: "GET",
        query: {
          limit,
          offset,
          region_id: region?.id,
          fields:
            "*variants.calculated_price,+variants.inventory_quantity,*variants.images,*variants.options,+metadata,+tags,",
          ...queryParams,
        },
        headers,
        next: { ...next, revalidate: 30 },
        cache: "force-cache",
      }
    )
    .then(({ products, count }) => {
      const nextPage = count > offset + limit ? pageParam + 1 : null

      return {
        response: {
          products,
          count,
        },
        nextPage: nextPage,
        queryParams,
      }
    })
}

/**
 * Fetch all matching pages before ordering so sold-out products stay after available products.
 * It will then return the paginated products based on the page and limit parameters.
 */
export const listProductsWithSort = async ({
  page = 0,
  queryParams,
  sortBy = "created_at",
  countryCode,
  optionValueIds,
}: {
  page?: number
  queryParams?: ProductListQueryParams
  sortBy?: SortOptions
  countryCode: string
  optionValueIds?: OptionValueIds
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number }
  nextPage: number | null
  queryParams?: ProductListQueryParams
}> => {
  const limit = queryParams?.limit || 12
  const optionFilters = Array.from(
    new Set((optionValueIds || []).filter(Boolean))
  )

  const products: HttpTypes.StoreProduct[] = []
  let batchPage = 1
  let total = 0
  do {
    const batch = await listProducts({
      pageParam: batchPage,
      queryParams: {
        ...queryParams,
        ...(optionFilters.length ? { option_value_id: optionFilters } : {}),
        limit: 100,
        fields: "id,title,handle,thumbnail,images,created_at,*variants.calculated_price,+variants.inventory_quantity,variants.manage_inventory,variants.allow_backorder",
      },
      countryCode,
    })
    total = batch.response.count
    if (!batch.response.products.length && products.length < total) {
      throw new Error("Não foi possível carregar o catálogo completo")
    }
    products.push(...batch.response.products)
    batchPage += 1
  } while (products.length < total)

  const uniqueProducts = Array.from(new Map(products.map((product) => [product.id, product])).values())
  const sortedProducts = availableProductsFirst(sortProducts(uniqueProducts, sortBy))
  const currentPage = Math.max(page, 1)
  const offset = (currentPage - 1) * limit
  const count = sortedProducts.length
  return {
    response: { products: sortedProducts.slice(offset, offset + limit), count },
    nextPage: count > offset + limit ? currentPage + 1 : null,
    queryParams,
  }
}
