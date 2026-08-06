import { getCategoriesList } from "@lib/data/categories"
import { getProductsList } from "@lib/data/products"
import { Metadata } from "search-params"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Loja",
  description: "Explore todos os nossos produtos.",
}

type Params = {
  searchParams: Promise<{
    sortBy?: string
    page?: string
    category?: string
  }>
  params: Promise<{
    countryCode: string
  }>
}

export default async function StorePage(props: Params) {
  const params = await props.params
  const searchParams = await props.searchParams
  const { countryCode } = params

  return (
    <div className="content-container py-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl-semi">Nossa Loja</h1>
        <p className="text-base-regular text-ui-fg-subdued">
          Encontre suplementos, cosm�ticos, vestu�rio e muito mais.
        </p>

        {/* Links r�pidos das 4 �reas principais */}
        <div className="flex flex-wrap gap-2 mt-6">
          <LocalizedClientLink href={"/" + countryCode + "/store"} className={"px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all rounded-full border"}>
            Todos
          </LocalizedClientLink>
          <LocalizedClientLink href={"/" + countryCode + "/store?category=farmaceuticos"} className={"px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all rounded-full border"}>
            Farmac�uticos
          </LocalizedClientLink>
          <LocalizedClientLink href={"/" + countryCode + "/store?category=cosmeticos"} className={"px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all rounded-full border"}>
            Cosm�ticos
          </LocalizedClientLink>
          <LocalizedClientLink href={"/" + countryCode + "/store?category=nutricao-alimentar"} className={"px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all rounded-full border"}>
            Nutri��o Alimentar
          </LocalizedClientLink>
          <LocalizedClientLink href={"/" + countryCode + "/store?category=ecossistema-moda"} className={"px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all rounded-full border"}>
            Ecossistema Moda
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}