module.exports = async function ({ container }) {
  const productService = container.resolve("productModuleService");
  const pricingService = container.resolve("pricingModuleService"); // Se necessário na v2
  const remoteLink = container.resolve("remoteLink");
  const salesChannelModuleService = container.resolve("salesChannelModuleService");

  console.log("🚀 Iniciando cadastro automatizado de produtos com imagens...");

  // Busca o canal de vendas padrão (necessário para o produto aparecer na loja)
  const [salesChannels] = await salesChannelModuleService.listAndCount();
  const defaultSalesChannel = salesChannels[0];

  if (!defaultSalesChannel) {
    console.error("❌ Nenhum Sales Channel encontrado! Crie um canal de vendas no painel primeiro.");
    return;
  }

  // Lista de produtos com imagens de exemplo
  const produtosParaCriar = [
    {
      title: "Vitamina C 1000mg - Imunidade",
      handle: "vitamina-c-1000mg",
      description: "Suplemento alimentar de Vitamina C em cápsulas para fortalecimento do sistema imunológico.",
      images: [
        { url: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800" }
      ],
      options: [
        { title: "Frasco", values: ["60 Cápsulas", "120 Cápsulas"] }
      ],
      variants: [
        {
          title: "60 Cápsulas",
          sku: "VIT-C-60",
          options: { "Frasco": "60 Cápsulas" },
          prices: [{ amount: 4990, currency_code: "brl" }] // R$ 49,90
        },
        {
          title: "120 Cápsulas",
          sku: "VIT-C-120",
          options: { "Frasco": "120 Cápsulas" },
          prices: [{ amount: 8990, currency_code: "brl" }] // R$ 89,90
        }
      ]
    },
    {
      title: "Sérum Facial Hidratante Skincare",
      handle: "serum-facial-hidratante",
      description: "Sérum facial de alto desempenho para hidratação profunda e viço da pele.",
      images: [
        { url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800" }
      ],
      options: [
        { title: "Volume", values: ["30ml"] }
      ],
      variants: [
        {
          title: "30ml",
          sku: "SERUM-30ML",
          options: { "Volume": "30ml" },
          prices: [{ amount: 11990, currency_code: "brl" }] // R$ 119,90
        }
      ]
    },
    {
      title: "Whey Protein Isolado 900g",
      handle: "whey-protein-isolado",
      description: "Proteína isolada de rápida absorção ideal para ganho de massa magra e recuperação muscular.",
      images: [
        { url: "https://images.unsplash.com/photo-1579722821273-0f6c73f53c86?w=800" }
      ],
      options: [
        { title: "Sabor", values: ["Chocolate", "Baunilha"] }
      ],
      variants: [
        {
          title: "Chocolate",
          sku: "WHEY-CHOCO",
          options: { "Sabor": "Chocolate" },
          prices: [{ amount: 19990, currency_code: "brl" }] // R$ 199,90
        },
        {
          title: "Baunilha",
          sku: "WHEY-BAUNILHA",
          options: { "Sabor": "Baunilha" },
          prices: [{ amount: 19990, currency_code: "brl" }] // R$ 199,90
        }
      ]
    },
    {
      title: "Tênis Esportivo Casual Estilo",
      handle: "tenis-esportivo-casual",
      description: "Tênis confortável para o dia a dia e atividades físicas leves.",
      images: [
        { url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800" }
      ],
      options: [
        { title: "Tamanho", values: ["40", "42"] }
      ],
      variants: [
        {
          title: "Tamanho 40",
          sku: "TENIS-40",
          options: { "Tamanho": "40" },
          prices: [{ amount: 29990, currency_code: "brl" }] // R$ 299,90
        },
        {
          title: "Tamanho 42",
          sku: "TENIS-42",
          options: { "Tamanho": "42" },
          prices: [{ amount: 29990, currency_code: "brl" }] // R$ 299,90
        }
      ]
    }
  ];

  for (const pData of produtosParaCriar) {
    console.log(`📦 Criando produto: ${pData.title}...`);
    
    const product = await productService.createProducts({
      title: pData.title,
      handle: pData.handle,
      description: pData.description,
      is_giftcard: false,
      status: "published",
      images: pData.images,
      options: pData.options,
      variants: pData.variants
    });

    // Vincula o produto ao Canal de Vendas padrão para aparecer na loja
    await remoteLink.create([
      {
        [container.modules.PRODUCT]: {
          product_id: product.id,
        },
        [container.modules.SALES_CHANNEL]: {
          sales_channel_id: defaultSalesChannel.id,
        },
      },
    ]);

    console.log(`   ✅ Produto criado com sucesso ID: ${product.id}`);
  }

  console.log("\n✨ Todos os produtos foram cadastrados e publicados com sucesso!");
};