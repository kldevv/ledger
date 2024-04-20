import classNames from 'classnames'
import { signIn } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useCallback, useState } from 'react'

import { Button, Icon } from '@/components/core/presentationals'
import { PublicLayout } from '@/components/layout/presentationals'
import { route } from '@/shared/route'

import type { GetStaticProps } from 'next'

const Page = () => {
  const { t } = useTranslation('pages')
  const [inProgress, setInProgress] = useState(false)
  const [loading, setLoading] = useState({
    google: false,
    github: false,
  })

  const handleOnSignIn = useCallback(
    (provider: 'google' | 'github') => () => {
      setInProgress(true)
      setLoading((prev) => ({ ...prev, [provider]: true }))
      void signIn(provider, {
        callbackUrl: route.core.home.pathname,
      })
    },
    [],
  )

  return (
    <PublicLayout>
      <div className="text-dark-shades absolute left-4 top-4 flex h-fit items-center text-xl font-extrabold leading-4">
        Pizzafund <Icon.Solid name="Hashtag" />
      </div>
      <div className="mx-auto mt-48 flex max-w-[30rem] flex-col gap-y-4 px-4">
        <div className="border-mid-gray mb-4 flex flex-col border-b-2 pb-6">
          <h1 className="mt-2 text-3xl font-extrabold">Sign In</h1>
          <p className="mt-3 text-sm font-medium">
            Using one of the following options
          </p>
        </div>
        <div className="flex flex-col gap-y-4">
          <div className="h-8 w-full">
            <Button
              disabled={inProgress}
              onClick={handleOnSignIn('github')}
              loading={loading.github}
              color={classNames(
                inProgress
                  ? 'bg-mid-gray text-white'
                  : 'bg-dark-shades hover:bg-dark-shades/80 text-white',
              )}
              className="w-full text-sm font-semibold"
            >
              <div className="flex w-full items-center">
                <Icon.Brand name="Invertocat" />
                <span className="mx-auto">Sign in with Github</span>
              </div>
            </Button>
          </div>
          <div className="h-8 w-full">
            <Button
              onClick={handleOnSignIn('google')}
              loading={loading.google}
              disabled={inProgress}
              color={classNames(
                inProgress
                  ? 'bg-mid-gray border-gray/40 text-white'
                  : 'bg-light-shades hover:bg-mid-gray/60 border-gray text-dark-shades',
              )}
              className="w-full border text-sm"
            >
              <div className="flex w-full items-center">
                <Icon.Brand name="Google" />
                <span className="mx-auto font-semibold">
                  Sign in with Google
                </span>
              </div>
            </Button>
          </div>
          <p className="text-gray mt-3 text-xs font-normal">
            Tailor accounts, simplify entries, and more.
          </p>
        </div>
      </div>
    </PublicLayout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'common',
        'pages',
        'layout',
      ])),
    },
  }
}

export default Page
