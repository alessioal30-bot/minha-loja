// @ts-nocheck
import { MedusaContainer } from "@medusajs/framework/types"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

export default async function run({ container }: { container: MedusaContainer }) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const productService = container.resolve("productModuleService")

  logger.info("Limpando categorias antigas e duplicadas...")

  const { data: existingCategories } = await query.graph({
    entity: "product_category",
    fields: ["id", "name"],
  })

  const categoryIds = existingCategories.map((c: any) => c.id)

  if (categoryIds.length > 0) {
    await productService.deleteProductCategories(categoryIds)
    logger.info(`${categoryIds.length} categorias antigas removidas com sucesso.`)
  }

  logger.info("Criando nova árvore de categorias organizada...")

  const farmaceuticos = await productService.createProductCategories({
    name: "Farmacêuticos",
    is_active: true,
    is_internal: false,
  })

  await productService.createProductCategories([
    { name: "Medicamentos", parent_category_id: farmaceuticos.id, is_active: true },
    { name: "Primeiros Socorros", parent_category_id: farmaceuticos.id, is_active: true },
  ])

  const cosmeticos = await productService.createProductCategories({
    name: "Cosméticos",
    is_active: true,
    is_internal: false,
  })

  await productService.createProductCategories([
    { name: "Skincare", parent_category_id: cosmeticos.id, is_active: true },
    { name: "Cuidados Capilares", parent_category_id: cosmeticos.id, is_active: true },
    { name: "Perfumaria", parent_category_id: cosmeticos.id, is_active: true },
  ])

  const nutricao = await productService.createProductCategories({
    name: "Nutrição",
    is_active: true,
    is_internal: false,
  })

  await productService.createProductCategories([
    { name: "Suplementos", parent_category_id: nutricao.id, is_active: true },
    { name: "Vitaminas e Minerais", parent_category_id: nutricao.id, is_active: true },
    { name: "Alimentação Saudável", parent_category_id: nutricao.id, is_active: true },
  ])

  const vestuario = await productService.createProductCategories({
    name: "Vestuário",
    is_active: true,
    is_internal: false,
  })

  await productService.createProductCategories([
    { name: "Moda Masculina", parent_category_id: vestuario.id, is_active: true },
    { name: "Moda Feminina", parent_category_id: vestuario.id, is_active: true },
    { name: "Acessórios", parent_category_id: vestuario.id, is_active: true },
  ])

  logger.info("Categorias organizadas com sucesso!")
}