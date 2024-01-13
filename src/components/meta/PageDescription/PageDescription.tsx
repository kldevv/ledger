import Head from 'next/head'

export interface PageDescriptionProps {
  /**
   * Page description
   */
  children: string
}

export const PageDescription: React.FC<PageDescriptionProps> = ({
  children,
}) => {
  return (
    <Head>
      <meta key="description" content={children} name="description" />
      <meta key="og:description" content={children} property="og:description" />
    </Head>
  )
}
