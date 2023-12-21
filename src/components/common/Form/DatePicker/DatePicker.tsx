import { Control, FieldValues, Path, useController } from 'react-hook-form';
import classNames from 'classnames';
import { useCallback, useMemo } from 'react';
import { Label } from '../Label';
import { formatDate } from '@/lib';

export interface DatePickerProps<TFieldValues extends FieldValues>
  extends Omit<
    React.ComponentPropsWithoutRef<'input'>,
    'onChange' | 'value' | 'onBur'
  > {
  /**
   * Input label
   */
  label: string;
  /**
   * Input name
   */
  name: Path<TFieldValues>;
  /**
   * Form control
   */
  control?: Control<TFieldValues>;
}

export const DatePicker = <TFieldValues extends FieldValues>({
  name,
  label,
  control,
  className,
  ...props
}: DatePickerProps<TFieldValues>) => {
  const {
    field: {value, ...rest},
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const cn = useMemo(
    () =>
      classNames(
        'py-1.5 px-3',
        'w-full min-w-[10rem]',
        'rounded-md border border-mid-gray',
        'font-normal text-sm leading-6 text-dark-shades',
        'focus:outline-light-accent focus:bg-light-accent-halo',
        className
      ),
    [className]
  );

  const convertValue = useCallback((value: Date | string) => {
    if (typeof value === 'string') return value

    return formatDate(value);
  }, [])

  return (
    <div className="max-w-xs flex flex-col my-1">
      <Label htmlFor={`input-${name}`}>{label}</Label>
      <input
        {...props}
        {...rest}
        value={convertValue(value)}
        type="date"
        max="2999-12-31"
        className={cn}
        id={`input-${name}`}
        autoComplete="on"
      />
    </div>
  );
};
