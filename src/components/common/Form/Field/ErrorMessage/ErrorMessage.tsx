import { FieldErrors, FieldName, FieldValues, useFormContext } from "react-hook-form";
import { FieldValuesFromFieldErrors, ErrorMessage as HookFormErrorMessage } from '@hookform/error-message';

export interface ErrorMessageProps<
  TFieldErrors extends FieldErrors<TFieldValues>,
  TFieldValues extends FieldValues
> {
  /**
   * Field name
   */
  name: FieldName<FieldValuesFromFieldErrors<TFieldErrors>>;
  /**
   * Field errors
   */
  errors: FieldErrors<TFieldValues>;
}


export const ErrorMessage = <
  TFieldErrors extends FieldErrors<TFieldValues>,
  TFieldValues extends FieldValues
>({
  name,
  errors,
}: ErrorMessageProps<TFieldErrors, TFieldValues>) => {
  return (
    <HookFormErrorMessage
      name={name}
      errors={errors}
      render={({ message }) => (
        <span role="alert" className="text-xs font-normal text-red">{`${
          message.split('.')[0]
        }.`}</span>
      )}
    />
  );
};
