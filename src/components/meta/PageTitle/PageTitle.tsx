import Head from 'next/head'

export interface PageTitleProps {
  /**
   * Page title
   */
  children: string
}

/**
 * Page title tag and meta
 */
export const PageTitle: React.FC<PageTitleProps> = ({ children }) => {
  return (
    <Head>
      <title key="title">{children}</title>
      <meta key="og:title" content={children} property="og.title" />
    </Head>
  )
}
