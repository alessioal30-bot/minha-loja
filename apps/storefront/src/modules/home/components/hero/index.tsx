import { Button, Heading } from "@medusajs/ui";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Principal */}
      <div className="relative h-[85vh] w-full border-b border-ui-border-base bg-neutral-950 flex items-center">
        <div className="absolute inset-0 bg-cover bg-center z-0 opacity-90" style={{ backgroundImage: "url('/banner-dia-dos-pais.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
        
        <div className="relative z-20 container mx-auto px-6 sm:px-12 flex flex-col justify-center items-start text-left text-white gap-6 max-w-4xl">
          <span className="text-xs uppercase tracking-[0.3em] bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/20">Especial Dia dos Pais</span>
          <Heading level="h1" className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight">Celebre os <span className="font-bold italic">Laços</span></Heading>
          <p className="text-base sm:text-lg max-w-xl text-neutral-300 font-light leading-relaxed">Presenteie quem sempre esteve ao seu lado com elegância, conforto e sofisticação incomparáveis.</p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a href="/store"><Button variant="secondary" size="large" className="bg-white text-black hover:bg-neutral-200 font-medium px-8 py-4 rounded-none">Explorar Coleção Dia dos Pais</Button></a>
          </div>
        </div>
      </div>

      {/* Seção das 4 Categorias em Destaque */}
      <section className="py-20 px-6 bg-neutral-900 text-white">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 mb-2 block">Portfólio & Soluções</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Nossas Áreas de Atuação</h2>
            </div>
            <a href="/store" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-neutral-300 hover:text-white mt-4 md:mt-0 transition-colors">Ver tudo <ArrowRight className="w-4 h-4" /></a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Categoria 1: Farmacêuticos */}
            <a href="/store/farmaceuticos" className="group relative h-[420px] overflow-hidden bg-neutral-800 flex items-end p-6">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-80" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800')" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />
              <div className="relative z-10">
                <span className="text-xs uppercase tracking-widest text-neutral-400">01 / Saúde</span>
                <h3 className="text-xl font-semibold mt-1 mb-2">Farmacêuticos</h3>
                <span className="inline-flex items-center text-xs uppercase tracking-widest font-medium gap-2 text-white group-hover:translate-x-1 transition-transform">Explorar <ArrowRight className="w-3.5 h-3.5" /></span>
              </div>
            </a>

            {/* Categoria 2: Cosméticos */}
            <a href="/store/cosmeticos" className="group relative h-[420px] overflow-hidden bg-neutral-800 flex items-end p-6">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-80" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800')" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />
              <div className="relative z-10">
                <span className="text-xs uppercase tracking-widest text-neutral-400">02 / Beleza</span>
                <h3 className="text-xl font-semibold mt-1 mb-2">Cosméticos</h3>
                <span className="inline-flex items-center text-xs uppercase tracking-widest font-medium gap-2 text-white group-hover:translate-x-1 transition-transform">Explorar <ArrowRight className="w-3.5 h-3.5" /></span>
              </div>
            </a>

            {/* Categoria 3: Nutrição Alimentar */}
            <a href="/store/nutricao" className="group relative h-[420px] overflow-hidden bg-neutral-800 flex items-end p-6">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-80" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=800')" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />
              <div className="relative z-10">
                <span className="text-xs uppercase tracking-widest text-neutral-400">03 / Bem-estar</span>
                <h3 className="text-xl font-semibold mt-1 mb-2">Nutrição Alimentar</h3>
                <span className="inline-flex items-center text-xs uppercase tracking-widest font-medium gap-2 text-white group-hover:translate-x-1 transition-transform">Explorar <ArrowRight className="w-3.5 h-3.5" /></span>
              </div>
            </a>

            {/* Categoria 4: Ecossistema Moda */}
            <a href="/store/moda" className="group relative h-[420px] overflow-hidden bg-neutral-800 flex items-end p-6">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-80" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800')" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />
              <div className="relative z-10">
                <span className="text-xs uppercase tracking-widest text-neutral-400">04 / Estilo</span>
                <h3 className="text-xl font-semibold mt-1 mb-2">Ecossistema Moda</h3>
                <span className="inline-flex items-center text-xs uppercase tracking-widest font-medium gap-2 text-white group-hover:translate-x-1 transition-transform">Explorar <ArrowRight className="w-3.5 h-3.5" /></span>
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
