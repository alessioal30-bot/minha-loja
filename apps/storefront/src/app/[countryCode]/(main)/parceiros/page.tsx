import LocalizedClientLink from "@modules/common/components/localized-client-link"

const buttonClass = "inline-flex min-h-11 items-center rounded-lg border px-4 py-2 text-sm font-medium text-slate-900 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"

const lines = [
  { name: "Schalk", color: "bg-[#edf6ff] border-[#b9d8f4] hover:bg-[#dfedfc]", href: "/products/moda-masculina-camiseta-basica", wholesale: true },
  { name: "Crosby", color: "bg-[#fff3e8] border-[#efd2b8] hover:bg-[#ffe8d5]", href: "/products/meta-camiseta-basica-crosby-masculina-preto", wholesale: true },
  { name: "Suplementos", color: "bg-[#ebfaf2] border-[#b6e2cb] hover:bg-[#dcf3e6]", href: "/categories/nutricao-alimentar", wholesale: true },
  { name: "Mary Kay", color: "bg-[#fff0f5] border-[#edc4d5] hover:bg-[#fbe2ec]", href: "/products/base-mary-kay-timewise-3d-matte", wholesale: false },
]

export const metadata = { title: "Marcas e parceiros | AM" }

export default function PartnersPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-4xl font-bold">Marcas e parceiros</h1>
      <p className="mt-3">Compre para uso próprio ou consulte as opções para sua empresa.</p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {lines.map(({ name, href, wholesale, color }) => (
          <section key={name} className="rounded-xl border p-6">
            <h2 className="text-xl font-semibold">{name}</h2>
            <p className="mt-2">
              {wholesale ? "Vendas pela AM para consumidores e empresas." : "Parceria para consumidores. Pedidos e entregas pela AM."}
            </p>
            <div className="mt-4 flex flex-wrap gap-4">
              <LocalizedClientLink className={`${buttonClass} ${color}`} href={href}>
                {name === "Suplementos" ? "Ver suplementos" : "Ver produto em destaque"}
              </LocalizedClientLink>
              {wholesale && (
                <a className={`${buttonClass} bg-[#f5efff] border-[#dbc9f0] hover:bg-[#ede3fb]`} href={`https://wa.me/558496130844?text=${encodeURIComponent(`Olá, gostaria de um orçamento para empresa de ${name}.`)}`}>
                  Pedir orçamento para empresa
                </a>
              )}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
