'use client'

import { Popover, Transition } from "@headlessui/react"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import { Text, clx } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Fragment } from "react"

const SideMenuItems = {
  Inicio: "/",
  Loja: "/store",
  "Minha Conta": "/account",
  Carrinho: "/cart",
}

const SideMenu = ({ regions }: { regions: any }) => {
  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-ui-fg-base">
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
                <Popover.Panel className="flex flex-col absolute w-full pr-4 sm:pr-0 sm:w-1/3 h-[calc(100vh-1rem)] z-30 inset-x-0 top-0 m-2 backdrop-blur-2xl bg-white/80 text-ui-fg-on-color justify-between rounded-rounded p-6 text-black">
                  <div className="flex justify-between items-center">
                    <Text className="txt-compact-small text-ui-fg-subtle uppercase">
                      Navegacao
                    </Text>
                    <button onClick={close} data-testid="close-menu-button">
                      <XMark />
                    </button>
                  </div>

                  <ul className="flex flex-col gap-6 items-start justify-start">
                    {Object.entries(SideMenuItems).map(([name, href]) => {
                      return (
                        <li key={name}>
                          <LocalizedClientLink
                            href={href}
                            className="text-3xl leading-10 hover:text-ui-fg-subtle"
                            onClick={close}
                          >
                            {name}
                          </LocalizedClientLink>
                        </li>
                      )
                    })}
                  </ul>

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