import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function Footer() {
  return (
    <footer className="border-t border-ui-border-base w-full bg-slate-900 text-white">
      <div className="content-container flex flex-col w-full py-10">
        <div className="flex flex-col gap-y-6 xsmall:flex-row items-center justify-between">
          <LocalizedClientLink
            href="/"
            className="flex items-center gap-x-3 txt-compact-xlarge-plus uppercase font-bold text-white"
          >
            <img src="/logo.png" alt="AM Logo" className="h-8 w-auto object-contain bg-white/10 p-1 rounded" />
            <span>AM Suplementos e Vestuário</span>
          </LocalizedClientLink>

          <div className="flex items-center gap-x-8 text-small-regular text-slate-300">
            <LocalizedClientLink href="/store" className="hover:text-amber-400 transition">
              Produtos
            </LocalizedClientLink>
            <LocalizedClientLink href="/account" className="hover:text-amber-400 transition">
              Contato
            </LocalizedClientLink>
            <LocalizedClientLink href="/privacy-policy" className="hover:text-amber-400 transition">
              Políticas
            </LocalizedClientLink>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 pt-8 border-t border-slate-700 text-sm text-slate-300">
          <section aria-labelledby="footer-support">
            <h2 id="footer-support" className="font-bold text-white mb-4">SUPORTE</h2>
            <ul className="space-y-3">
              {["Atendimento ao Cliente", "Formas de Pagamento", "Perguntas Frequentes", "Termos e Condições de Uso"].map((label) => (
                <li key={label}><a className="hover:text-amber-400 transition" href={`https://wa.me/558498388771?text=${encodeURIComponent(`Olá! Gostaria de informações sobre: ${label}.`)}`} target="_blank" rel="noopener noreferrer">{label}</a></li>
              ))}
              <li><LocalizedClientLink href="/privacy-policy" className="hover:text-amber-400 transition">Política de Privacidade</LocalizedClientLink></li>
            </ul>
          </section>
          <section aria-labelledby="footer-services">
            <h2 id="footer-services" className="font-bold text-white mb-4">SERVIÇOS</h2>
            <ul className="space-y-3">
              <li><LocalizedClientLink href="/store" className="hover:text-amber-400 transition">Produtos</LocalizedClientLink></li>
              {["Trocas e Devoluções", "Promoções", "Guia de Medidas"].map((label) => (
                <li key={label}><a className="hover:text-amber-400 transition" href={`https://wa.me/558498388771?text=${encodeURIComponent(`Olá! Gostaria de informações sobre: ${label}.`)}`} target="_blank" rel="noopener noreferrer">{label}</a></li>
              ))}
              <li><LocalizedClientLink href="/account" className="hover:text-amber-400 transition">Minha Conta</LocalizedClientLink></li>
            </ul>
          </section>
          <section aria-labelledby="footer-about">
            <h2 id="footer-about" className="font-bold text-white mb-4">SOBRE A AM</h2>
            <p className="mb-3">AM Suplementos e Vestuário</p>
            <p className="mb-3">APCM COMERCIO E SERVICO LTDA</p>
            <p>CNPJ: 57.266.092/0001-73</p>
          </section>
          <section aria-labelledby="footer-social">
            <h2 id="footer-social" className="font-bold text-white mb-4">FIQUE POR DENTRO</h2>
            <p className="mb-3">Acompanhe as novidades da AM no Instagram.</p>
            <a href="https://www.instagram.com/alessiomsuplementos/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition">@alessiomsuplementos</a>
            <p className="mt-4 text-xs leading-5">Para informações sobre pagamentos, termos de uso, trocas, promoções e medidas, fale com nosso atendimento pelo WhatsApp.</p>
          </section>
        </div>
        <section className="mt-8 pt-6 border-t border-slate-700" aria-labelledby="footer-sponsors">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h2 id="footer-sponsors" className="text-white font-bold">PATROCINADORES</h2>
            <p className="text-xs text-slate-300">NOSSOS PARCEIROS</p>
          </div>
          <input id="am-sponsor-pause" type="checkbox" className="am-sponsor-toggle mr-2 accent-amber-400" />
          <label htmlFor="am-sponsor-pause" className="text-xs text-slate-300 cursor-pointer">Pausar animação</label>
          <div className="am-sponsor-viewport mt-4 overflow-x-auto rounded" tabIndex={0} aria-label="Carrossel com 30 espaços disponíveis para patrocinadores">
            <div className="am-sponsor-track flex w-max">
              {[0, 1].map((copy) => (
                <div key={copy} className="flex gap-4 pr-4" role={copy === 0 ? "list" : undefined} aria-hidden={copy === 1 ? true : undefined}>
                  {Array.from({ length: 30 }, (_, index) => { const sponsors = [{ src: "/images/patrocinadores/schalk-jucurutu.jpg", alt: "Schalk Jucurutu" }, { src: "/images/patrocinadores/crosby.jpg", alt: "Crosby" }, { src: "/images/patrocinadores/am-logo.png", alt: "AM" }, { src: "/images/patrocinadores/mary-kay.jpg", alt: "Mary Kay" }, { src: "/images/patrocinadores/portal-do-vale.jpg", alt: "Portal do Vale" }, { src: "/images/patrocinadores/par-perfeito.jpg", alt: "Par Perfeito Calcados" }, { src: "/images/patrocinadores/mapada-mina.jpg", alt: "Mapada Mina Restaurante" }]; const sponsor = sponsors[index]; return sponsor ? (<div key={index} role="listitem" className="flex items-center justify-center w-44 h-24 shrink-0 rounded border border-slate-600 bg-white p-2 overflow-hidden"><img src={sponsor.src} alt={sponsor.alt} className="w-full h-full object-contain" /></div>) : (<div key={index} role="listitem" className="flex flex-col items-center justify-center gap-2 w-44 h-24 shrink-0 rounded border border-dashed border-slate-600 bg-slate-800/50 text-slate-300"><span className="text-xs text-slate-400">{String(index + 1).padStart(2, "0")}</span><span className="text-sm">Espaço disponível</span></div>) })}
                </div>
              ))}
            </div>
          </div>
          <style>{`
            @keyframes am-sponsor-slide {
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            }
            .am-sponsor-track { animation: am-sponsor-slide 180s linear infinite; }
            .am-sponsor-viewport:hover .am-sponsor-track,
            .am-sponsor-viewport:focus-within .am-sponsor-track,
            .am-sponsor-toggle:checked ~ .am-sponsor-viewport .am-sponsor-track { animation-play-state: paused; }
          `}</style>
        </section>
        <div className="mt-8 pt-6 border-t border-slate-700 text-sm text-slate-300 leading-6">
          <p>APCM COMERCIO E SERVICO LTDA — CNPJ: 57.266.092/0001-73</p>
          <p>Rua Joaquim Felix – Jucurutu/RN – CEP 59330-000</p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-x-6 gap-y-1 mt-2">
            <a href="https://wa.me/558498388771" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition">WhatsApp: +55 84 9838-8771</a>
            <a href="mailto:apcm@apcmcomercioesrvltda.com.br" className="break-all hover:text-amber-400 transition">apcm@apcmcomercioesrvltda.com.br</a>
          </div>
          <p className="mt-6 text-xs">© {new Date().getFullYear()} APCM COMERCIO E SERVICO LTDA. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

