import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import { ChevronDown } from "lucide-react"

const menuItemClass =
  "block px-4 py-2 text-sm text-black hover:bg-gray-100 hover:text-black transition-colors"

export default async function Nav() {
  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 px-6 mx-auto border-b duration-200 bg-white border-gray-200 text-black">
        <nav className="content-container flex items-center justify-between w-full h-full text-sm">

          <div className="h-full flex items-center lg:hidden">
            <SideMenu />
          </div>

          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="text-black text-lg font-bold uppercase tracking-widest hover:text-black transition-colors"
              data-testid="nav-store-link"
            >
              <img src="/logo.webp" alt="AM Suplementos e Vestuário" width={48} height={48} className="h-12 w-12 object-contain" />
            </LocalizedClientLink>
          </div>

          <div className="hidden lg:flex items-center h-full space-x-8">

            {/* Farmacêuticos */}
            <div className="relative h-full flex items-center group/dropdown cursor-pointer">
              <span className="flex items-center gap-1 text-black hover:text-black transition-colors py-2">
                Farmacêuticos
                <ChevronDown className="w-4 h-4 opacity-70" />
              </span>

              <div className="absolute top-full left-0 w-64 bg-white border border-gray-200 shadow-2xl opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-200 py-2">
                <div className="px-4 py-3 text-xs text-amber-900 font-medium tracking-wider uppercase bg-amber-50 border-b border-gray-200">
                  Em manutenção
                </div>

                <LocalizedClientLink href="/categories/farmaceuticos/medicamentos" className={menuItemClass}>
                  Medicamentos
                </LocalizedClientLink>
                <LocalizedClientLink href="/categories/farmaceuticos/suprimentos" className={menuItemClass}>
                  Suprimentos
                </LocalizedClientLink>
                <LocalizedClientLink href="/categories/farmaceuticos/primeiros-socorros" className={menuItemClass}>
                  Primeiros Socorros
                </LocalizedClientLink>
              </div>
            </div>

            {/* Cosméticos */}
            <div className="relative h-full flex items-center group/dropdown cursor-pointer">
              <span className="flex items-center gap-1 text-black hover:text-black transition-colors py-2">
                Cosméticos
                <ChevronDown className="w-4 h-4 opacity-70" />
              </span>

              <div className="absolute top-full left-0 w-64 bg-white border border-gray-200 shadow-2xl opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-200 py-2">
                <LocalizedClientLink href="/categories/cosmeticos/cosmeticos-rosto" className={menuItemClass}>
                  Rosto
                </LocalizedClientLink>
                <LocalizedClientLink href="/categories/cosmeticos/cosmeticos-corpo" className={menuItemClass}>
                  Corpo
                </LocalizedClientLink>
                <LocalizedClientLink href="/categories/cosmeticos/cuidados-capilares" className={menuItemClass}>
                  Cabelos
                </LocalizedClientLink>
              </div>
            </div>

            {/* Nutrição Alimentar */}
            <div className="relative h-full flex items-center group/dropdown cursor-pointer">
              <span className="flex items-center gap-1 text-black hover:text-black transition-colors py-2">
                Nutrição Alimentar
                <ChevronDown className="w-4 h-4 opacity-70" />
              </span>

              <div className="absolute top-full left-0 w-80 bg-white border border-gray-200 shadow-2xl opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-200 py-2">
                <LocalizedClientLink href="/categories/nutricao-alimentar/whey-protein" className={menuItemClass}>
                  Suplementos
                </LocalizedClientLink>
                <LocalizedClientLink href="/categories/nutricao-alimentar/alimentos-funcionais" className={menuItemClass}>
                  Alimentos Funcionais
                </LocalizedClientLink>
                <LocalizedClientLink href="/categories/nutricao-alimentar/alimentos-in-natura" className={menuItemClass}>
                  Alimentos in natura
                </LocalizedClientLink>
                <LocalizedClientLink href="/categories/nutricao-alimentar/alimentos-processados-e-ultraprocessados" className={menuItemClass}>
                  Alimentos Processados e Ultraprocessados
                </LocalizedClientLink>
              </div>
            </div>

            {/* Ecossistema Moda */}
            <div className="relative h-full flex items-center group/dropdown cursor-pointer">
              <span className="flex items-center gap-1 text-black hover:text-black transition-colors py-2">
                Ecossistema Moda
                <ChevronDown className="w-4 h-4 opacity-70" />
              </span>

              <div className="absolute top-full left-0 w-64 bg-white border border-gray-200 shadow-2xl opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-200 py-2">
                <LocalizedClientLink href="/categories/ecossistema-moda/masculino" className={menuItemClass}>
                  Moda masculina
                </LocalizedClientLink>
                <LocalizedClientLink href="/categories/ecossistema-moda/feminino" className={menuItemClass}>
                  Moda feminina
                </LocalizedClientLink>
              </div>
            </div>

            <LocalizedClientLink href="/parceiros" className="hover:text-black transition-colors">Orçamento p/ empresa</LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-6 h-full">
            <div className="hidden sm:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className="hover:text-black transition-colors"
                href="/account"
                data-testid="nav-account-link"
              >
                Conta
              </LocalizedClientLink>
            </div>
            <CartButton />
          </div>

        </nav>
      </header>
    </div>
  )
}



