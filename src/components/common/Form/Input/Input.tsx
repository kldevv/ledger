import {
  Control,
  Controller,
  FieldValues,
  Path,
  useController,
} from 'react-hook-form';
import classNames from 'classnames';
import { memo, useMemo } from 'react';
import { Field } from '../Field';

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
}

export const Input = memo(<TFieldValues extends FieldValues>({
  name,
  label,
  type = 'text',
  className,
  ...props
}: InputProps<TFieldValues>) => {
  const htmlFor = useMemo(() => `input-id-${name}`, [name]);

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

  return (
    <Controller
      render={({ field, fieldState: { error } }) => {
        return (
          <Field htmlFor={htmlFor} label={label} error={error?.message}>
            <input
              {...props}
              {...field}
              type={type}
              className={cn}
              id={htmlFor}
              autoComplete="on"
            />
          </Field>
        );
      }}
      // control={control}
      name={name}
    />
  );
})
