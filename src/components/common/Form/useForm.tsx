import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useReactHookForm, UseFormProps } from "react-hook-form"
import { z } from "zod";
import { createForm } from "./Form/Form";


export type useFormArgs = {
  /**
   * Zod schema of the form fields.
   */
  schema: z.Schema;
  /**
   * Props for `useForm` of the react-hook-form library.
   */
  props?: UseFormProps;
};

export const useForm = ({ schema, props }: useFormArgs) => {
  const methods = useReactHookForm({
    ...props,
    // When set to all, all errors from each field will be gathered.
    criteriaMode: 'all',
    // Validation is triggered on both blur and change events.
    mode: 'all',
    resolver: zodResolver(schema),
  });

  const Form = createForm({ reactHookFormMethods: methods });

  return { Form, methods };
};

 