import { FieldValues } from 'react-hook-form';
import { useMemo } from 'react';
import { createFormDateInput } from './Field';

export const useFormDateInput = <TFieldValues extends FieldValues>() => {
  const DateInput = useMemo(() => createFormDateInput<TFieldValues>(), []);

  return DateInput;
};
