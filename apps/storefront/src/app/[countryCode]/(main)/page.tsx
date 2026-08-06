import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Sua Loja | Azul Collection",
  description: "Explore nossa coleção exclusiva com elegância e sofisticação.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params

  const region = await getRegion(countryCode)
  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <section className="relative w-full h-[550px] flex items-center justify-start bg-[#0A192F] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/banner-dia-dos-pais.jpg" 
            alt="Especial" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 max-w-2xl px-6 md:px-16">
          <span className="text-[#BFDBFE] font-medium tracking-widest text-xs uppercase mb-3 block">
            Coleção Exclusiva
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Elegância em Tons de Azul
          </h1>
          <p className="text-base md:text-lg text-neutral-200 mb-8 leading-relaxed">
            Descubra peças selecionadas que unem sofisticação, conforto e um design atemporal.
          </p>
          <a 
            href={"/" + countryCode + "/store"} 
            className="inline-block bg-[#1D4ED8] text-white font-medium py-3 px-8 rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-lg"
          >
            Explorar Coleção
          </a>
        </div>
      </section>

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
        
        <div className="flex overflow-x-auto gap-x-6 pb-6 pt-2 no-scrollbar snap-x snap-mandatory">
          <div className="w-full">
            <ul className="flex gap-x-6">
              <FeaturedProducts collections={collections} region={region} />
            </ul>
          </div>
        </div>
      </div>

      <Hero />
    </>
  )
}