
import { ExecArgs } from "@medusajs/framework/types"
import { createProductsWorkflow } from "@medusajs/medusa/core-flows"
import * as fs from "fs"
import * as path from "path"

export default async function importProductsWorkflow({ container }: ExecArgs) {
  const logger = container.resolve("logger")
  logger.info("Iniciando importação em massa de produtos...")

  try {
    const filePath = path.join(process.cwd(), "produtos.json")
    if (!fs.existsSync(filePath)) {
      logger.error(`Arquivo produtos.json não encontrado em: ${filePath}`)
      return
    }

    const arquivo = fs.readFileSync(filePath, "utf8")
    const produtos = JSON.parse(arquivo)

    logger.info(`Encontrados ${produtos.length} produtos para cadastrar.`)

    for (const p of produtos) {
      logger.info(`Cadastrando produto: ${p.title}`)

      try {
        await createProductsWorkflow(container).run({
          input: {
            products: [
              {
                title: p.title,
                handle: p.handle,
                description: p.description,
                status: "published",
                options: p.options.map((opt: string) => ({ title: opt })),
                variants: p.variants.map((v: any) => ({
                  title: v.title,
                  sku: v.sku,
                  manage_inventory: true,
                  options: v.options,
                  prices: v.prices.map((pr: any) => ({
                    amount: pr.amount,
                    currency_code: pr.currency_code,
                  })),
                })),
              },
            ],
          },
        })
        logger.info(`Sucesso ao cadastrar: ${p.title}`)
      } catch (err: any) {
        logger.error(`Erro ao cadastrar o produto ${p.title}: ${err.message}`)
      }
    }

    logger.info("Importação de produtos finalizada com sucesso!")
  } catch (err: any) {
    logger.error(`Erro geral na importação: ${err.message}`)
  }
}
