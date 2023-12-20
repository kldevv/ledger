import { formatDate } from '@/lib';
import classNames from 'classnames';

export interface FormattedDateProps {
  /**
   * Date time
   */
  dateTime: Date
  /**
   * Customized class name
   */
  className?: string;
}

export const FormattedDate: React.FC<FormattedDateProps> = ({
  dateTime,
  className,
}) => {
  const cn = classNames('whitespace-nowrap', className);

  if (dateTime == null) {
    return null
  }
  return (
    <span className={cn}>{formatDate(dateTime)}</span>
  );
};
