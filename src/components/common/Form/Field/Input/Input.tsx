import { FieldValues, Path, useController } from 'react-hook-form';
import classNames from 'classnames';
import { Field } from '../Field';
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
}

export const createFormInput = <TFieldValues extends FieldValues>() => {
  const Input: React.FC<InputProps<TFieldValues>> = ({
    name,
    label,
    type = 'text',
    className,
    ...props
  }) => {
    const {
      field: { value, onChange, onBlur, ref },
    } = useController<TFieldValues>({
      name,
    });

    const htmlFor = useMemo(() => `input-id-${name}`, [name]);

    const cn = useMemo(() =>
       classNames(
        'py-1.5 px-3',
        'w-full',
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

  return Input;
};
