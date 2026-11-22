import { Metadata } from "next"

import Hero from "@modules/home/components/hero"
import ImageCarousel from "@modules/home/components/image-carousel"
import AutoScrollGallery from "@modules/home/components/auto-scroll-gallery"
import NovembroAzul from "@modules/home/components/novembro-azul"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

const mariaRicaPhotos = [
  {
    "src": "https://apcm-midias-campanhas-202611.pages.dev/feed/calcinha-atitude.jpg",
    "alt": "CALCINHA ATITUDE POLIAMIDA"
  },
  {
    "src": "https://apcm-midias-campanhas-202611.pages.dev/feed/calcinha-aurora-cotton.jpg",
    "alt": "CALCINHA AURORA COTTON"
  },
  {
    "src": "https://apcm-midias-campanhas-202611.pages.dev/feed/cueca-box-adulto-cotton.jpg",
    "alt": "CUECA BOX ADULTO COTTON"
  },
  {
    "src": "https://apcm-midias-campanhas-202611.pages.dev/feed/camisola-charlotte-poliamida.jpg",
    "alt": "CAMISOLA CHARLOTTE POLIAMIDA"
  },
  {
    "src": "https://apcm-midias-campanhas-202611.pages.dev/feed/camisola-cristal-adulto.jpg",
    "alt": "CAMISOLA CRISTAL ADULTO"
  },
  {
    "src": "https://apcm-midias-campanhas-202611.pages.dev/feed/baby-doll-jasmin.jpg",
    "alt": "BABY DOLL JASMIN POLIAMIDA"
  },
  {
    "src": "https://apcm-midias-campanhas-202611.pages.dev/feed/cueca-box-adulto-poliamida.jpg",
    "alt": "CUECA BOX ADULTO POLIAMIDA"
  },
  {
    "src": "https://apcm-midias-campanhas-202611.pages.dev/feed/cueca-box-poliamida-personalizada.jpg",
    "alt": "CUECA BOX POLIAMIDA PERSONALIZADA"
  },
  {
    "src": "https://apcm-midias-campanhas-202611.pages.dev/feed/cueca-zoom-confort.jpg",
    "alt": "CUECA ZOOM CONFORT"
  },
  {
    "src": "https://apcm-midias-campanhas-202611.pages.dev/feed/cueca-zoom-cotton.jpg",
    "alt": "CUECA ZOOM COTTON"
  },
  {
    "src": "https://apcm-midias-campanhas-202611.pages.dev/feed/cueca-box-adulto-cotton-personalizada.jpg",
    "alt": "CUECA BOX ADULTO COTTON PERSONALIZADA"
  },
  {
    "src": "https://apcm-midias-campanhas-202611.pages.dev/feed/cueca-box-infantil-confort.jpg",
    "alt": "CUECA BOX INFANTIL CONFORT"
  },
  {
    "src": "https://apcm-midias-campanhas-202611.pages.dev/feed/cueca-box-infantil-cotton-mescla.jpg",
    "alt": "CUECA BOX INFANTIL COTTON MESCLA"
  },
  {
    "src": "https://apcm-midias-campanhas-202611.pages.dev/feed/cueca-infantil-zoom.jpg",
    "alt": "CUECA INFANTIL ZOOM POLIÉSTER"
  }
]

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
      <ImageCarousel countryCode={countryCode} showCreatinaOffers={Date.now() < Date.parse("2026-12-01T00:00:00-03:00")} />
      <section aria-label="Maria Rica Lingerie" className="w-full">
        <a href={`/${countryCode}/categories/ecossistema-moda/moda-intima`}>
          <img src="/images/maria-rica-joao-rico-v5-modelos-whatsapp.png"
            alt="Maria Rica e João Rico. 10% de desconto, cartão em até 18x e frete grátis. WhatsApp (84) 9838-8771."
            width={2172} height={724} className="block h-auto w-full" />
        </a>
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
        

        <section className="mt-12" data-campaign-gallery="schalk-crosby-individuais" id="carrossel-basicas-e-moda-intima" aria-label="Camisetas básicas e moda íntima">
          <h3 className="text-xl md:text-2xl font-bold text-[#0A192F]">Camisetas básicas e moda íntima</h3>
          <p className="mt-2 mb-5 text-sm text-gray-600">Monte seu trio de básicas por R$ 149,90. Deslize para ver também a seleção Maria Rica e João Rico.</p>
          <AutoScrollGallery>
            <a href={"/" + countryCode + "/products/moda-masculina-camiseta-basica"} className="block shrink-0 snap-start w-[82%] sm:w-[45%] lg:w-[31%] rounded-xl overflow-hidden border border-gray-100 bg-white"><img src="/images/campanha-schalk-crosby-20261024/01-basica-vinho-feed.jpg" alt="Básica vinho — 3 camisetas básicas por R$ 149,90" width={1080} height={1350} loading="lazy" decoding="async" className="block w-full h-auto object-contain" /></a>
            <a href={"/" + countryCode + "/products/moda-masculina-camiseta-basica"} className="block shrink-0 snap-start w-[82%] sm:w-[45%] lg:w-[31%] rounded-xl overflow-hidden border border-gray-100 bg-white"><img src="/images/campanha-schalk-crosby-20261024/02-basica-branca-feed.jpg" alt="Básica branca — 3 camisetas básicas por R$ 149,90" width={1080} height={1350} loading="lazy" decoding="async" className="block w-full h-auto object-contain" /></a>
            <a href={"/" + countryCode + "/products/moda-feminina-camiseta-basica"} className="block shrink-0 snap-start w-[82%] sm:w-[45%] lg:w-[31%] rounded-xl overflow-hidden border border-gray-100 bg-white"><img src="/images/campanha-schalk-crosby-20261024/03-basica-amarela-feminina-feed.jpg" alt="Básica amarela feminina — 3 camisetas básicas por R$ 149,90" width={1080} height={1350} loading="lazy" decoding="async" className="block w-full h-auto object-contain" /></a>
            <a href={"/" + countryCode + "/products/meta-camiseta-basica-crosby-masculina-preto"} className="block shrink-0 snap-start w-[82%] sm:w-[45%] lg:w-[31%] rounded-xl overflow-hidden border border-gray-100 bg-white"><img src="/images/campanha-schalk-crosby-8990-20261026/04-crosby-preta-feed.jpg" alt="Crosby preta — 3 camisetas básicas por R$ 149,90" width={1080} height={1350} loading="lazy" decoding="async" className="block w-full h-auto object-contain" /></a>
            <a href={"/" + countryCode + "/products/moda-feminina-camiseta-basica"} className="block shrink-0 snap-start w-[82%] sm:w-[45%] lg:w-[31%] rounded-xl overflow-hidden border border-gray-100 bg-white"><img src="/images/campanha-schalk-crosby-8990-20261026/05-crosby-feminina-coral-feed.jpg" alt="Crosby feminina coral — 3 camisetas básicas por R$ 149,90" width={1080} height={1350} loading="lazy" decoding="async" className="block w-full h-auto object-contain" /></a>
            {mariaRicaPhotos.map(({ src, alt }) => (
              <a
                key={src}
                href={`/${countryCode}/categories/ecossistema-moda/moda-intima`}
                className="block shrink-0 snap-start w-[82%] sm:w-[45%] lg:w-[31%] self-start overflow-hidden rounded-xl border border-gray-100 bg-white"
              >
                <img
                  src={src}
                  alt={alt}
                  width={1080}
                  height={1350}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full object-contain"
                />
              </a>
            ))}
          </AutoScrollGallery>
        </section>
      </div>

      <Hero />
    </>
  )
}
