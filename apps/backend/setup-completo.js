import { Modules } from "@medusajs/framework/utils";

export default async function run({ container }) {
  const productService = container.resolve(Modules.PRODUCT);

  console.log("Iniciando aplicação de marcas por categoria...");

  // Mapeamento de Categorias para Marcas
  const mapaMarcas = {
    "ecossistema moda": "Schalk, Crosby",
    "nutrição alimentar": "Dinamolabz",
    "cosméticos": "Mary Kay",
    "farmacêuticos": "Em manutenção"
  };

  const products = await productService.listProducts({}, {
    relations: ["categories"],
  });

  for (const product of products) {
    // Pega a primeira categoria vinculada ao produto
    const categoria = product.categories?.[0]?.name?.toLowerCase() || "";
    
    let marcaParaAplicar = "Am Suplementos e Vestuario"; // Marca padrão

    // Encontra a marca baseada no nome da categoria
    for (const [key, value] of Object.entries(mapaMarcas)) {
      if (categoria.includes(key)) {
        marcaParaAplicar = value;
        break;
      }
    }

    try {
      // Atualiza a marca no campo metadata (o Medusa v2 usa metadata para atributos extras de marca)
      await productService.updateProducts(product.id, {
        metadata: {
          ...product.metadata,
          marca: marcaParaAplicar,
        },
      });
      console.log(`[Marca: ${marcaParaAplicar}] Atualizado: "${product.title}"`);
    } catch (e) {
      console.log(`Erro ao atualizar marca de ${product.title}:`, e.message);
    }
  }

  console.log("\nProcesso de marcação finalizado!");
}