import { Control, FieldValues, Path, useController } from 'react-hook-form';
import classNames from 'classnames';
import { Field } from '../Field/Field';
import { useMemo } from 'react';

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
   * Optional control to explicitly set `react-hook-form` control
   */
  control?: Control<TFieldValues>;
}

export const Input = <TFieldValues extends FieldValues>({
  name,
  label,
  type = 'text',
  className,
  control,
  ...props
}: InputProps<TFieldValues>) => {
  const {
    field: { value, onChange, onBlur, ref },
  } = useController<TFieldValues>({
    name,
    control,
  });

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
    <Field htmlFor={htmlFor} label={label} name={name}>
      <input
        {...props}
        type={type}
        className={cn}
        id={htmlFor}
        autoComplete="on"
        name={name}
        value={value ?? ''}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
      />
    </Field>
  );
};
