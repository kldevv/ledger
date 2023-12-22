import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { Label } from '../Label';
import { ErrorMessage } from '../ErrorMessage';
import { NumericFormat } from 'react-number-format';
import { InputCore, InputCoreProps } from '../..';

export interface InputNumberProps<TFieldValues extends FieldValues>
  extends Omit<
    InputCoreProps,
    'onChange' | 'value' | 'onBur' | 'defaultValue' | 'type' | 'ref'
  > {
  /**
   * Input number label
   */
  label: string;
  /**
   * Input number name
   */
  name: Path<TFieldValues>;
  /**
   * Form control
   */
  control?: Control<TFieldValues>;
  /**
   * Default value
   */
  defaultValue?: number | string;
}

export const InputNumber = <TFieldValues extends FieldValues>({
  name,
  label,
  control,
  className,
  ...props
}: InputNumberProps<TFieldValues>) => {
  const {
    field: { onChange, onBlur, value, ref, disabled },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <div className="w-[12rem] flex flex-col my-1">
      <Label htmlFor={`input-${name}`}>{label}</Label>
      <div className="flex relative">
        <span className="font-normal text-dark-shades text-xs absolute top-3 left-2">
          US$
        </span>
        <NumericFormat
          id={`input-${name}`}
          onChange={onChange}
          customInput={InputCore}
          getInputRef={ref}
          disabled={disabled}
          onBlur={onBlur}
          name={name}
          value={value}
          decimalScale={2}
          allowLeadingZeros={false}
          allowNegative={false}
          thousandSeparator={','}
          className="text-right pl-10"
          {...props}
        />
      </div>
      <ErrorMessage error={error?.message} />
    </div>
  );
};
