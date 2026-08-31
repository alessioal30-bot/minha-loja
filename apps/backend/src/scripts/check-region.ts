import { ExecArgs } from "@medusajs/framework/types"

export default async function checkRegion({ container }: ExecArgs) {
  const query = container.resolve("query")

  const { data } = await query.graph({
    entity: "region",
    fields: ["id", "name", "currency_code", "countries.*"],
  })

  console.log(JSON.stringify(data, null, 2))
}
