import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useReactHookForm, UseFormProps, FieldValues } from "react-hook-form"
import { z } from "zod";
import { createForm, createFormProps } from "./Form/Form";
import { useMemo } from "react";


export interface useFormArgs<TFieldValues extends FieldValues>
  extends Omit<createFormProps<TFieldValues>, 'useFormReturns'> {
  /**
   * Zod schema of the form fields.
   */
  schema: z.Schema;
  /**
   * Props for `useForm` of the react-hook-form library.
   */
  useFormProps?: UseFormProps<TFieldValues>;
};

export const useForm = <TFieldValues extends FieldValues>({
  schema,
  useFormProps,
}: useFormArgs<TFieldValues>) => {
  const useFormReturns = useReactHookForm<TFieldValues>({
    ...useFormProps,
    // When set to all, all errors from each field will be gathered.
    criteriaMode: 'all',
    // Validation is triggered on both blur and change events.
    mode: 'all',
    resolver: zodResolver(schema),
  });

  const Form = useMemo(
    () => createForm<TFieldValues>({ useFormReturns }),
    [useFormReturns]
  );

  return [Form, useFormReturns] as const;
};
