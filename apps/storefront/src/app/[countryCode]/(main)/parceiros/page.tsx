import LocalizedClientLink from "@modules/common/components/localized-client-link"

const lines = [
  { name: "Schalk", href: "/products/moda-masculina-camiseta-basica", wholesale: true },
  { name: "Crosby", href: "/products/meta-camiseta-basica-crosby-masculina-preto", wholesale: true },
  { name: "Suplementos", href: "/categories/nutricao-alimentar", wholesale: true },
  { name: "Mary Kay", href: "/products/base-mary-kay-timewise-3d-matte", wholesale: false },
]

export const metadata = { title: "Marcas e parceiros | AM" }

export default function PartnersPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-4xl font-bold">Marcas e parceiros</h1>
      <p className="mt-3">Compre para uso próprio ou consulte as opções para sua empresa.</p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {lines.map(({ name, href, wholesale }) => (
          <section key={name} className="rounded-xl border p-6">
            <h2 className="text-xl font-semibold">{name}</h2>
            <p className="mt-2">
              {wholesale ? "Vendas pela AM para consumidores e empresas." : "Parceria para consumidores. Pedidos e entregas pela AM."}
            </p>
            <div className="mt-4 flex flex-wrap gap-4">
              <LocalizedClientLink className="underline" href={href}>
                {name === "Suplementos" ? "Ver suplementos" : "Ver produto em destaque"}
              </LocalizedClientLink>
              {wholesale && (
                <a className="underline" href={`https://wa.me/558496130844?text=${encodeURIComponent(`Olá, gostaria de um orçamento para empresa de ${name}.`)}`}>
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
