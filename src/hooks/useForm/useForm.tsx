import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useReactHookForm, UseFormProps, FieldValues } from "react-hook-form"
import { z } from "zod";

export interface useFormArgs<TFieldValues extends FieldValues> {
  /**
   * Zod schema of the form fields.
   */
  schema: z.Schema;
  /**
   * Props for `useForm` of the react-hook-form library.
   */
  props?: Omit<UseFormProps<TFieldValues>, 'resolver'>;
};

export const useForm = <TFieldValues extends FieldValues>({
  schema,
  props,
}: useFormArgs<TFieldValues>) => {
  const methods = useReactHookForm<TFieldValues>({
    // When set to all, all errors from each field will be gathered.
    criteriaMode: 'all',
    // Validation is triggered on both blur and change events.
    mode: 'all',
    shouldUnregister: true,
    ...props,
    resolver: zodResolver(schema),
  });

  return methods;
};
