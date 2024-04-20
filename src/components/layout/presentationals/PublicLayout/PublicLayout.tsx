import { BaseLayout } from '../BaseLayout/BaseLayout'
import { Footer } from '../Footer/Footer'

export interface PublicLayoutProps {
  /**
   * Children
   */
  children: React.ReactNode
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <BaseLayout>
      <div className="bg-light-shades flex size-full flex-col px-6 pt-4">
        <div className="flex grow px-4">{children}</div>
        <Footer className="mt-auto" />
      </div>
    </BaseLayout>
  )
}
