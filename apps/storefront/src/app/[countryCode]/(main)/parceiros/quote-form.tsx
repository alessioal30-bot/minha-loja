"use client"

import { useRef, useState, type FormEvent } from "react"

type Line = { name: string; wholesale: boolean }

const fieldClass = "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900"

export default function QuoteForm({ lines, wholesaleLine }: { lines: Line[]; wholesaleLine?: string }) {
  const [wholesale, setWholesale] = useState(Boolean(wholesaleLine))
  const [line, setLine] = useState(wholesaleLine ?? "")
  const nextRow = useRef(1)
  const [rows, setRows] = useState([0])
  const lastRequest = useRef<{ body: string; id: string } | null>(null)
  const sending = useRef(false)
  const [result, setResult] = useState("")
  const [pending, setPending] = useState(false)
  const [completed, setCompleted] = useState(false)
  const availableLines = lines.filter((item) => !wholesale || item.wholesale)

  function changeMode(value: boolean) {
    setWholesale(value)
    if (value && !lines.some((item) => item.name === line && item.wholesale)) setLine("")
  }

  async function submitQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const read = (name: string) => String(data.get(name) ?? "").trim()
    if (wholesale) {
      if (sending.current || completed) return
      const items = rows.map((row) => ({
        product: [line, read("product-" + row)].join(" · "),
        quantity: Number(read("quantity-" + row)),
      }))
      const fields = { customer: read("customer"), city: read("city"), contact: read("contact"), documentType: read("documentType"), items }
      const body = JSON.stringify(fields)
      sending.current = true
      setPending(true)
      setResult("")
      try {
        if (lastRequest.current?.body !== body) lastRequest.current = { body, id: crypto.randomUUID() }
        const response = await fetch("/api/wholesale-quotes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...fields, id: lastRequest.current.id }),
        })
        if (!response.ok) throw new Error("Quote submission failed")
        const receipt = await response.json()
        setResult("Cotação recebida. Protocolo " + receipt.id + ".")
        setCompleted(true)
      } catch {
        setResult("Não foi possível confirmar o envio. Tente novamente.")
      } finally {
        sending.current = false
        setPending(false)
      }
      return
    }
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
      <p className="mt-2 text-slate-700">{wholesale ? "Monte sua cotação de atacado. A AM retorna pelo contato informado." : "Preencha o pedido e revise a mensagem no WhatsApp antes de enviar."}</p>
      <form onSubmit={submitQuote} className="mt-5 space-y-4">
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
          {wholesale ? (
            <fieldset className="space-y-3 sm:col-span-2">
              <legend className="font-semibold">Itens da cotação</legend>
              {rows.map((row, index) => (
                <div key={row} className="flex flex-wrap items-end gap-3">
                  <label className="min-w-48 flex-1">Produto {index + 1} (inclua cor ou tamanho)
                    <input className={fieldClass} name={"product-" + row} required maxLength={140} />
                  </label>
                  <label>Quantidade
                    <input className={fieldClass} name={"quantity-" + row} type="number" min={1} max={9999} defaultValue={1} required />
                  </label>
                  <span>Sob cotação</span>
                  {rows.length > 1 && <button type="button" onClick={() => setRows(rows.filter((item) => item !== row))}>Remover item {index + 1}</button>}
                </div>
              ))}
              <button type="button" className="underline" disabled={rows.length >= 30} onClick={() => setRows([...rows, nextRow.current++])}>Adicionar produto</button>
              <label className="block">E-mail ou telefone para retorno
                <input className={fieldClass} name="contact" maxLength={160} required />
              </label>
            </fieldset>
          ) : (
            <>
              <label className="block sm:col-span-2">Produtos e quantidades
                <textarea className={fieldClass} name="products" rows={3} maxLength={600} required />
              </label>
              <label className="block">Tamanhos e cores (opcional)
                <input className={fieldClass} name="options" maxLength={150} />
              </label>
            </>
          )}
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
        <button type="submit" disabled={wholesale && (pending || completed)} className="min-h-11 rounded-lg bg-[#123b65] px-5 py-2 font-semibold text-white hover:bg-[#1c507f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">{wholesale ? pending ? "Enviando…" : "Enviar cotação" : "Continuar no WhatsApp"}</button>
        <p role="status">{result}</p>
      </form>
    </section>
  )
}
