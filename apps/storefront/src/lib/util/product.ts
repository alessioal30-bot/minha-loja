import { HttpTypes } from "@medusajs/types"

export const isSimpleProduct = (product: HttpTypes.StoreProduct): boolean => {
  return (
    product.options?.length === 1 && product.options[0].values?.length === 1
  )
}

export const isWatchProduct = (
  product: Pick<HttpTypes.StoreProduct, "title">
): boolean => {
  return /^\s*rel[oó]gio\b/i.test(product.title ?? "")
}

export const getProductConsultationUrl = (
  product: Pick<HttpTypes.StoreProduct, "title" | "handle">
): string => {
  const productUrl = `https://www.apcmcomercioesrvltda.com.br/br/products/${product.handle}`
  const message = `Olá! Gostaria de consultar o preço e a disponibilidade de ${product.title}. ${productUrl}`
  return `https://wa.me/558498388771?text=${encodeURIComponent(message)}`
}
