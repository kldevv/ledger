import classNames from 'classnames';
import { numericFormatter } from 'react-number-format';

export interface FormattedNumberProps {
  /**
   * Value
   */
  value: number | string;
  /**
   * Customized class name
   */
  className?: string;
}

export const FormattedNumber: React.FC<FormattedNumberProps> = ({
  value,
  className,
}) => {
  return (
    <div className="w-30 flex items-center">
      <div className="font-normal text-xs">US$</div>
      <div className={classNames('ml-auto pl-8', className)}>
        {numericFormatter(String(value), {
          decimalScale: 2,
          thousandSeparator: ',',
          allowLeadingZeros: false,
          allowNegative: false,
          fixedDecimalScale: true,
        })}
      </div>
    </div>
  );
};
