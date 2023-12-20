import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useReactHookForm, UseFormProps, FieldValues, DefaultValues } from "react-hook-form"
import { z } from "zod";

export interface useFormArgs<TFieldValues extends FieldValues> {
  /**
   * Zod schema of the form fields.
   */
  schema: z.Schema;
  /**
   * Default values for the form
   */
  defaultValues: DefaultValues<TFieldValues>
  /**
   * Props for `useForm` of the react-hook-form library.
   */
  props?: Omit<UseFormProps<TFieldValues>, 'resolver' | 'defaultValues'>;
};

export const useForm = <TFieldValues extends FieldValues>({
  schema,
  defaultValues,
  props,
}: useFormArgs<TFieldValues>) => {
  const methods = useReactHookForm<TFieldValues>({
    // When set to all, all errors from each field will be gathered.
    criteriaMode: 'all',
    // Validation is triggered on both blur and change events.
    mode: 'all',
    shouldUnregister: true,
    
    ...props,

    defaultValues,
    resolver: zodResolver(schema),
  });

  return methods;
};
