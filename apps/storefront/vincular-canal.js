const { Modules } = require("@medusajs/framework/utils");

async function run({ container }) {
  const productService = container.resolve(Modules.PRODUCT);
  const salesChannelService = container.resolve(Modules.SALES_CHANNEL);

  console.log("Buscando canais de vendas...");
  const [channels] = await salesChannelService.listAndCount({});
  
  if (channels.length === 0) {
    console.log("Nenhum canal de vendas encontrado!");
    return;
  }

  const defaultChannel = channels[0];
  console.log(`Canal encontrado: ${defaultChannel.name} (${defaultChannel.id})`);

  const [products] = await productService.listAndCount({});
  console.log(`Encontrados ${products.length} produtos. Vinculando ao canal...`);

  for (const product of products) {
    try {
      // Associa o produto ao canal padrão
      await productService.updateProducts(product.id, {
        sales_channels: [
          {
            id: defaultChannel.id,
          },
        ],
      });
      console.log(`Produto atualizado: ${product.title}`);
    } catch (e) {
      console.log(`Erro ao atualizar ${product.title}:`, e.message);
    }
  }

  console.log("Processo concluído com sucesso!");
}

module.exports = run;