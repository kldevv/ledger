import { signOut, useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { useCallback } from 'react'

import { Button } from '@/packages/core/components'
import { BranchSwitch } from '@/packages/layout'
import { route } from '@/shared/route'

export const MenuBar: React.FC = () => {
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
      <div className="ml-auto mr-4 flex min-w-fit gap-x-2 text-xs">
        {session?.user.name != null && (
          <span className="text-gray whitespace-nowrap text-xs font-normal">
            {t(`salutation`, { name: session?.user.name })}
          </span>
        )}
        <Button.Text
          className="w-fit font-normal"
          onClick={handleSignOut}
          variant="primary"
          label={t`signOut`}
        />
      </div>
    </div>
  )
}
