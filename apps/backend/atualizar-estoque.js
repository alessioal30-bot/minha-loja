import { Modules } from "@medusajs/utils"

export default async function ({ container }) {
  const logger = container.resolve("logger")
  const productService = container.resolve(Modules.PRODUCT)
  const inventoryService = container.resolve(Modules.INVENTORY)
  const stockLocationService = container.resolve(Modules.STOCK_LOCATION)
  const remoteLink = container.resolve("remoteLink")

  const QUANTIDADE_DESEJADA = 5 // <--- Altere aqui se quiser outra quantidade em estoque

  logger.info(`📦 Iniciando sincronização e ajuste de estoque para ${QUANTIDADE_DESEJADA} unidades...`)

  // 1. Busca o local de estoque padrão
  const locations = await stockLocationService.listStockLocations({})
  const defaultLocation = locations[0]

  if (!defaultLocation) {
    logger.error("❌ Nenhum Stock Location encontrado!")
    return
  }

  // 2. Lista todos os produtos com suas variantes
  const products = await productService.listProducts({}, { relations: ["variants"] })

  for (const product of products) {
    logger.info(`🔍 Processando produto: ${product.title}`)

    for (const variant of product.variants) {
      // Procura se já existe item de inventário vinculado à SKU da variante
      let inventoryItems = await inventoryService.listInventoryItems({
        sku: variant.sku
      })

      let inventoryItem;

      if (inventoryItems.length === 0) {
        // Se não existir item de inventário para esta variante, cria um novo
        logger.info(`   ⚠️ Criando item de inventário para a variante: ${variant.title}`)
        inventoryItem = await inventoryService.createInventoryItems({
          sku: variant.sku,
          title: `${product.title} - ${variant.title}`,
          requester_id: "system"
        })

        // Vincula o item de inventário à variante do produto via remoteLink
        await remoteLink.create([
          {
            [Modules.PRODUCT]: {
              variant_id: variant.id,
            },
            [Modules.INVENTORY]: {
              inventory_item_id: inventoryItem.id,
            },
          },
        ])
      } else {
        inventoryItem = inventoryItems[0]
      }

      // Verifica os níveis de estoque atuais para este item no local padrão
      const levels = await inventoryService.listInventoryLevels({
        inventory_item_id: inventoryItem.id,
        location_id: defaultLocation.id
      })

      if (levels.length > 0) {
        // Atualiza o nível existente
        await inventoryService.updateInventoryLevels(inventoryItem.id, [
          {
            location_id: defaultLocation.id,
            stocked_quantity: QUANTIDADE_DESEJADA
          }
        ])
        logger.info(`   ✅ Estoque da variante [${variant.title}] atualizado para ${QUANTIDADE_DESEJADA}`)
      } else {
        // Cria um nível novo associado ao local
        await inventoryService.createInventoryLevels([
          {
            inventory_item_id: inventoryItem.id,
            location_id: defaultLocation.id,
            stocked_quantity: QUANTIDADE_DESEJADA
          }
        ])
        logger.info(`   ✅ Nível de estoque criado e definido para ${QUANTIDADE_DESEJADA} na variante [${variant.title}]`)
      }
    }
  }

  logger.info("✨ Estoque de todos os produtos sincronizado e atualizado com sucesso!")
}