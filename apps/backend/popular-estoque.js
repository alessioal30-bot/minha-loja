import { Modules } from "@medusajs/framework/utils";

export default async function run({ container }) {
  const productService = container.resolve(Modules.PRODUCT);
  const inventoryService = container.resolve(Modules.INVENTORY);
  const stockLocationService = container.resolve(Modules.STOCK_LOCATION);

  console.log("Verificando locais de estoque...");
  const locations = await stockLocationService.listStockLocations({});
  
  let locationId;
  if (locations.length === 0) {
    console.log("Criando depósito principal...");
    const newLocation = await stockLocationService.createStockLocations({
      name: "Depósito Principal",
    });
    locationId = newLocation.id;
  } else {
    locationId = locations[0].id;
    console.log(`Usando depósito existente: ${locations[0].name}`);
  }

  const products = await productService.listProducts({}, {
    relations: ["variants"],
  });

  console.log(`Encontrados ${products.length} produtos. Adicionando estoque...`);

  for (const product of products) {
    for (const variant of product.variants) {
      try {
        const [inventoryItem] = await inventoryService.listInventoryItems({
          sku: variant.sku,
        });

        if (inventoryItem) {
          await inventoryService.createInventoryLevels([
            {
              inventory_item_id: inventoryItem.id,
              location_id: locationId,
              stocked_quantity: 100,
            },
          ]);
          console.log(`Estoque adicionado para: ${product.title} (${variant.title})`);
        }
      } catch (e) {
        console.log(`Aviso para ${product.title}:`, e.message);
      }
    }
  }

  console.log("Estoque populado com sucesso!");
}