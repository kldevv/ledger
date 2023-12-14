import { FieldValues, Path, useController } from 'react-hook-form';
import classNames from 'classnames';
import { useMemo } from 'react';
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

    const inputId = `id-${name}`;
    const cn = classNames(
      'mt-1, py-1.5 px-3',
      'w-full',
      'hadow-sm rounded-md shadow-mid-gray border border-mid-gray border-dark-gray',
      'font-normal text-sm leading-6 text-dark-shades',
      'focus:outline-light-accent focus:bg-light-accent-halo',
      className
    );

    return (
      <Field inputId={inputId} label={label} name={name}>
        <input
          type={type}
          id={inputId}
          className={cn}
          defaultValue={value ?? ''}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
          {...props}
        />
      </Field>
    );
  };

  return Input;
};
