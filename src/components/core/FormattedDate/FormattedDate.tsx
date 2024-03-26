import classNames from 'classnames'

import { formatDate } from '@/shared'

export interface FormattedDateProps {
  /**
   * Date time
   */
  dateTime?: Date | null
  /**
   * Customized class name
   */
  className?: string
}

export const FormattedDate: React.FC<FormattedDateProps> = ({
  dateTime,
  className,
}) => {
  if (dateTime == null) return null

  return (
    <span className={classNames('whitespace-nowrap', className)}>
      {formatDate(dateTime)}
    </span>
  )
}
