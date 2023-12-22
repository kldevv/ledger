import { Control, FieldValues, Path, useController } from 'react-hook-form';
import classNames from 'classnames';
import { ChangeEvent, useCallback, useMemo } from 'react';
import { Label } from '../Label';
import { ErrorMessage } from '../ErrorMessage';
import { z } from 'zod';

const numberSchema = z.string().refine(value => !isNaN(parseFloat(value)), {
      message: 'Please enter a valid number',
    })
    .refine(value => parseFloat(value) >= 0, {
      message: 'Please enter a non-negative number',
    })
    .refine(value => {
      const decimalCount = (value.split('.')[1] || '').length;
      return decimalCount <= 2;
    }, {
      message: 'Maximum of two decimal places allowed',
    })
    .refine(value => parseFloat(value).toString() === value.replace(/^0*(?=\d)/, ''), {
      message: 'Leading zeros are not allowed',
    })

export interface InputProps<TFieldValues extends FieldValues>
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

export const Input = <TFieldValues extends FieldValues>({
  name,
  label,
  control,
  type = 'text',
  className,
  ...props
}: InputProps<TFieldValues>) => {
  const {
    field: { onChange, ...restField},
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const cn = useMemo(
    () =>
      classNames(
        'py-1.5 px-3',
        'w-full h-[2.5rem]',
        'rounded-md border border-mid-gray',
        'font-normal text-sm leading-6 text-dark-shades',
        'focus:outline-light-accent focus:bg-light-accent-halo',
        className
      ),
    [className]
  );

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (type === 'number') {
        const leadingZeroRegex = /^0*(?=\d)/
        const value = e.target.value.replace(leadingZeroRegex, '');

        const numberRegex = /^\d*\.?\d{0,2}$/;
        if (numberRegex.test(value) || value === '') {
          onChange({
            ...e,
            target: {
              ...e.target,
              value: parseFloat(value).toLocaleString('US')
            },
          });
        }
      }
    };

  return (
    <div className="w-[12rem] flex flex-col my-1">
      <Label htmlFor={`input-${name}`}>{label}</Label>
      <input
        {...props}
        {...restField}
        type={type}
        className={cn}
        onChange={handleOnChange}
        id={`input-${name}`}
        autoComplete="on"
      />
      <ErrorMessage error={error?.message} />
    </div>
  );
};
