import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useReactHookForm, UseFormProps } from "react-hook-form"
import { z } from "zod";
import { createForm } from "./Form/createForm";


export type useFormProps = {
  /**
   * Form schema for validation
   */
  schema: z.Schema;
  /**
   * Props for react-hook-form `useForm` hook
   */
  props: UseFormProps;
};

export const useForm = ({ schema, props }: useFormProps) => {
  const methods = useReactHookForm({
    ...props,
    resolver: zodResolver(schema),
  });

  const Form = createForm({ reactHookFormMethods: methods });

  return { Form, methods };
};

 