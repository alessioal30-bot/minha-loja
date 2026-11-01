type StockVariant = {
  manage_inventory?: boolean | null
  allow_backorder?: boolean | null
  inventory_quantity?: number | null
}

export function isProductSoldOut(product: { variants?: StockVariant[] | null }): boolean {
  const variants = product.variants
  return Boolean(variants?.length) && variants!.every((variant) =>
    variant.manage_inventory === true &&
    variant.allow_backorder === false &&
    typeof variant.inventory_quantity === "number" &&
    variant.inventory_quantity <= 0
  )
}

export function availableProductsFirst<T extends { variants?: StockVariant[] | null }>(products: T[]): T[] {
  return [...products.filter((product) => !isProductSoldOut(product)),
    ...products.filter(isProductSoldOut)]
}
