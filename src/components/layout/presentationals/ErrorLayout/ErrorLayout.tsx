import { BaseLayout } from '../BaseLayout/BaseLayout'
import { Footer } from '../Footer/Footer'

export interface ErrorLayoutProps {
  /**
   * Children
   */
  children: React.ReactNode
}

export const ErrorLayout: React.FC<ErrorLayoutProps> = ({ children }) => {
  return (
    <BaseLayout>
      <div className="flex size-full flex-col px-6">
        <div className="ml-12 flex grow items-center">{children}</div>
        <Footer className="mt-auto" />
      </div>
    </BaseLayout>
  )
}
