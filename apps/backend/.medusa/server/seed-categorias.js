"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = seedCategorias;
const utils_1 = require("@medusajs/framework/utils");
async function seedCategorias({ container }) {
    const logger = container.resolve(utils_1.ContainerRegistrationKeys.LOGGER);
    const productModuleService = container.resolve("product");
    logger.info("Iniciando atualização e mapeamento das categorias...");
    const categoriasPrincipal = [
        {
            name: "Saúde",
            handle: "saude",
            is_active: true,
            category_children: [
                { name: "Farmacêuticos", handle: "farmaceuticos", is_active: true },
                { name: "Cuidados Diários", handle: "cuidados-diarios", is_active: true },
                { name: "Bem-estar e Imunidade", handle: "bem-estar-imunidade", is_active: true },
                { name: "Saúde Preventiva", handle: "saude-preventiva", is_active: true },
            ],
        },
        {
            name: "Beleza",
            handle: "beleza",
            is_active: true,
            category_children: [
                { name: "Cosméticos", handle: "cosmeticos", is_active: true },
                { name: "Skincare", handle: "skincare", is_active: true },
                { name: "Maquiagem", handle: "maquiagem", is_active: true },
                { name: "Cuidados Capilares", handle: "cuidados-capilares", is_active: true },
                { name: "Perfumaria", handle: "perfumaria", is_active: true },
            ],
        },
        {
            name: "Bem-estar",
            handle: "bem-estar",
            is_active: true,
            category_children: [
                { name: "Nutrição Alimentar", handle: "nutricao-alimentar", is_active: true },
                { name: "Suplementação Esportiva", handle: "suplementacao-esportiva", is_active: true },
                { name: "Alimentação Saudável", handle: "alimentacao-saudavel", is_active: true },
                { name: "Vitaminas e Minerais", handle: "vitaminas-minerais", is_active: true },
                { name: "Chás e Infusões", handle: "chas-infusoes", is_active: true },
            ],
        },
        {
            name: "Estilo",
            handle: "estilo",
            is_active: true,
            category_children: [
                { name: "Ecossistema Moda", handle: "ecossistema-moda", is_active: true },
                { name: "Vestuário Masculino", handle: "vestuario-masculino", is_active: true },
                { name: "Vestuário Feminino", handle: "vestuario-feminino", is_active: true },
                { name: "Moda Conforto & Loungewear", handle: "moda-conforto-loungewear", is_active: true },
                { name: "Acessórios & Detalhes", handle: "acessorios-detalhes", is_active: true },
            ],
        },
    ];
    for (const catData of categoriasPrincipal) {
        const { category_children, ...parentData } = catData;
        let parentCategory;
        const existingParent = await productModuleService.listProductCategories({ handle: parentData.handle });
        if (existingParent.length > 0) {
            parentCategory = existingParent[0];
            // Atualiza o nome caso esteja incorreto
            await productModuleService.updateProductCategories(parentCategory.id, { name: parentData.name });
        }
        else {
            parentCategory = await productModuleService.createProductCategories(parentData);
        }
        if (category_children && category_children.length > 0) {
            for (const childData of category_children) {
                const existingChild = await productModuleService.listProductCategories({ handle: childData.handle });
                if (existingChild.length > 0) {
                    // Atualiza a subcategoria existente com o nome acentuado correto
                    await productModuleService.updateProductCategories(existingChild[0].id, { name: childData.name });
                }
                else {
                    await productModuleService.createProductCategories({
                        ...childData,
                        parent_category_id: parentCategory.id,
                    });
                }
            }
        }
    }
    logger.info("Atualização de categorias concluída com sucesso!");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VlZC1jYXRlZ29yaWFzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc2VlZC1jYXRlZ29yaWFzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsaUNBc0ZDO0FBeEZELHFEQUFxRTtBQUV0RCxLQUFLLFVBQVUsY0FBYyxDQUFDLEVBQUUsU0FBUyxFQUFrQztJQUN4RixNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ2xFLE1BQU0sb0JBQW9CLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUV6RCxNQUFNLENBQUMsSUFBSSxDQUFDLHNEQUFzRCxDQUFDLENBQUE7SUFFbkUsTUFBTSxtQkFBbUIsR0FBRztRQUMxQjtZQUNFLElBQUksRUFBRSxPQUFPO1lBQ2IsTUFBTSxFQUFFLE9BQU87WUFDZixTQUFTLEVBQUUsSUFBSTtZQUNmLGlCQUFpQixFQUFFO2dCQUNqQixFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFO2dCQUNuRSxFQUFFLElBQUksRUFBRSxrQkFBa0IsRUFBRSxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRTtnQkFDekUsRUFBRSxJQUFJLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxFQUFFLHFCQUFxQixFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUU7Z0JBQ2pGLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixFQUFFLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFO2FBQzFFO1NBQ0Y7UUFDRDtZQUNFLElBQUksRUFBRSxRQUFRO1lBQ2QsTUFBTSxFQUFFLFFBQVE7WUFDaEIsU0FBUyxFQUFFLElBQUk7WUFDZixpQkFBaUIsRUFBRTtnQkFDakIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxZ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