export default async function seedCategorias({ container }) {
  const logger = container.resolve("logger")
  const productModuleService = container.resolve("product")

  logger.info("🌳 Iniciando criação da árvore completa de categorias...")

  const categorias = [
    {
      name: "Saúde",
      handle: "saude",
      children: [
        {
          name: "Farmacêuticos",
          handle: "farmaceuticos",
          children: [
            { name: "Medicamentos", handle: "medicamentos" },
            { name: "Dor e Febre", handle: "dor-e-febre" },
            { name: "Gripe e Resfriado", handle: "gripe-e-resfriado" },
            { name: "Digestão", handle: "digestao" },
            { name: "Primeiros Socorros", handle: "primeiros-socorros" },
          ],
        },
        {
          name: "Cuidados Diários",
          handle: "cuidados-diarios",
          children: [
            { name: "Higiene Pessoal", handle: "higiene-pessoal" },
            { name: "Higiene Bucal", handle: "higiene-bucal" },
            { name: "Cuidado Corporal", handle: "cuidado-corporal" },
          ],
        },
        {
          name: "Bem-estar e Imunidade",
          handle: "bem-estar-imunidade",
          children: [
            { name: "Imunidade", handle: "imunidade" },
            { name: "Sono e Relaxamento", handle: "sono-relaxamento" },
            { name: "Energia e Disposição", handle: "energia-disposicao" },
          ],
        },
        {
          name: "Saúde Preventiva",
          handle: "saude-preventiva",
          children: [
            { name: "Vitaminas Preventivas", handle: "vitaminas-preventivas" },
            { name: "Monitoramento da Saúde", handle: "monitoramento-saude" },
          ],
        },
      ],
    },
    {
      name: "Beleza",
      handle: "beleza",
      children: [
        {
          name: "Cosméticos",
          handle: "cosmeticos",
          children: [
            { name: "Rosto", handle: "cosmeticos-rosto" },
            { name: "Corpo", handle: "cosmeticos-corpo" },
            { name: "Maquiagem", handle: "maquiagem" },
          ],
        },
        {
          name: "Skincare",
          handle: "skincare",
          children: [
            { name: "Limpeza Facial", handle: "limpeza-facial" },
            { name: "Hidratação Facial", handle: "hidratacao-facial" },
            { name: "Protetor Solar", handle: "protetor-solar" },
            { name: "Anti-idade", handle: "anti-idade" },
            { name: "Tratamento Facial", handle: "tratamento-facial" },
          ],
        },
        {
          name: "Cuidados Capilares",
          handle: "cuidados-capilares",
          children: [
            { name: "Shampoos", handle: "shampoos" },
            { name: "Condicionadores", handle: "condicionadores" },
            { name: "Tratamentos Capilares", handle: "tratamentos-capilares" },
            { name: "Finalizadores", handle: "finalizadores" },
          ],
        },
        {
          name: "Perfumaria",
          handle: "perfumaria",
          children: [
            { name: "Perfumes Femininos", handle: "perfumes-femininos" },
            { name: "Perfumes Masculinos", handle: "perfumes-masculinos" },
            { name: "Perfumes Unissex", handle: "perfumes-unissex" },
            { name: "Desodorantes", handle: "desodorantes" },
          ],
        },
      ],
    },
    {
      name: "Bem-estar",
      handle: "bem-estar",
      children: [
        {
          name: "Nutrição Alimentar",
          handle: "nutricao-alimentar",
          children: [
            { name: "Whey Protein", handle: "whey-protein" },
            { name: "Creatina", handle: "creatina" },
            { name: "Barras Proteicas", handle: "barras-proteicas" },
            { name: "Shakes", handle: "shakes" },
            { name: "Alimentos Funcionais", handle: "alimentos-funcionais" },
          ],
        },
        {
          name: "Suplementação Esportiva",
          handle: "suplementacao-esportiva",
          children: [
            { name: "Pré-treino", handle: "pre-treino" },
            { name: "Pós-treino", handle: "pos-treino" },
            { name: "Aminoácidos", handle: "aminoacidos" },
            { name: "Proteínas", handle: "proteinas" },
            { name: "Hipercalóricos", handle: "hipercaloricos" },
          ],
        },
        {
          name: "Vitaminas e Minerais",
          handle: "vitaminas-minerais",
          children: [
            { name: "Multivitamínicos", handle: "multivitaminicos" },
            { name: "Vitamina C", handle: "vitamina-c" },
            { name: "Vitamina D", handle: "vitamina-d" },
            { name: "Magnésio", handle: "magnesio" },
            { name: "Ômega 3", handle: "omega-3" },
          ],
        },
        {
          name: "Chás e Infusões",
          handle: "chas-infusoes",
          children: [
            { name: "Chás Naturais", handle: "chas-naturais" },
            { name: "Chás Funcionais", handle: "chas-funcionais" },
            { name: "Infusões", handle: "infusoes" },
          ],
        },
      ],
    },
    {
      name: "Estilo",
      handle: "estilo",
      children: [
        {
          name: "Ecossistema Moda",
          handle: "ecossistema-moda",
          children: [
            { name: "Masculino", handle: "masculino" },
            { name: "Feminino", handle: "feminino" },
            { name: "Unissex", handle: "unissex" },
          ],
        },
        {
          name: "Vestuário Masculino",
          handle: "vestuario-masculino",
          children: [
            { name: "Camisetas", handle: "camisetas-masculinas" },
            { name: "Camisas", handle: "camisas-masculinas" },
            { name: "Calças", handle: "calcas-masculinas" },
            { name: "Bermudas", handle: "bermudas-masculinas" },
            { name: "Jaquetas", handle: "jaquetas-masculinas" },
          ],
        },
        {
          name: "Vestuário Feminino",
          handle: "vestuario-feminino",
          children: [
            { name: "Blusas", handle: "blusas-femininas" },
            { name: "Vestidos", handle: "vestidos" },
            { name: "Calças", handle: "calcas-femininas" },
            { name: "Saias", handle: "saias" },
            { name: "Jaquetas", handle: "jaquetas-femininas" },
          ],
        },
        {
          name: "Moda Conforto & Loungewear",
          handle: "moda-conforto-loungewear",
          children: [
            { name: "Pijamas", handle: "pijamas" },
            { name: "Roupas de Conforto", handle: "roupas-conforto" },
            { name: "Loungewear Masculino", handle: "loungewear-masculino" },
            { name: "Loungewear Feminino", handle: "loungewear-feminino" },
          ],
        },
        {
          name: "Acessórios & Detalhes",
          handle: "acessorios-detalhes",
          children: [
            { name: "Bolsas", handle: "bolsas" },
            { name: "Mochilas", handle: "mochilas" },
            { name: "Bonés", handle: "bones" },
            { name: "Cintos", handle: "cintos" },
            { name: "Acessórios", handle: "acessorios" },
          ],
        },
      ],
    },
  ]

  async function criarOuAtualizarCategoria(data, parentCategoryId = undefined) {
    const existing = await productModuleService.listProductCategories({
      handle: data.handle,
    })

    let category

    if (existing.length > 0) {
      category = existing[0]
      await productModuleService.updateProductCategories(category.id, {
        name: data.name,
        is_active: true,
      })
      logger.info(`✓ Categoria já existe: ${data.name}`)
    } else {
      category = await productModuleService.createProductCategories({
        name: data.name,
        handle: data.handle,
        is_active: true,
        ...(parentCategoryId ? { parent_category_id: parentCategoryId } : {}),
      })
      logger.info(`+ Categoria criada: ${data.name}`)
    }

    if (data.children) {
      for (const child of data.children) {
        await criarOuAtualizarCategoria(child, category.id)
      }
    }

    return category
  }

  for (const categoria of categorias) {
    await criarOuAtualizarCategoria(categoria)
  }

  logger.info("🌳 Árvore completa de categorias criada com sucesso!")
}