import { ExecArgs } from "@medusajs/framework/types"

export default async function checkStore({ container }: ExecArgs) {
  const query = container.resolve("query")

  const { data: regions } = await query.graph({
    entity: "region",
    fields: [
      "id",
      "name",
      "currency_code",
      "countries.*",
    ],
  })

  console.log(JSON.stringify(regions, null, 2))
}
