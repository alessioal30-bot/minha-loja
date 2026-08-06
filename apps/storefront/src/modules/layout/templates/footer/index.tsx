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
      </div>
    </footer>
  )
}