"use client"

import Script from "next/script"
import { useEffect, useId, useRef, useState } from "react"
import { HttpTypes } from "@medusajs/types"
import { initiatePaymentSession } from "@lib/data/cart"

type FormData = {
  token: string
  payment_method_id: string
  installments: number
  payer: { email: string; identification?: { type: string; number: string } }
}
type Brick = { unmount: () => Promise<void> }
type MercadoPagoSdk = {
  bricks: () => {
    create: (type: string, id: string, settings: Record<string, unknown>) => Promise<Brick>
  }
}

declare global {
  interface Window {
    MercadoPago?: new (key: string, options: { locale: string }) => MercadoPagoSdk
  }
}

export default function MercadoPagoCard({
  cart,
  onCompleted,
}: {
  cart: HttpTypes.StoreCart
  onCompleted: () => void
}) {
  const id = "mp-card-" + useId().replace(/[^a-zA-Z0-9_-]/g, "")
  const [ready, setReady] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const submitting = useRef(false)
  const callback = useRef(onCompleted)
  callback.current = onCompleted
  const key = process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY

  useEffect(() => {
    if (!ready || !key || !window.MercadoPago) return
    let disposed = false
    let controller: Brick | undefined
    const sdk = new window.MercadoPago(key, { locale: "pt-BR" })
    sdk.bricks().create("cardPayment", id, {
      initialization: { amount: Number(cart.total), payer: { email: cart.email } },
      customization: { paymentMethods: { minInstallments: 1, maxInstallments: 1 } },
      callbacks: {
        onReady: () => { if (!disposed) setError(null) },
        onError: () => { if (!disposed) setError("Não foi possível carregar o formulário. Atualize a página e tente novamente.") },
        onSubmit: async (form: FormData, extra: { paymentTypeId?: string }) => {
          if (disposed || submitting.current) return
          submitting.current = true
          setError(null)
          try {
            const paymentType = extra?.paymentTypeId
            if (paymentType !== "credit_card" && paymentType !== "debit_card") {
              throw new Error("Selecione um cartão de crédito ou débito.")
            }
            await initiatePaymentSession(cart, {
              provider_id: "pp_mercadopago_mercadopago",
              data: {
                token: form.token,
                payment_method_id: form.payment_method_id,
                payment_method_type: paymentType,
                installments: form.installments,
                payer_email: cart.email,
                payer_identification: form.payer.identification,
              },
            })
            if (!disposed) callback.current()
          } catch (err) {
            if (!disposed) setError(err instanceof Error ? err.message : "Pagamento não concluído. Tente novamente.")
            throw err
          } finally {
            submitting.current = false
          }
        },
      },
    }).then(async (brick) => {
      if (disposed) await brick.unmount()
      else controller = brick
    }).catch(() => { if (!disposed) setError("Não foi possível iniciar o formulário do Mercado Pago.") })
    return () => { disposed = true; void controller?.unmount() }
  }, [ready, key, id, cart.id, cart.total, cart.email])

  if (!key) return <p role="alert">Pagamento com cartão indisponível no momento.</p>

  return (
    <div className="my-4">
      <Script src="https://sdk.mercadopago.com/js/v2" strategy="afterInteractive"
        onReady={() => setReady(true)}
        onError={() => setError("Não foi possível conectar ao Mercado Pago. Tente novamente.")} />
      <p className="mb-3 text-sm">Cartão à vista. Confira o total antes de confirmar o pagamento.</p>
      <div id={id} />
      {error && <p role="alert" className="mt-3 text-red-600">{error}</p>}
    </div>
  )
}
