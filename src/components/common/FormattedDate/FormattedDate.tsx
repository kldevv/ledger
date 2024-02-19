import classNames from 'classnames'

import { formatDate } from '@/shared'

export interface FormattedDateProps {
  /**
   * Date time
   */
  dateTime?: Date
  /**
   * Customized class name
   */
  className?: string
}

export const FormattedDate: React.FC<FormattedDateProps> = ({
  dateTime,
  className,
}) => {
  const cn = classNames('whitespace-nowrap', className)

  return <span className={cn}>{formatDate(dateTime)}</span>
}
