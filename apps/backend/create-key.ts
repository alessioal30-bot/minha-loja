import { MedusaContainer } from "@medusajs/framework/types"
import { Modules } from "@medusajs/framework/utils"

export default async function({ container }: { container: MedusaContainer }) {
  const apiKeyService = container.resolve(Modules.API_KEY)

  const key = await apiKeyService.createApiKeys({
    title: "Storefront Key",
    type: "publishable",
    created_by: "system",
  })

  console.log("CHAVE_PUBLICADA:", key.token)
}