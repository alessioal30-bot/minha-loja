import { Modules } from "@medusajs/utils"

export default async function ({ container }) {
  const logger = container.resolve("logger")
  const productService = container.resolve(Modules.PRODUCT)
  const inventoryService = container.resolve(Modules.INVENTORY)
  const stockLocationService = container.resolve(Modules.STOCK_LOCATION)
  const remoteLink = container.resolve("remoteLink")

  logger.info("🚀 Iniciando cadastro completo de produtos (com peso, dimensões e estoque)...")

  // 1. Busca o local de estoque padrão
  const locations = await stockLocationService.listStockLocations({})
  const defaultLocation = locations[0]

  if (!defaultLocation) {
    logger.error("❌ Nenhum Stock Location encontrado!")
    return
  }

  // Quantidade padrão de estoque para todos os produtos e variações
  const QUANTIDADE_ESTOQUE = 5
  
  const produtosCompletos = [
    {
      title: "Camiseta Oversized Minimalista",
      handle: "camiseta-oversized-minimalista",
      description: "Camiseta unissex modelagem oversized, 100% algodão premium de toque macio.",
      images: [
        { url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800" }
      ],
      options: [
        { title: "Tamanho", values: ["P", "M", "G"] },
        { title: "Cor", values: ["Preto", "Branco"] }
      ],
      variants: [
        {
          title: "P / Preto",
          sku: "MODA-CAM-PRETO-P",
          barcode: "7891000000011",
          ean: "7891000000011",
          weight: 250, // em gramas
          length: 30,  // em cm
          height: 2,   // em cm
          width: 20,   // em cm
          options: { "Tamanho": "P", "Cor": "Preto" },
          prices: [{ amount: 11990, currency_code: "brl" }]
        },
        {
          title: "M / Preto",
          sku: "MODA-CAM-PRETO-M",
          barcode: "7891000000028",
          ean: "7891000000028",
          weight: 270,
          length: 32,
          height: 2,
          width: 22,
          options: { "Tamanho": "M", "Cor": "Preto" },
          prices: [{ amount: 11990, currency_code: "brl" }]
        },
        {
          title: "G / Branco",
          sku: "MODA-CAM-BRANCO-G",
          barcode: "7891000000035",
          ean: "7891000000035",
          weight: 290,
          length: 34,
          height: 3,
          width: 24,
          options: { "Tamanho": "G", "Cor": "Branco" },
          prices: [{ amount: 11990, currency_code: "brl" }]
        }
      ]
    },
    {
      title: "Calça Jeans Slim Comfort",
      handle: "calca-jeans-slim-comfort",
      description: "Calça jeans masculina/feminina com elastano, proporcionando liberdade de movimentos e caimento perfeito.",
      images: [
        { url: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800" }
      ],
      options: [
        { title: "Tamanho", values: ["38", "40", "42"] }
      ],
      variants: [
        {
          title: "Tamanho 38",
          sku: "MODA-JEANS-38",
          barcode: "7891000000042",
          weight: 600,
          length: 40,
          height: 5,
          width: 30,
          options: { "Tamanho": "38" },
          prices: [{ amount: 22990, currency_code: "brl" }]
        },
        {
          title: "Tamanho 40",
          sku: "MODA-JEANS-40",
          barcode: "7891000000059",
          weight: 630,
          length: 40,
          height: 5,
          width: 30,
          options: { "Tamanho": "40" },
          prices: [{ amount: 22990, currency_code: "brl" }]
        },
        {
          title: "Tamanho 42",
          sku: "MODA-JEANS-42",
          barcode: "7891000000066",
          weight: 660,
          length: 42,
          height: 5,
          width: 32,
          options: { "Tamanho": "42" },
          prices: [{ amount: 22990, currency_code: "brl" }]
        }
      ]
    },
    {
      title: "Jaqueta Bomber Urbana",
      handle: "jaqueta-bomber-urbana",
      description: "Jaqueta estilosa resistente ao vento, perfeita para compor looks urbanos e modernos.",
      images: [
        { url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800" }
      ],
      options: [
        { title: "Tamanho", values: ["M", "G"] }
      ],
      variants: [
        {
          title: "M",
          sku: "MODA-JAQ-M",
          barcode: "7891000000073",
          weight: 800,
          length: 35,
          height: 8,
          width: 25,
          options: { "Tamanho": "M" },
          prices: [{ amount: 34990, currency_code: "brl" }]
        },
        {
          title: "G",
          sku: "MODA-JAQ-G",
          barcode: "7891000000080",
          weight: 850,
          length: 37,
          height: 8,
          width: 27,
          options: { "Tamanho": "G" },
          prices: [{ amount: 34990, currency_code: "brl" }]
        }
      ]
    },
    {
      title: "Tênis Casual em Couro",
      handle: "tenis-casual-em-couro",
      description: "Tênis minimalista em couro sintético de alta durabilidade, versátil para qualquer ocasião.",
      images: [
        { url: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800" }
      ],
      options: [
        { title: "Numeração", values: ["39", "41"] }
      ],
      variants: [
        {
          title: "39",
          sku: "MODA-TENIS-39",
          barcode: "7891000000097",
          weight: 950,
          length: 30,
          height: 12,
          width: 20,
          options: { "Numeração": "39" },
          prices: [{ amount: 27990, currency_code: "brl" }]
        },
        {
          title: "41",
          sku: "MODA-TENIS-41",
          barcode: "7891000000103",
          weight: 1020,
          length: 32,
          height: 12,
          width: 21,
          options: { "Numeração": "41" },
          prices: [{ amount: 27990, currency_code: "brl" }]
        }
      ]
    }
  ]

  for (const pData of produtosCompletos) {
    const existingProducts = await productService.listProducts({ handle: [pData.handle] })

    if (existingProducts.length > 0) {
      logger.info(`⚠️ Produto já existe (pulando criação): ${pData.title}`)
      continue
    }

    logger.info(`🧵 Cadastrando produto com especificações logísticas: ${pData.title}...`)
    
    // Cria o produto com peso, dimensões, código de barras e variantes embutidos
    const product = await productService.createProducts({
      title: pData.title,
      handle: pData.handle,
      description: pData.description,
      is_giftcard: false,
      status: "published",
      images: pData.images,
      options: pData.options,
      variants: pData.variants
    })

    // Vincula ao Canal de Vendas padrão
    const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL)
    const salesChannels = await salesChannelModuleService.listSalesChannels()
    const defaultSalesChannel = salesChannels[0]

    if (defaultSalesChannel) {
      await remoteLink.create([
        {
          [Modules.PRODUCT]: {
            product_id: product.id,
          },
          [Modules.SALES_CHANNEL]: {
            sales_channel_id: defaultSalesChannel.id,
          },
        },
      ])
    }

    // Configura o estoque e vincula os itens de inventário para cada variante recém criada
    const createdProduct = await productService.retrieveProduct(product.id, { relations: ["variants"] })

    for (const variant of createdProduct.variants) {
      const inventoryItem = await inventoryService.createInventoryItems({
        sku: variant.sku,
        title: `${product.title} - ${variant.title}`,
        requester_id: "system"
      })

      try {
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
      } catch (e) {
        // Ignora se o link já existir
      }

      try {
        await inventoryService.createInventoryLevels([
          {
            inventory_item_id: inventoryItem.id,
            location_id: defaultLocation.id,
            stocked_quantity: QUANTIDADE_ESTOQUE
          }
        ])
      } catch (e) {
        // Se o nível já existir, atualiza
        await inventoryService.updateInventoryLevels(inventoryItem.id, [
          {
            location_id: defaultLocation.id,
            stocked_quantity: QUANTIDADE_ESTOQUE
          }
        ])
      }
    }

    logger.info(`   ✅ Produto criado com ID: ${product.id} (Estoque: ${QUANTIDADE_ESTOQUE} un por variação)`)
  }

  logger.info("✨ Todos os produtos foram cadastrados com peso, dimensões e estoque sincronizados!")
}