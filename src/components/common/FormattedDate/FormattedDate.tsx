import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

export interface FormattedDateProps {
  /**
   * Date time
   */
  dateTime?: Date | null;
  /**
   * Customized class name
   */
  className?: string;
}

export const FormattedDate: React.FC<FormattedDateProps> = ({
  dateTime,
  className,
}) => {
  const { t } = useTranslation('common');
  const cn = classNames('whitespace-nowrap', className);

  if (dateTime == null) {
    return null
  }

  const year = dateTime.getFullYear();
  const month = dateTime.getMonth() + 1;
  const date = dateTime.getDate();

  return (
    <span className={cn}>{t('formatted-date', { year, month, date })}</span>
  );
};
