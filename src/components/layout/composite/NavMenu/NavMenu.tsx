import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { Icon } from '@/components/core'
import { route } from '@/shared'

import { BranchSwitch } from '..'

export const NavMenu: React.FC = () => {
  const { t } = useTranslation('layout')

  return (
    <div className="h-full overflow-auto">
      <div className="border-b-mid-gray flex size-full min-w-max items-center border-b px-4 shadow-sm">
        <Link className="text-lg font-bold" href={route.home}>
          {/* TODO: Replace with logo svg */}
          PizzaFunds
        </Link>
        <div className="mx-auto">
          <BranchSwitch />
        </div>
        <Link href={route.home} className="mr-4 text-sm font-medium">
          {t`topNavBar.about`}
        </Link>
        <div className="flex text-sm font-medium">
          <Icon.Brand name="Invertocat" className="mr-2 size-3" />
          <a
            rel="noopener noreferrer"
            className="hover:text-light-accent"
            target="_blank"
            href="https://github.com/kldevv"
          >
            {t`topNavBar.github`}
          </a>
          <Icon.Solid name="Slash" />
          <a
            rel="noopener noreferrer"
            className="hover:text-light-accent"
            target="_blank"
            href="https://github.com/kldevv/ledger"
          >{t`topNavBar.project`}</a>
        </div>
      </div>
    </div>
  )
}
