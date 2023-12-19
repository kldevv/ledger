import { FieldValues } from 'react-hook-form';
import { InputProps, createFormInput } from '..';

export interface DateInputProps<TFieldValues extends FieldValues>
  extends Omit<InputProps<TFieldValues>, 'type' | 'max'> {}

export const createFormDateInput = <TFieldValues extends FieldValues>() => {
  const DateInput: React.FC<DateInputProps<TFieldValues>> = (props) => {
    const Input = createFormInput()

    return <Input {...props} type="date" max="2999-12-31" />;
  };

  return DateInput;
};
