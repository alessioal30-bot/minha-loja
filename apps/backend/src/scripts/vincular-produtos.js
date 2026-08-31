export default async function vincularProdutos({ container }) {
  const logger = container.resolve("logger")
  const productModuleService = container.resolve("product")

  logger.info("🔗 Iniciando associação dos produtos às categorias...")

  const [products] = await productModuleService.listAndCountProducts({}, { take: 100 })
  
  if (!products.length) {
    logger.info("Nenhum produto encontrado para vincular.")
    return
  }

  const regras = [
    { termo: "Vitamina C", handle: "vitamina-c" },
    { termo: "Sérum", handle: "skincare" },
    { termo: "Whey Protein", handle: "whey-protein" },
    { termo: "Calça Jeans", handle: "calcas-masculinas" },
    { termo: "Calça Slim", handle: "calcas-masculinas" },
    { termo: "Calça Jogger", handle: "calcas-masculinas" },
    { termo: "Jaqueta", handle: "jaquetas-masculinas" },
    { termo: "Tênis", handle: "acessorios" },
    { termo: "Perfume", handle: "perfumes-masculinos" },
    { termo: "Camiseta", handle: "camisetas-masculinas" },
    { termo: "Camisa Polo", handle: "camisas-masculinas" },
    { termo: "Casaco", handle: "roupas-conforto" },
  ]

  for (const product of products) {
    let categoriaAlvoHandle = null

    for (const regra of regras) {
      if (product.title.toLowerCase().includes(regra.termo.toLowerCase())) {
        categoriaAlvoHandle = regra.handle
        break
      }
    }

    if (categoriaAlvoHandle) {
      const categories = await productModuleService.listProductCategories({
        handle: categoriaAlvoHandle,
      })

      if (categories.length > 0) {
        const category = categories[0]
        await productModuleService.updateProducts(product.id, {
          category_ids: [category.id],
        })
        logger.info(`✓ Produto "${product.title}" vinculado à categoria "${category.name}"`)
      } else {
        logger.info(`⚠ Categoria com handle "${categoriaAlvoHandle}" não encontrada para "${product.title}"`)
      }
    } else {
      logger.info(`⚠ Nenhuma regra encontrada para: "${product.title}"`)
    }
  }

  logger.info("🔗 Associação de produtos concluída com sucesso!")
}
