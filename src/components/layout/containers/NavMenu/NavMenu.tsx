import { signOut, useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { useCallback } from 'react'

import { ButtonCore } from '@/components/core/presentationals'
import { BranchSwitch } from '@/packages/layout'
import { route } from '@/shared/route'

export const NavMenu: React.FC = () => {
  const { t } = useTranslation('layout')
  const { data: session } = useSession()
  const handleSignOut = useCallback(
    () =>
      void signOut({
        callbackUrl: route.core.signIn.pathname,
      }),
    [],
  )

  return (
    <div className="border-b-mid-gray sticky top-0 z-10 flex h-14 w-full items-center border-b bg-white px-4 shadow-sm">
      <BranchSwitch />
      <div className="ml-auto mr-4 flex min-w-fit gap-x-6 text-xs">
        {session?.user.name != null && (
          <p className="text-gray whitespace-nowrap text-xs font-medium">
            {t(`salutation`, { name: session?.user.name })}
          </p>
        )}
        <ButtonCore
          className="text-light-accent hover:text-light-accent/60 w-fit text-nowrap font-medium"
          onClick={handleSignOut}
        >
          {t`signOut`}
        </ButtonCore>
      </div>
    </div>
  )
}
