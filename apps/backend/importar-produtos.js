
const fs = require("fs");
// Carrega o ambiente do Medusa compilado ou via ts-node
const { Modules } = require("@medusajs/utils");

async function importar() {
  try {
    console.log("Conectando ao ambiente do Medusa...");
    
    // Lê o arquivo de produtos
    const arquivo = fs.readFileSync("produtos.json", "utf8");
    const produtos = JSON.parse(arquivo);

    console.log(`Encontrados ${produtos.length} produtos para importar.`);

    // Importa dinamicamente a aplicação do Medusa
    // No Medusa v2, usamos o container para acessar os módulos de produtos e vendas
    const { 
      createProductsWorkflow 
    } = require("@medusajs/medusa/core-flows");

    // Nota: Como estamos rodando via Node puro, precisamos garantir que o carregador do container esteja ativo.
    // Vamos usar a API interna do framework para injetar os produtos.

    console.log("\nPreparando para injetar via Workflows do Medusa...");
    
    for (const p of produtos) {
      console.log(`\n📦 Cadastrando: ${p.title} (${p.handle})`);
      
      // Estrutura de dados compatível com o Medusa v2 createProductsWorkflow
      const produtoInput = {
        title: p.title,
        handle: p.handle,
        description: p.description,
        status: "published",
        options: p.options.map(opt => ({ title: opt })),
        variants: p.variants.map(v => ({
          title: v.title,
          sku: v.sku,
          manage_inventory: true,
          options: v.options,
          prices: v.prices.map(pr => ({
            amount: pr.amount,
            currency_code: pr.currency_code
          }))
        }))
      };

      console.log(" -> Dados mapeados com sucesso. Pronto para execução no banco.");
    }

    console.log("\n✨ Para salvar no banco com segurança utilizando a injeção de dependência do Medusa, vamos rodar via comando do framework.");
  } catch (err) {
    console.error("❌ Erro na importação:", err);
  }
}

importar();
