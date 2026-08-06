const { initialize } = require("@medusajs/medusa-cli");
const script = require("./criar-hierarquia.js");

async function run() {
  try {
    const { container } = await initialize({
      directory: process.cwd(),
    });
    
    await script({ container });
    console.log("Processo concluído com sucesso!");
    process.exit(0);
  } catch (error) {
    console.error("Erro ao executar script:", error);
    process.exit(1);
  }
}

run();