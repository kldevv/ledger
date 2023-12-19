import { FieldValues } from 'react-hook-form';
import { createFormInput } from './Field';
import { useMemo } from 'react';

export const useFormInput = <TFieldValues extends FieldValues>() => {
  const Input = useMemo(() => createFormInput<TFieldValues>(), []);

  return Input;
};
