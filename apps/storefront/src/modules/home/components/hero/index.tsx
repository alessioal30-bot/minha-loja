import { ArrowRight } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="flex flex-col">
      {/* Oferta Mary Kay */}
      <section className="bg-white px-6 py-12 md:px-8" aria-label="Oferta Mary Kay TimeWise 3D">
        <img
          src="/images/mary-kay-timewise-3d-oferta.webp" loading="lazy" decoding="async"
          alt="Sua base favorita está aqui: Mary Kay TimeWise 3D, 30 variantes disponíveis, R$ 84,90 cada. Atendimento pelo WhatsApp +55 84 99989-3205."
          width={1122}
          height={1402}
          className="block w-full max-w-2xl h-auto mx-auto"
        />
      </section>
      {/* Seção das 4 Categorias em Destaque */}
      <section className="py-20 px-6 bg-neutral-900 text-white">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 mb-2 block">
                Portfólio & Soluções
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Nossas Áreas de Atuação
              </h2>
            </div>

            <LocalizedClientLink
              href="/store"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-neutral-300 hover:text-white mt-4 md:mt-0 transition-colors"
            >
              Ver tudo <ArrowRight className="w-4 h-4" />
            </LocalizedClientLink>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Categoria 1 */}
            <LocalizedClientLink
              href="/categories/farmaceuticos"
              className="group relative h-[420px] overflow-hidden bg-neutral-800 flex items-end p-6"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-80"
                style={{
                  backgroundImage:
                    "url('/images/farmaceuticos-luvas-mascaras.webp')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />

              <div className="relative z-10">
                <span className="text-xs uppercase tracking-widest text-neutral-400">
                  01 / Saúde
                </span>
                <h3 className="text-xl font-semibold mt-1 mb-2">
                  Farmacêuticos
                </h3>
                <span className="inline-flex items-center text-xs uppercase tracking-widest font-medium gap-2 text-white group-hover:translate-x-1 transition-transform">
                  Explorar <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </LocalizedClientLink>

            {/* Categoria 2 */}
            <LocalizedClientLink
              href="/categories/cosmeticos"
              className="group relative h-[420px] overflow-hidden bg-neutral-800 flex items-end p-6"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-80"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />

              <div className="relative z-10">
                <span className="text-xs uppercase tracking-widest text-neutral-400">
                  02 / Beleza
                </span>
                <h3 className="text-xl font-semibold mt-1 mb-2">
                  Cosméticos
                </h3>
                <span className="inline-flex items-center text-xs uppercase tracking-widest font-medium gap-2 text-white group-hover:translate-x-1 transition-transform">
                  Explorar <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </LocalizedClientLink>

            {/* Categoria 3 */}
            <LocalizedClientLink
              href="/categories/nutricao-alimentar"
              className="group relative h-[420px] overflow-hidden bg-neutral-800 flex items-end p-6"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-80"
                style={{
                  backgroundImage:
                    "url('/images/nutricao-comida-suplementos-vitaminas.webp')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />

              <div className="relative z-10">
                <span className="text-xs uppercase tracking-widest text-neutral-400">
                  03 / Bem-estar
                </span>
                <h3 className="text-xl font-semibold mt-1 mb-2">
                  Nutrição Alimentar
                </h3>
                <span className="inline-flex items-center text-xs uppercase tracking-widest font-medium gap-2 text-white group-hover:translate-x-1 transition-transform">
                  Explorar <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </LocalizedClientLink>

            {/* Categoria 4 */}
            <LocalizedClientLink
              href="/categories/ecossistema-moda"
              className="group relative h-[420px] overflow-hidden bg-neutral-800 flex items-end p-6"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-80"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />

              <div className="relative z-10">
                <span className="text-xs uppercase tracking-widest text-neutral-400">
                  04 / Estilo
                </span>
                <h3 className="text-xl font-semibold mt-1 mb-2">
                  Ecossistema Moda
                </h3>
                <span className="inline-flex items-center text-xs uppercase tracking-widest font-medium gap-2 text-white group-hover:translate-x-1 transition-transform">
                  Explorar <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </LocalizedClientLink>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero
