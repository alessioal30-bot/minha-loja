const fs = require("fs");

async function iniciarCadastro() {
  try {
    const arquivo = fs.readFileSync("produtos.json", "utf8");
    const produtosParaCadastrar = JSON.parse(arquivo);

    console.log(`Iniciando o processamento de ${produtosParaCadastrar.length} produtos...`);

    for (const produto of produtosParaCadastrar) {
      console.log(`\n📦 Produto: ${produto.title}`);
      console.log(`   Handle: ${produto.handle}`);
      console.log(`   Categoria: ${produto.category}`);
      console.log(`   Variantes (${produto.variants.length}):`);

      produto.variants.forEach((v, index) => {
        const precoReais = (v.prices[0].amount / 100).toFixed(2);
        console.log(`     - [${index + 1}] Variação: ${v.title} | SKU: ${v.sku} | Preço: R$ ${precoReais} | Estoque: ${v.inventory_quantity}`);
      });
    }

    console.log("\n✅ Esqueleto validado com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao ler o esqueleto:", error.message);
  }
}

iniciarCadastro();

