import { ExecArgs } from "@medusajs/framework/types"
import { updateRegionsWorkflow } from "@medusajs/medusa/core-flows"

export default async function changeRegionToBR({ container }: ExecArgs) {
  const regionId = "reg_01M0XG1SY2RR2X0FJ0A0142JX1"

  const { result } = await updateRegionsWorkflow(container).run({
    input: {
      selector: {
        id: regionId,
      },
      update: {
        name: "Brasil",
        currency_code: "brl",
        countries: ["br"],
      },
    },
  })

  console.log(JSON.stringify(result, null, 2))
}
