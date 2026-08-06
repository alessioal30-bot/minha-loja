import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export async function GET(req: MedusaRequest, res: MedusaResponse): Promise<void> {
  // Lógica do seu feed aqui...
  res.status(200).json({ success: true, message: "OK" });
}
