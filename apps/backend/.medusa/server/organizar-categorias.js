"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = run;
const utils_1 = require("@medusajs/framework/utils");
async function run({ container }) {
    const logger = container.resolve(utils_1.ContainerRegistrationKeys.LOGGER);
    const query = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const productService = container.resolve("productModuleService");
    logger.info("Limpando categorias antigas e duplicadas...");
    const { data: existingCategories } = await query.graph({
        entity: "product_category",
        fields: ["id", "name"],
    });
    const categoryIds = existingCategories.map((c) => c.id);
    if (categoryIds.length > 0) {
        await productService.deleteProductCategories(categoryIds);
        logger.info(`${categoryIds.length} categorias antigas removidas com sucesso.`);
    }
    logger.info("Criando nova árvore de categorias organizada...");
    const farmaceuticos = await productService.createProductCategories({
        name: "Farmacêuticos",
        is_active: true,
        is_internal: false,
    });
    await productService.createProductCategories([
        { name: "Medicamentos", parent_category_id: farmaceuticos.id, is_active: true },
        { name: "Primeiros Socorros", parent_category_id: farmaceuticos.id, is_active: true },
    ]);
    const cosmeticos = await productService.createProductCategories({
        name: "Cosméticos",
        is_active: true,
        is_internal: false,
    });
    await productService.createProductCategories([
        { name: "Skincare", parent_category_id: cosmeticos.id, is_active: true },
        { name: "Cuidados Capilares", parent_category_id: cosmeticos.id, is_active: true },
        { name: "Perfumaria", parent_category_id: cosmeticos.id, is_active: true },
    ]);
    const nutricao = await productService.createProductCategories({
        name: "Nutrição",
        is_active: true,
        is_internal: false,
    });
    await productService.createProductCategories([
        { name: "Suplementos", parent_category_id: nutricao.id, is_active: true },
        { name: "Vitaminas e Minerais", parent_category_id: nutricao.id, is_active: true },
        { name: "Alimentação Saudável", parent_category_id: nutricao.id, is_active: true },
    ]);
    const vestuario = await productService.createProductCategories({
        name: "Vestuário",
        is_active: true,
        is_internal: false,
    });
    await productService.createProductCategories([
        { name: "Moda Masculina", parent_category_id: vestuario.id, is_active: true },
        { name: "Moda Feminina", parent_category_id: vestuario.id, is_active: true },
        { name: "Acessórios", parent_category_id: vestuario.id, is_active: true },
    ]);
    logger.info("Categorias organizadas com sucesso!");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JnYW5pemFyLWNhdGVnb3JpYXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9vcmdhbml6YXItY2F0ZWdvcmlhcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBLHNCQXFFQztBQXZFRCxxREFBcUU7QUFFdEQsS0FBSyxVQUFVLEdBQUcsQ0FBQyxFQUFFLFNBQVMsRUFBa0M7SUFDN0UsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxpQ0FBeUIsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUNsRSxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2hFLE1BQU0sY0FBYyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQTtJQUVoRSxNQUFNLENBQUMsSUFBSSxDQUFDLDZDQUE2QyxDQUFDLENBQUE7SUFFMUQsTUFBTSxFQUFFLElBQUksRUFBRSxrQkFBa0IsRUFBRSxHQUFHLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQztRQUNyRCxNQUFNLEVBQUUsa0JBQWtCO1FBQzFCLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUM7S0FDdkIsQ0FBQyxDQUFBO0lBRUYsTUFBTSxXQUFXLEdBQUcsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUE7SUFFNUQsSUFBSSxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQzNCLE1BQU0sY0FBYyxDQUFDLHVCQUF1QixDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ3pELE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxXQUFXLENBQUMsTUFBTSw0Q0FBNEMsQ0FBQyxDQUFBO0lBQ2hGLENBQUM7SUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLGlEQUFpRCxDQUFDLENBQUE7SUFFOUQsTUFBTSxhQUFh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