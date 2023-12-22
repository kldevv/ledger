import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { Label } from '../Label';
import { ErrorMessage } from '../ErrorMessage';
import { InputCore, InputCoreProps } from '../..';

export interface InputTextProps<TFieldValues extends FieldValues>
  extends Omit<
    InputCoreProps,
    'onChange' | 'value' | 'onBur' | 'defaultValue' | 'type' | 'ref'
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
  /**
   * Default value
   */
  defaultValue?: number | string;
}

export const InputText = <TFieldValues extends FieldValues>({
  name,
  label,
  control,
  className,
  ...props
}: InputTextProps<TFieldValues>) => {
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
      <InputCore
        id={`input-${name}`}
        onChange={onChange}
        ref={ref}
        disabled={disabled}
        onBlur={onBlur}
        name={name}
        value={value}
        {...props}
      />
      <ErrorMessage error={error?.message} />
    </div>
  );
};
