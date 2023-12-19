import { FieldValues } from 'react-hook-form';
import { createFormSelect } from './Field';
import { useMemo } from 'react';

export const useFormSelect = <TFieldValues extends FieldValues>() => {
  const Select = useMemo(() => createFormSelect<TFieldValues>(), []);

  return Select;
};
