export default function NovembroAzul() {
  return (
    <section id="novembro-azul" aria-labelledby="novembro-azul-title" className="relative overflow-hidden text-white" style={{ background: "radial-gradient(ellipse at 85% 20%, #1756a0 0%, #0b2d59 45%, #071b35 100%)" }}>
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-10 px-6 py-14 md:flex-row md:justify-between md:px-8 md:py-20">
        <div className="max-w-2xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-blue-200">AM apoia o cuidado com a saúde do homem</p>
          <h1 id="novembro-azul-title" className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">Novembro <span className="text-sky-300">Azul</span></h1>
          <p className="mt-6 text-2xl font-semibold leading-snug sm:text-3xl">Quem se cuida valoriza a vida.</p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-blue-100 sm:text-lg">Informação, acolhimento e cuidado com a saúde do homem. Converse com um profissional de saúde e tire suas dúvidas.</p>
          <a href="https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-do-homem" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex rounded-full border border-blue-200/50 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Saiba mais sobre a saúde do homem ↗</a>
          <p className="mt-5 text-sm text-blue-200">Um convite ao cuidado, todos os dias.</p>
        </div>
        <div className="w-full max-w-[290px] shrink-0 overflow-hidden rounded-3xl bg-white p-3 shadow-2xl md:max-w-[340px]">
          <img src="/images/novembro-azul-20261102/logo-am-laco-branco.png" alt="Logotipo AM com laço azul de conscientização ao lado, sobre fundo branco" width={1254} height={1254} loading="eager" decoding="async" className="block h-auto w-full" />
        </div>
      </div>
    </section>
  )
}
