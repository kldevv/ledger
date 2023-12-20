import { FieldValues } from "react-hook-form";
import { Input, InputProps } from "..";

export interface DatePickerProps<TFieldValues extends FieldValues>
  extends Omit<InputProps<TFieldValues>, 'type' | 'max'> {}

export const DatePicker = <TFieldValues extends FieldValues>(
  props: DatePickerProps<TFieldValues>
) => {
  return <Input {...props} type="date" max="2999-12-31" />;
};
