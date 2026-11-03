"use client"

import { useState, type FormEvent } from "react"

type Line = { name: string; wholesale: boolean }

const fieldClass = "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900"

export default function QuoteForm({ lines, wholesaleLine }: { lines: Line[]; wholesaleLine?: string }) {
  const [wholesale, setWholesale] = useState(Boolean(wholesaleLine))
  const [line, setLine] = useState(wholesaleLine ?? "")
  const availableLines = lines.filter((item) => !wholesale || item.wholesale)

  function changeMode(value: boolean) {
    setWholesale(value)
    if (value && !lines.some((item) => item.name === line && item.wholesale)) setLine("")
  }

  function continueToWhatsApp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const read = (name: string) => String(data.get(name) ?? "").trim()
    if (!read("customer") || !read("products") || !read("city") || !availableLines.some((item) => item.name === line)) return
    const message = [
      wholesale ? "Olá! Gostaria de uma cotação no atacado." : "Olá! Gostaria de consultar uma compra para mim.",
      "Nome ou empresa: " + read("customer"),
      "Linha: " + line,
      "Produtos e quantidades: " + read("products"),
      read("options") && "Tamanhos e cores: " + read("options"),
      "Cidade/UF de entrega: " + read("city"),
      wholesale && "Tipo de documento: " + read("documentType"),
    ].filter(Boolean).join("\n")
    window.location.assign("https://wa.me/558496130844?text=" + encodeURIComponent(message))
  }

  return (
    <section id="ficha-cotacao" aria-labelledby="ficha-titulo" className="mt-8 scroll-mt-24 rounded-xl border border-[#b9d8f4] bg-[#eff7ff] p-5 sm:p-6">
      <h2 id="ficha-titulo" className="text-2xl font-bold text-slate-900">Ficha de compra e cotação</h2>
      <p className="mt-2 text-slate-700">Preencha o pedido e revise a mensagem no WhatsApp antes de enviar.</p>
      <form onSubmit={continueToWhatsApp} className="mt-5 space-y-4">
        <fieldset>
          <legend className="font-semibold">Como você quer comprar?</legend>
          <div className="mt-2 flex flex-wrap gap-x-6 gap-y-3">
            <label className="flex items-center gap-2">
              <input type="radio" name="purchaseMode" checked={!wholesale} onChange={() => changeMode(false)} />
              Comprar para mim
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="purchaseMode" checked={wholesale} onChange={() => changeMode(true)} />
              Comprar em quantidade ou para revenda
            </label>
          </div>
        </fieldset>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">Nome ou empresa
            <input className={fieldClass} name="customer" maxLength={100} required />
          </label>
          <label className="block">Linha de interesse
            <select className={fieldClass} name="line" value={line} onChange={(event) => setLine(event.target.value)} required>
              <option value="">Selecione uma linha</option>
              {availableLines.map((item) => <option key={item.name}>{item.name}</option>)}
            </select>
          </label>
          <label className="block sm:col-span-2">Produtos e quantidades
            <textarea className={fieldClass} name="products" rows={3} maxLength={600} required />
          </label>
          <label className="block">Tamanhos e cores (opcional)
            <input className={fieldClass} name="options" maxLength={150} />
          </label>
          <label className="block">Cidade e estado de entrega
            <input className={fieldClass} name="city" placeholder="Ex.: Caicó/RN" maxLength={100} required />
          </label>
          {wholesale && (
            <label className="block">Compra com CPF ou CNPJ
              <select className={fieldClass} name="documentType" defaultValue="" required>
                <option value="">Selecione o tipo de documento</option>
                <option>CPF</option>
                <option>CNPJ</option>
              </select>
            </label>
          )}
        </div>
        <button type="submit" className="min-h-11 rounded-lg bg-[#123b65] px-5 py-2 font-semibold text-white hover:bg-[#1c507f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Continuar no WhatsApp</button>
      </form>
    </section>
  )
}
