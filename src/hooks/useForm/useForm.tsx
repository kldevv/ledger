import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm as useReactHookForm, UseFormProps as ReactHookFormProps, FieldValues, DefaultValues } from "react-hook-form"
import { z } from "zod";

export interface UseFormProps<TFieldValues extends FieldValues> {
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
  props?: Omit<ReactHookFormProps<TFieldValues>, 'resolver' | 'defaultValues'>;
};

export const useForm = <TFieldValues extends FieldValues>({
  schema,
  defaultValues,
  props,
}: UseFormProps<TFieldValues>) => {
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

  const {
    formState: { isSubmitSuccessful },
    reset,
  } = methods;
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(defaultValues);
    }
  }, [isSubmitSuccessful, reset]);

  return methods;
};
