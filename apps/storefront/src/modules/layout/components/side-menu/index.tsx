'use client'

import { Popover, Transition } from "@headlessui/react"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import { Text, clx } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Fragment } from "react"

const SideMenuItems = {
  Inicio: "/",
  Loja: "/store",
  "Cotação p/ empresa ou Atacado": "/parceiros",
  "Minha Conta": "/account",
  Carrinho: "/cart",
}

const CategoryGroups = [{"name": "Farmacêuticos", "maintenance": true, "links": [{"href": "/categories/farmaceuticos/medicamentos", "name": "Medicamentos"}, {"href": "/categories/farmaceuticos/suprimentos", "name": "Suprimentos"}, {"href": "/categories/farmaceuticos/primeiros-socorros", "name": "Primeiros Socorros"}]}, {"name": "Cosméticos", "maintenance": false, "links": [{"href": "/categories/cosmeticos/cosmeticos-rosto", "name": "Rosto"}, {"href": "/categories/cosmeticos/cosmeticos-corpo", "name": "Corpo"}, {"href": "/categories/cosmeticos/cuidados-capilares", "name": "Cabelos"}]}, {"name": "Nutrição Alimentar", "maintenance": false, "links": [{"href": "/categories/nutricao-alimentar/whey-protein", "name": "Suplementos"}, {"href": "/categories/nutricao-alimentar/alimentos-funcionais", "name": "Alimentos Funcionais"}, {"href": "/categories/nutricao-alimentar/alimentos-in-natura", "name": "Alimentos in natura"}, {"href": "/categories/nutricao-alimentar/alimentos-processados-e-ultraprocessados", "name": "Alimentos Processados e Ultraprocessados"}]}, {"name": "Ecossistema Moda", "maintenance": false, "links": [{"href": "/categories/ecossistema-moda/masculino", "name": "Moda masculina"}, {"href": "/categories/ecossistema-moda/feminino", "name": "Moda feminina"}]}]

const SideMenu = () => {
  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button className="text-black relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-ui-fg-base">
                  Menu
                </Popover.Button>
              </div>

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Popover.Panel className="flex flex-col absolute w-[calc(100%-1rem)] sm:w-96 h-[calc(100vh-1rem)] z-30 inset-x-0 top-0 m-2 backdrop-blur-2xl bg-white text-black justify-between rounded-rounded p-6 text-black">
                  <div className="flex justify-between items-center">
                    <Text className="txt-compact-small text-ui-fg-subtle uppercase">
                      Navegacao
                    </Text>
                    <button onClick={close} data-testid="close-menu-button">
                      <XMark />
                    </button>
                  </div>

                  <div className="flex-1 min-h-0 overflow-y-auto my-6">
                  <ul className="flex flex-col gap-4 items-start justify-start">
                    {Object.entries(SideMenuItems).map(([name, href]) => {
                      return (
                        <li key={name}>
                          <LocalizedClientLink
                            href={href}
                            className={href === "/parceiros" ? "inline-flex min-h-11 items-center rounded-lg bg-[#e8f4ff] px-3 py-2 font-semibold text-[#123b65] hover:bg-[#d9edff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 text-base" : "text-black text-3xl leading-10 hover:text-black"}
                            onClick={close}
                          >
                            {name}
                          </LocalizedClientLink>
                        </li>
                      )
                    })}
                  </ul>
                  <div className="mt-6 border-t border-gray-200 pt-4 space-y-3">
                    {CategoryGroups.map((group) => (
                      <details key={group.name} className="border-b border-gray-100 pb-3">
                        <summary className="cursor-pointer text-lg font-semibold py-2">{group.name}</summary>
                        {group.maintenance && <p className="text-xs text-amber-900 bg-amber-50 px-3 py-2">Em manutenção</p>}
                        <ul className="pl-3">
                          {group.links.map((item) => (
                            <li key={item.href}>
                              <LocalizedClientLink href={item.href} onClick={close} className="block py-3 text-base text-black hover:underline">
                                {item.name}
                              </LocalizedClientLink>
                            </li>
                          ))}
                        </ul>
                      </details>
                    ))}
                  </div>
                  </div>

                  <div>
                    <Text className="txt-compact-small text-ui-fg-subtle">
                      AM Suplementos e Vestuário.
                    </Text>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu