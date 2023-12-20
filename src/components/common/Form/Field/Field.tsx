import * as Label from '@radix-ui/react-label';

import { FieldValues } from 'react-hook-form';

export interface FieldProps<TFieldValues extends FieldValues> {
  /**
   * Field for id
   */
  htmlFor: string;
  /**
   * Field label
   */
  label: string;
  /**
   * Field controller
   */
  children: React.ReactNode;
  /**
   * Field errors
   */
  error?: string;
}

export const Field = <TFieldValues extends FieldValues>({
  htmlFor,
  label,
  children,
  error,
}: FieldProps<TFieldValues>) => {
  return (
    <div className="max-w-xs flex flex-col my-2">
      <Label.Root
        className="w-full text-xs leading-6 font-medium text-dark-shades whitespace-nowrap"
        htmlFor={htmlFor}
      >
        {label}
      </Label.Root>
      {children}
      {error && (
        <span role="alert" className="text-xs font-normal text-red">{`${
          error.split('.')[0]
        }.`}</span>
      )}
    </div>
  );
};
