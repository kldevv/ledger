import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useReactHookForm, UseFormProps, FieldValues } from "react-hook-form"
import { z } from "zod";
import { createForm } from "./Form/Form";


export type useFormArgs<TFieldValues extends FieldValues> = {
  /**
   * Zod schema of the form fields.
   */
  schema: z.Schema;
  /**
   * Props for `useForm` of the react-hook-form library.
   */
  props?: UseFormProps<TFieldValues>;
};

export const useForm = <TFieldValues extends FieldValues>({ schema, props }: useFormArgs) => {
  const methods =
    useReactHookForm <TFieldValues>({
      ...props,
      // When set to all, all errors from each field will be gathered.
      criteriaMode: 'all',
      // Validation is triggered on both blur and change events.
      mode: 'all',
      resolver: zodResolver(schema),
    });

  const Form = createForm<TFieldValues>({ reactHookFormMethods: methods });

  return { Form, methods };
};

 