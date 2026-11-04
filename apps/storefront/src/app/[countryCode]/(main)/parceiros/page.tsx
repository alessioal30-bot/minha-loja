import { getCategoryBranchIds, getCategoryByHandle } from "@lib/data/categories"
import { listProducts } from "@lib/data/products"
import { isProductSoldOut } from "@lib/util/product-stock"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import QuoteForm from "./quote-form"

const buttonClass = "inline-flex min-h-11 items-center rounded-lg border px-4 py-2 text-sm font-medium text-slate-900 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"

const lines = [
  { name: "Schalk", color: "bg-[#edf6ff] border-[#b9d8f4] hover:bg-[#dfedfc]", href: "/products/moda-masculina-camiseta-basica", wholesale: true },
  { name: "Crosby", color: "bg-[#fff3e8] border-[#efd2b8] hover:bg-[#ffe8d5]", href: "/products/meta-camiseta-basica-crosby-masculina-preto", wholesale: true },
  { name: "Suplementos", color: "bg-[#ebfaf2] border-[#b6e2cb] hover:bg-[#dcf3e6]", href: "/categories/nutricao-alimentar", wholesale: true },
  { name: "Mary Kay", color: "bg-[#fff0f5] border-[#edc4d5] hover:bg-[#fbe2ec]", href: "/products/base-mary-kay-timewise-3d-matte", wholesale: false },
]

async function wholesaleCatalog() {
  const categories = await Promise.all(["ecossistema-moda", "nutricao-alimentar"].map((handle) => getCategoryByHandle([handle])))
  const branches = await Promise.all(categories.filter((category) => category != null).map((category) => getCategoryBranchIds(category!.id)))
  const categoryIds = [...new Set(branches.flat())]
  if (!categoryIds.length) return []
  const products = new Map<string, { id: string; title: string; variants: { id: string; title: string }[] }>()
  let page: number | null = 1
  while (page !== null) {
    const batch = await listProducts({
      countryCode: "br",
      pageParam: page,
      queryParams: { category_id: categoryIds, limit: 100, fields: "id,title,handle,*variants,+variants.inventory_quantity" },
    })
    for (const product of batch.response.products) {
      const title = product.title
      if (!title || isProductSoldOut(product)) continue
      const variants = (product.variants ?? []).filter((variant) => !isProductSoldOut({ variants: [variant] }))
        .map((variant) => ({ id: variant.id, title: variant.title || "Padrão" }))
      if (variants.length) products.set(product.id, { id: product.id, title, variants })
    }
    page = batch.nextPage
  }
  return [...products.values()].sort((a, b) => a.title.localeCompare(b.title, "pt-BR"))
}

export const metadata = { title: "Produtos e cotações | AM" }

export default async function PartnersPage({ searchParams }: { searchParams: Promise<{ linha?: string }> }) {
  const { linha } = await searchParams
  const wholesaleLine = lines.find((line) => line.wholesale && line.name === linha)?.name

  const catalog = await wholesaleCatalog().catch(() => [])

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-4xl font-bold">Produtos e cotações</h1>
      <p className="mt-3">Compre pela loja ou preencha a ficha para consultar um produto, pedir uma cotação em quantidade ou comprar para revenda.</p>
      <QuoteForm key={wholesaleLine ?? "individual"} lines={lines} wholesaleLine={wholesaleLine} catalog={catalog} />
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {lines.map(({ name, href, wholesale, color }) => (
          <section key={name} className="rounded-xl border p-6">
            <h2 className="text-xl font-semibold">{name}</h2>
            <p className="mt-2">
              {wholesale ? "Produtos da AM para compra individual ou cotação em quantidade." : "Parceria para consumidores. Pedidos e entregas pela AM."}
            </p>
            <div className="mt-4 flex flex-wrap gap-4">
              <LocalizedClientLink className={`${buttonClass} ${color}`} href={href}>
                Ver produtos
              </LocalizedClientLink>
              {wholesale && (
                <a className={`${buttonClass} bg-[#f5efff] border-[#dbc9f0] hover:bg-[#ede3fb]`} href={`?linha=${encodeURIComponent(name)}#ficha-cotacao`}>
                  Pedir orçamento no atacado
                </a>
              )}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
