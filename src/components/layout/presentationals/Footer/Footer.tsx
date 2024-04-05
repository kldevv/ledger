import classnames from 'classnames'
import { useTranslation } from 'next-i18next'

export interface Footer {
  /**
   * Override class name
   */
  className?: string
}

export const Footer: React.FC<Footer> = ({ className }) => {
  const { t } = useTranslation('layout')

  return (
    <footer
      className={classnames(
        'text-gray w-full py-2 text-right text-xs font-light leading-6',
        className,
      )}
    >
      &copy;
      {t('footer.copyrights', {
        year: new Date().getFullYear(),
      })}
    </footer>
  )
}
