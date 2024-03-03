import classNames from 'classnames'

export interface SectionTitle {
  /**
   * Section title
   */
  title: string
  /**
   * Override class name
   */
  className?: string
}

export const SectionTitle: React.FC<SectionTitle> = ({ title, className }) => {
  return (
    <h3
      className={classNames(
        'text-gray whitespace-nowrap text-xs font-medium',
        className,
      )}
    >
      {title.toUpperCase()}
    </h3>
  )
}
