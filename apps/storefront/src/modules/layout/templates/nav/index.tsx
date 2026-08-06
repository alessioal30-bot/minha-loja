import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import { ChevronDown } from "lucide-react"

export default async function Nav() {
  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 px-6 mx-auto border-b duration-200 bg-neutral-950 border-neutral-800 text-white">
        <nav className="content-container flex items-center justify-between w-full h-full text-sm">
          
          {/* Menu Lateral Mobile */}
          <div className="h-full flex items-center lg:hidden">
            <SideMenu />
          </div>

          {/* Logo / Nome da Loja */}
          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="text-lg font-bold uppercase tracking-widest hover:text-neutral-300 transition-colors"
              data-testid="nav-store-link"
            >
              Sua Loja
            </LocalizedClientLink>
          </div>

          {/* Menu Desktop com Dropdowns Organizados */}
          <div className="hidden lg:flex items-center h-full space-x-8">
            
            {/* 1. Farmacêuticos */}
            <div className="relative h-full flex items-center group/dropdown cursor-pointer">
              <span className="flex items-center gap-1 text-neutral-300 hover:text-white transition-colors py-2">
                Farmacêuticos <ChevronDown className="w-4 h-4 opacity-70" />
              </span>
              <div className="absolute top-full left-0 w-56 bg-neutral-900 border border-neutral-800 shadow-2xl opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-200 py-2">
                <div className="px-4 py-3 text-xs text-amber-400 font-medium tracking-wider uppercase bg-amber-500/10 border-b border-neutral-800">
                  ⚠️ Em Construção
                </div>
                <span className="block px-4 py-2.5 text-sm text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors cursor-not-allowed">
                  Manipulação (Em Breve)
                </span>
                <span className="block px-4 py-2.5 text-sm text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors cursor-not-allowed">
                  Fitoterápicos (Em Breve)
                </span>
              </div>
            </div>

            {/* 2. Cosméticos */}
            <div className="relative h-full flex items-center group/dropdown cursor-pointer">
              <span className="flex items-center gap-1 text-neutral-300 hover:text-white transition-colors py-2">
                Cosméticos <ChevronDown className="w-4 h-4 opacity-70" />
              </span>
              <div className="absolute top-full left-0 w-56 bg-neutral-900 border border-neutral-800 shadow-2xl opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-200 py-2">
                <LocalizedClientLink href="/store?category=skincare" className="block px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors">
                  Skincare & Rosto
                </LocalizedClientLink>
                <LocalizedClientLink href="/store?category=cabelos" className="block px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors">
                  Cuidados para Cabelos
                </LocalizedClientLink>
                <LocalizedClientLink href="/store?category=corpo" className="block px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors">
                  Corpo & Banho
                </LocalizedClientLink>
              </div>
            </div>

            {/* 3. Nutrição Alimentar */}
            <div className="relative h-full flex items-center group/dropdown cursor-pointer">
              <span className="flex items-center gap-1 text-neutral-300 hover:text-white transition-colors py-2">
                Nutrição Alimentar <ChevronDown className="w-4 h-4 opacity-70" />
              </span>
              <div className="absolute top-full left-0 w-56 bg-neutral-900 border border-neutral-800 shadow-2xl opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-200 py-2">
                <LocalizedClientLink href="/store?category=suplementos" className="block px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors">
                  Suplementos & Vitaminas
                </LocalizedClientLink>
                <LocalizedClientLink href="/store?category=funcionais" className="block px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors">
                  Alimentos Funcionais
                </LocalizedClientLink>
                <LocalizedClientLink href="/store?category=organicos" className="block px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors">
                  Orgânicos & Naturais
                </LocalizedClientLink>
              </div>
            </div>

            {/* 4. Ecossistema Moda */}
            <div className="relative h-full flex items-center group/dropdown cursor-pointer">
              <span className="flex items-center gap-1 text-neutral-300 hover:text-white transition-colors py-2">
                Ecossistema Moda <ChevronDown className="w-4 h-4 opacity-70" />
              </span>
              <div className="absolute top-full left-0 w-56 bg-neutral-900 border border-neutral-800 shadow-2xl opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-200 py-2">
                <LocalizedClientLink href="/store?category=alfaiataria" className="block px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors">
                  Alfaiataria
                </LocalizedClientLink>
                <LocalizedClientLink href="/store?category=camisaria" className="block px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors">
                  Camisaria Fina
                </LocalizedClientLink>
                <LocalizedClientLink href="/store?category=acessorios" className="block px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors">
                  Acessórios & Sapatos
                </LocalizedClientLink>
              </div>
            </div>

          </div>

          {/* Ações da Direita */}
          <div className="flex items-center gap-x-6 h-full">
            <div className="hidden sm:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className="hover:text-neutral-300 transition-colors"
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

