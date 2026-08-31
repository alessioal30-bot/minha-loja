import { MedusaContainer } from "@medusajs/framework/types"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

export default async function seedCategorias({
  container,
}: {
  container: MedusaContainer
}) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const productModuleService = container.resolve("product")

  logger.info("🌳 Iniciando criação da árvore de categorias...")

  // ... (Mantenha o seu array de categorias idêntico aqui)

  for (const categoria of categorias) {
    let parentCategory

    const existingParent =
      await productModuleService.listProductCategories({
        handle: categoria.handle,
      })

    if (existingParent.length > 0) {
      parentCategory = existingParent[0]
      logger.info(`Categoria já existe: ${categoria.name}`)
    } else {
      // Ajuste v2: createProductCategories aceita um array ou objeto único, mas o retorno correto no módulo de produtos vem do banco
      const created = await productModuleService.createProductCategories({
        name: categoria.name,
        handle: categoria.handle,
        is_active: true,
      })
      // Na v2, alguns métodos retornam um array de itens criados ou o objeto direto dependendo do wrapper. Garanta a leitura do ID:
      parentCategory = Array.isArray(created) ? created[0] : created
      logger.info(`Categoria criada: ${categoria.name}`)
    }

    for (const subcategoria of categoria.children) {
      let childCategory

      const existingChild =
        await productModuleService.listProductCategories({
          handle: subcategoria.handle,
        })

      if (existingChild.length > 0) {
        childCategory = existingChild[0]
        logger.info(`  ↳ Subcategoria já existe: ${subcategoria.name}`)
      } else {
        const createdChild = await productModuleService.createProductCategories({
          name: subcategoria.name,
          handle: subcategoria.handle,
          is_active: true,
          parent_category_id: parentCategory.id, // Corrigido o autocomplete que estava cortado
        })
        childCategory = Array.isArray(createdChild) ? createdChild[0] : createdChild
        logger.info(`  ↳ Subcategoria criada: ${subcategoria.name}`)
      }

      if (subcategoria.children) {
        for (const subsubcategoria of subcategoria.children) {
          const existingSub =
            await productModuleService.listProductCategories({
              handle: subsubcategoria.handle,
            })

          if (existingSub.length === 0) {
            await productModuleService.createProductCategories({
              name: subsubcategoria.name,
              handle: subsubcategoria.handle,
              is_active: true,
              parent_category_id: childCategory.id,
            })
            logger.info(`      ↳ Subcategoria criada: ${subsubcategoria.name}`)
          } else {
            logger.info(`      ↳ Subcategoria já existe: ${subsubcategoria.name}`)
          }
        }
      }
    }
  }

  logger.info("🌳 Árvore de categorias criada com sucesso!")
}
