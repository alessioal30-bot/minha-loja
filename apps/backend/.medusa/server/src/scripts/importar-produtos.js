"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = importProductsWorkflow;
const core_flows_1 = require("@medusajs/medusa/core-flows");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
async function importProductsWorkflow({ container }) {
    const logger = container.resolve("logger");
    logger.info("Iniciando importação em massa de produtos...");
    try {
        const filePath = path.join(process.cwd(), "produtos.json");
        if (!fs.existsSync(filePath)) {
            logger.error(`Arquivo produtos.json não encontrado em: ${filePath}`);
            return;
        }
        const arquivo = fs.readFileSync(filePath, "utf8");
        const produtos = JSON.parse(arquivo);
        logger.info(`Encontrados ${produtos.length} produtos para cadastrar.`);
        for (const p of produtos) {
            logger.info(`Cadastrando produto: ${p.title}`);
            try {
                await (0, core_flows_1.createProductsWorkflow)(container).run({
                    input: {
                        products: [
                            {
                                title: p.title,
                                handle: p.handle,
                                description: p.description,
                                status: "published",
                                options: p.options.map((opt) => ({ title: opt })),
                                variants: p.variants.map((v) => ({
                                    title: v.title,
                                    sku: v.sku,
                                    manage_inventory: true,
                                    options: v.options,
                                    prices: v.prices.map((pr) => ({
                                        amount: pr.amount,
                                        currency_code: pr.currency_code,
                                    })),
                                })),
                            },
                        ],
                    },
                });
                logger.info(`Sucesso ao cadastrar: ${p.title}`);
            }
            catch (err) {
                logger.error(`Erro ao cadastrar o produto ${p.title}: ${err.message}`);
            }
        }
        logger.info("Importação de produtos finalizada com sucesso!");
    }
    catch (err) {
        logger.error(`Erro geral na importação: ${err.message}`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0YXItcHJvZHV0b3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2NyaXB0cy9pbXBvcnRhci1wcm9kdXRvcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1BLHlDQXFEQztBQXpERCw0REFBb0U7QUFDcEUsdUNBQXdCO0FBQ3hCLDJDQUE0QjtBQUViLEtBQUssVUFBVSxzQkFBc0IsQ0FBQyxFQUFFLFNBQVMsRUFBWTtJQUMxRSxNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsOENBQThDLENBQUMsQ0FBQTtJQUUzRCxJQUFJLENBQUM7UUFDSCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxlQUFlLENBQUMsQ0FBQTtRQUMxRCxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxLQUFLLENBQUMsNENBQTRDLFFBQVEsRUFBRSxDQUFDLENBQUE7WUFDcEUsT0FBTTtRQUNSLENBQUM7UUFFRCxNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUNqRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBRXBDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxRQUFRLENBQUMsTUFBTSwyQkFBMkIsQ0FBQyxDQUFBO1FBRXRFLEtBQUssTUFBTSxDQUFDLElBQUksUUFBUSxFQUFFLENBQUM7WUFDekIsTUFBTSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUE7WUFFOUMsSUFBSSxDQUFDO2dCQUNILE1BQU0sSUFBQSxtQ0FBc0IsRUFBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUM7b0JBQzFDLEtBQUssRUFBRTt3QkFDTCxRQUFRLEVBQUU7NEJBQ1I7Z0NBQ0UsS0FBSyxFQUFFLENBQUMsQ0FBQyxLQUFLO2dDQUNkLE1BQU0sRUFBRSxDQUFDLENBQUMsTUFBTTtnQ0FDaEIsV0FBVyxFQUFFLENBQUMsQ0FBQyxXQUFXO2dDQUMxQixNQUFNLEVBQUUsV0FBVztnQ0FDbkIsT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7Z0NBQ3pELFFBQVEsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztvQ0FDcEMsS0FBSyxFQUFFLENBQUMsQ0FBQyxLQUFLO29DQUNkLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRztvQ0FDVixnQkFBZ0IsRUFBRSxJQUFJO29DQUN0QixPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU87b0NBQ2xCLE1BQU0sRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQU8sRUFBRSxFQUFFLENBQUMsQ0FBQzt3Q0FDakMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNO3dDQUNqQixhQUFhLEVBQUUsRUFBRSxDQUFDLGFBQWE7cUNBQ2hDLENBQUMsQ0FBQztpQ0FDSixDQUFDLENBQUM7NkJBQ0o7eUJBQ0Y7cUJBQ0Y7aUJBQ0YsQ0FBQyxDQUFBO2dCQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFBO1lBQ2pELENBQUM7WUFBQyxPQUFPLEdBQVEsRUFBRSxDQUFDO2dCQUNsQixNQUFNLENBQUMsS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUMsS0FBSyxLQUFLLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFBO1lBQ3hFLENBQUM7UUFDSCxDQUFDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxnREFBZ0QsQ0FBQyxDQUFBO0lBQy9ELENBQUM7SUFBQyxPQUFPLEdBQVEsRUFBRSxDQUFDO1FBQ2xCLE1BQU0sQ0FBQyxLQUFLLENBQUMsNkJBQTZCLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFBO0lBQzFELENBQUM7QUFDSCxDQUFDIn0=