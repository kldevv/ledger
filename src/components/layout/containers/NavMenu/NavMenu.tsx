import { signIn, signOut, useSession } from 'next-auth/react'

import { ButtonCore } from '@/components/core/presentationals'

import { BranchSwitch } from '..'

export const NavMenu: React.FC = () => {
  const { data: session } = useSession()

  return (
    <div className="border-b-mid-gray sticky top-0 z-10 flex h-14 w-full items-center border-b bg-white px-4 shadow-sm">
      <BranchSwitch />
      <div className="ml-auto flex min-w-fit gap-x-2 text-xs">
        {session ? (
          <ButtonCore
            className="size-fit text-nowrap"
            onClick={() => void signOut()}
          >
            Sign Out
          </ButtonCore>
        ) : (
          <ButtonCore
            className="text-light-accent size-fit text-nowrap"
            onClick={() => void signIn('github')}
          >
            Sign In
          </ButtonCore>
        )}
      </div>
    </div>
  )
}
