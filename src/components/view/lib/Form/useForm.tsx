import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useReactHookForm, UseFormProps, FieldValues } from "react-hook-form"
import { z } from "zod";
import { createForm } from "./Form/Form";
import { SubmitButton } from "./Fields";


export type useFormProps<TFieldValues extends FieldValues> = {
  /**
   * Form schema for validation
   */
  schema: z.Schema;
  /**
   * Props for react-hook-form `useForm` hook
   */
  props?: Omit<UseFormProps<TFieldValues>, 'resolver'>;
};

export const useForm = <TFieldValues extends FieldValues>({ schema, props }: useFormProps<TFieldValues>) => {
  const methods = useReactHookForm({
    mode: 'all',
    criteriaMode: 'all',
    ...props,
    resolver: zodResolver(schema),
  });

  const Form = createForm<TFieldValues>({ reactHookFormMethods: methods });

  const Fields = {
    SubmitButton
  }

  return { Form, Fields, methods };
};

 