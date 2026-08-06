import { MedusaContainer } from "@medusajs/framework/types"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

export default async function seedCategorias({ container }: { container: MedusaContainer }) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const productModuleService = container.resolve("product")

  logger.info("Iniciando atualização e mapeamento das categorias...")

  const categoriasPrincipal = [
    {
      name: "Saúde",
      handle: "saude",
      is_active: true,
      category_children: [
        { name: "Farmacêuticos", handle: "farmaceuticos", is_active: true },
        { name: "Cuidados Diários", handle: "cuidados-diarios", is_active: true },
        { name: "Bem-estar e Imunidade", handle: "bem-estar-imunidade", is_active: true },
        { name: "Saúde Preventiva", handle: "saude-preventiva", is_active: true },
      ],
    },
    {
      name: "Beleza",
      handle: "beleza",
      is_active: true,
      category_children: [
        { name: "Cosméticos", handle: "cosmeticos", is_active: true },
        { name: "Skincare", handle: "skincare", is_active: true },
        { name: "Maquiagem", handle: "maquiagem", is_active: true },
        { name: "Cuidados Capilares", handle: "cuidados-capilares", is_active: true },
        { name: "Perfumaria", handle: "perfumaria", is_active: true },
      ],
    },
    {
      name: "Bem-estar",
      handle: "bem-estar",
      is_active: true,
      category_children: [
        { name: "Nutrição Alimentar", handle: "nutricao-alimentar", is_active: true },
        { name: "Suplementação Esportiva", handle: "suplementacao-esportiva", is_active: true },
        { name: "Alimentação Saudável", handle: "alimentacao-saudavel", is_active: true },
        { name: "Vitaminas e Minerais", handle: "vitaminas-minerais", is_active: true },
        { name: "Chás e Infusões", handle: "chas-infusoes", is_active: true },
      ],
    },
    {
      name: "Estilo",
      handle: "estilo",
      is_active: true,
      category_children: [
        { name: "Ecossistema Moda", handle: "ecossistema-moda", is_active: true },
        { name: "Vestuário Masculino", handle: "vestuario-masculino", is_active: true },
        { name: "Vestuário Feminino", handle: "vestuario-feminino", is_active: true },
        { name: "Moda Conforto & Loungewear", handle: "moda-conforto-loungewear", is_active: true },
        { name: "Acessórios & Detalhes", handle: "acessorios-detalhes", is_active: true },
      ],
    },
  ]

  for (const catData of categoriasPrincipal) {
    const { category_children, ...parentData } = catData
    let parentCategory
    const existingParent = await productModuleService.listProductCategories({ handle: parentData.handle })
    
    if (existingParent.length > 0) {
      parentCategory = existingParent[0]
      // Atualiza o nome caso esteja incorreto
      await productModuleService.updateProductCategories(parentCategory.id, { name: parentData.name })
    } else {
      parentCategory = await productModuleService.createProductCategories(parentData)
    }

    if (category_children && category_children.length > 0) {
      for (const childData of category_children) {
        const existingChild = await productModuleService.listProductCategories({ handle: childData.handle })
        if (existingChild.length > 0) {
          // Atualiza a subcategoria existente com o nome acentuado correto
          await productModuleService.updateProductCategories(existingChild[0].id, { name: childData.name })
        } else {
          await productModuleService.createProductCategories({
            ...childData,
            parent_category_id: parentCategory.id,
          })
        }
      }
    }
  }

  logger.info("Atualização de categorias concluída com sucesso!")
}
