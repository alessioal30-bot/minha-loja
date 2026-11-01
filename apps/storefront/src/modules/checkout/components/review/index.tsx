"use client"

import { Heading, Text, clx } from "@modules/common/components/ui"
import PaymentButton from "../payment-button"
import { useSearchParams } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import { useState } from "react"

const MP_PROVIDER = "pp_mercadopago_mercadopago"

const Review = ({ cart }: { cart: HttpTypes.StoreCart }) => {
  const searchParams = useSearchParams()
  const [copied, setCopied] = useState(false)

  const isOpen = searchParams.get("step") === "review"

  const paidByGiftcard = !!(
    (cart as unknown as Record<string, unknown>)?.gift_cards &&
    ((cart as unknown as Record<string, unknown>)?.gift_cards as unknown[])?.length > 0 &&
    cart?.total === 0
  )

  const previousStepsCompleted =
    cart.shipping_address &&
    (cart.shipping_methods?.length ?? 0) > 0 &&
    (cart.payment_collection || paidByGiftcard)

  const pixSession = cart.payment_collection?.payment_sessions?.find(
    (session) =>
      session.provider_id === MP_PROVIDER &&
      session.data?.payment_method_id === "pix" &&
      (session.status === "pending" || session.status === "requires_more")
  )

  const pixData = (pixSession?.data || {}) as Record<string, unknown>
  const qrCode =
    typeof pixData.qr_code === "string" ? pixData.qr_code : ""
  const qrCodeBase64 =
    typeof pixData.qr_code_base64 === "string"
      ? pixData.qr_code_base64
      : ""
  const ticketUrl =
    typeof pixData.ticket_url === "string" ? pixData.ticket_url : ""

  const copyPix = async () => {
    if (!qrCode) return

    try {
      await navigator.clipboard.writeText(qrCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="bg-white">
      <div className="flex flex-row items-center justify-between mb-6">
        <Heading
          level="h2"
          className={clx(
            "flex flex-row text-3xl-regular gap-x-2 items-baseline",
            {
              "opacity-50 pointer-events-none select-none": !isOpen,
            }
          )}
        >
          Revisão
        </Heading>
      </div>

      {isOpen && previousStepsCompleted && (
        <>
          {cart.payment_collection?.payment_sessions?.some(session =>
            session.provider_id === MP_PROVIDER && session.data?.payment_method_id !== "pix" &&
            !["canceled", "error"].includes(session.status)
          ) && <Text className="mb-6">Cartão enviado ao Mercado Pago. A confirmação abaixo verifica o pagamento antes de finalizar o pedido.</Text>}
          {pixSession && (
            <div className="mb-8 rounded-lg border border-ui-border-base p-6">
              <Heading level="h3" className="mb-2">
                Pagamento via PIX
              </Heading>

              <Text className="mb-4 text-ui-fg-subtle">
                Aguardando pagamento
              </Text>

              {qrCodeBase64 && (
                <div className="mb-4 flex justify-center">
                  <img
                    src={`data:image/png;base64,${qrCodeBase64}`}
                    alt="QR Code PIX"
                    className="h-56 w-56 object-contain"
                  />
                </div>
              )}

              {qrCode && (
                <div className="mb-4">
                  <Text className="mb-2">
                    PIX copia e cola
                  </Text>

                  <div className="break-all rounded-md bg-ui-bg-subtle p-3 text-sm">
                    {qrCode}
                  </div>

                  <button
                    type="button"
                    onClick={copyPix}
                    className="mt-3 rounded-md border border-ui-border-base px-4 py-2"
                  >
                    {copied ? "Código PIX copiado!" : "Copiar código PIX"}
                  </button>
                </div>
              )}

              {ticketUrl && (
                <a
                  href={ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ui-fg-interactive underline"
                >
                  Abrir pagamento PIX
                </a>
              )}
            </div>
          )}

          <div className="flex items-start gap-x-1 w-full mb-6">
            <div className="w-full">
              <Text className="txt-medium-plus text-ui-fg-base mb-1">
                Ao clicar no botão abaixo, você confirma que revisou os dados
                do pedido e concorda com os termos e políticas da loja.
              </Text>
            </div>
          </div>

          <PaymentButton cart={cart} data-testid="submit-order-button" />
        </>
      )}
    </div>
  )
}

export default Review
