import { MedusaContainer } from "@medusajs/framework/types"
import { Modules } from "@medusajs/framework/utils"

export default async function({ container }: { container: MedusaContainer }) {
  const apiKeyService = container.resolve(Modules.API_KEY)

  const keys = await apiKeyService.listApiKeys(
    { type: "publishable" },
    { take: 20 }
  )

  for (const key of keys) {
    console.log(JSON.stringify({
      id: key.id,
      title: key.title,
      type: key.type,
      token: key.token
    }))
  }
}
