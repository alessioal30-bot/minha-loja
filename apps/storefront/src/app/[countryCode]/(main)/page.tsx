import { Metadata } from "next"

import Hero from "@modules/home/components/hero"
import ImageCarousel from "@modules/home/components/image-carousel"
import NovembroAzul from "@modules/home/components/novembro-azul"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "AM Suplementos e Vestuário",
  description: "Explore nossa coleção exclusiva com elegância e sofisticação.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params

  const [region, { collections }] = await Promise.all([getRegion(countryCode), listCollections({ fields: "id, handle, title" })])

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <section aria-label="Black Friday">
        <img src="/images/black-friday-am-20261106.jpg"
          alt="Black Friday. Moda, suplementos e beleza. WhatsApp (84) 9838-8771."
          width={2172} height={724} fetchPriority="high" className="block h-auto w-full" />
      </section>
      <NovembroAzul />
      <section aria-labelledby="chamada-parceiros" className="bg-[#eff7ff]">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-5 px-6 py-8 md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <h2 id="chamada-parceiros" className="text-2xl font-bold text-slate-900">Atacado</h2>
            <p className="mt-2 max-w-3xl text-slate-700">Compre em quantidade ou para revenda. Solicite uma cotação de Schalk, Crosby ou suplementos com CPF ou CNPJ.</p>
          </div>
          <a href={`/${countryCode}/parceiros`} className="inline-flex min-h-11 shrink-0 items-center rounded-lg border border-[#b9d8f4] bg-white px-5 py-2 font-semibold text-slate-900 hover:bg-[#dfedfc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Solicitar orçamento no atacado</a>
        </div>
      </section>

      <section className="w-full bg-white" data-banner-id="schalk-crosby"><img src="/images/campanha-schalk-crosby-8990-20261026/06-montagem-cinco-modelos.png" alt="SCHALK + CROSBY: 3 camisetas básicas por R$ 149,90. Avulsa R$ 79,90. Combine cores, tamanhos e marcas, masculinas e femininas." loading="lazy" decoding="async" className="block w-full h-auto" /></section>

      <section className="w-full bg-white"><img src="/images/banner-mary-kay-novo.png" alt="Mary Kay - Amanda Cordeiro - WhatsApp +55 84 9989-3205" loading="lazy" decoding="async" className="block w-full h-auto" /></section>

      <section className="w-full bg-white"><img src="/images/banner-nutricao-alimentar.png" alt="Nutricao Alimentar - AM Suplementos e Vestuario" loading="lazy" decoding="async" className="block w-full h-auto" /></section>
      <div className="py-16 max-w-7xl mx-auto px-6 md:px-8 bg-white">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#0A192F]">
            Destaques da Semana
          </h2>
          <a 
            href={"/" + countryCode + "/store"} 
            className="text-sm font-medium text-[#1D4ED8] hover:text-blue-900 transition-colors"
          >
            Ver todos &rarr;
          </a>
        </div>
        
        <img
          src="/images/creatina-max-camiseta-120-reais.webp" loading="lazy" decoding="async"
          alt="Oferta: 2 creatinas Max de 300 g cada por R$ 120,00 e ganhe uma camiseta. Peça pelo WhatsApp (84) 9613-0844."
          width={1254}
          height={1254}
          className="block w-full max-w-2xl h-auto mx-auto"
        />

        <section className="mt-12" data-campaign-gallery="schalk-crosby-individuais" aria-label="Campanhas individuais de camisetas básicas">
          <h3 className="text-xl md:text-2xl font-bold text-[#0A192F]">Monte seu trio de básicas</h3>
          <p className="mt-2 mb-5 text-sm text-gray-600">3 por R$ 149,90. Misture cores, tamanhos, marcas, masculinas e femininas. Deslize para ver todas as opções.</p>
          <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4">
            <a href={"/" + countryCode + "/products/moda-masculina-camiseta-basica"} className="block shrink-0 snap-start w-[82%] sm:w-[45%] lg:w-[31%] rounded-xl overflow-hidden border border-gray-100 bg-white"><img src="/images/campanha-schalk-crosby-20261024/01-basica-vinho-feed.jpg" alt="Básica vinho — 3 camisetas básicas por R$ 149,90" width={1080} height={1350} loading="lazy" decoding="async" className="block w-full h-auto object-contain" /></a>
            <a href={"/" + countryCode + "/products/moda-masculina-camiseta-basica"} className="block shrink-0 snap-start w-[82%] sm:w-[45%] lg:w-[31%] rounded-xl overflow-hidden border border-gray-100 bg-white"><img src="/images/campanha-schalk-crosby-20261024/02-basica-branca-feed.jpg" alt="Básica branca — 3 camisetas básicas por R$ 149,90" width={1080} height={1350} loading="lazy" decoding="async" className="block w-full h-auto object-contain" /></a>
            <a href={"/" + countryCode + "/products/moda-feminina-camiseta-basica"} className="block shrink-0 snap-start w-[82%] sm:w-[45%] lg:w-[31%] rounded-xl overflow-hidden border border-gray-100 bg-white"><img src="/images/campanha-schalk-crosby-20261024/03-basica-amarela-feminina-feed.jpg" alt="Básica amarela feminina — 3 camisetas básicas por R$ 149,90" width={1080} height={1350} loading="lazy" decoding="async" className="block w-full h-auto object-contain" /></a>
            <a href={"/" + countryCode + "/products/meta-camiseta-basica-crosby-masculina-preto"} className="block shrink-0 snap-start w-[82%] sm:w-[45%] lg:w-[31%] rounded-xl overflow-hidden border border-gray-100 bg-white"><img src="/images/campanha-schalk-crosby-8990-20261026/04-crosby-preta-feed.jpg" alt="Crosby preta — 3 camisetas básicas por R$ 149,90" width={1080} height={1350} loading="lazy" decoding="async" className="block w-full h-auto object-contain" /></a>
            <a href={"/" + countryCode + "/products/moda-feminina-camiseta-basica"} className="block shrink-0 snap-start w-[82%] sm:w-[45%] lg:w-[31%] rounded-xl overflow-hidden border border-gray-100 bg-white"><img src="/images/campanha-schalk-crosby-8990-20261026/05-crosby-feminina-coral-feed.jpg" alt="Crosby feminina coral — 3 camisetas básicas por R$ 149,90" width={1080} height={1350} loading="lazy" decoding="async" className="block w-full h-auto object-contain" /></a>
          </div>
        </section>
      </div>

      <Hero />
      <ImageCarousel />
    </>
  )
}

