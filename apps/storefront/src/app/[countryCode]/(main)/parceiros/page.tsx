const lines = ["Schalk", "Crosby", "Suplementos"]

export const metadata = { title: "Orçamento para empresas (B2B) | AM" }

export default function BusinessQuotesPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-4xl font-bold">Orçamento para empresas (B2B)</h1>
      <p className="mt-3 max-w-3xl">Esta área atende empresas e revendedores. Os preços exibidos na loja são de varejo. Para cotar uma compra empresarial, escolha a linha e informe os produtos, as quantidades e a cidade de entrega pelo WhatsApp.</p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {lines.map((name) => (
          <section key={name} className="rounded-xl border p-6">
            <h2 className="text-xl font-semibold">{name}</h2>
            <a
              className="mt-4 inline-flex min-h-11 items-center rounded-lg border border-[#dbc9f0] bg-[#f5efff] px-4 py-2 text-sm font-medium text-slate-900 hover:bg-[#ede3fb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              href={`https://wa.me/558496130844?text=${encodeURIComponent(`Olá, gostaria de um orçamento B2B de ${name}.\nEmpresa:\nProdutos e quantidades:\nCidade de entrega:`)}`}
            >
              Pedir orçamento para empresa
            </a>
          </section>
        ))}
      </div>
    </main>
  )
}
