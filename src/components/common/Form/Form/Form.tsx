import { useCallback, useEffect, useState } from 'react';
import type {
  FieldValues,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';
import { FormProvider } from 'react-hook-form';
import {
  InputProps,
  SelectProps,
  createFormInput,
  createFormSelect,
} from '../Field';

export interface createFormProps<TFieldValues extends FieldValues> {
  /**
   * React hook form returns
   */
  useFormReturns: UseFormReturn<TFieldValues>;
  /**
   * Is default form behavior enabled?
   *
   * By default, `false`
   */
  enableDefault?: boolean;
};

export interface FormProps<TFieldValues extends FieldValues>
  extends Omit<React.ComponentPropsWithRef<'form'>, 'onSubmit'> {
  /**
   * Children component
   */
  children: React.ReactNode;
  /**
   * Callback on submit event
   */
  onSubmit: SubmitHandler<TFieldValues>;
}

export type Form<TFieldValues extends FieldValues> = React.FC<
  FormProps<TFieldValues>
> & {
  Input: React.FC<InputProps<TFieldValues>>;
  Select: React.FC<SelectProps<TFieldValues>>;
};

export const createForm = <TFieldValues extends FieldValues>({
  useFormReturns,
  enableDefault = false,
}: createFormProps<TFieldValues>) => {
  const Form: Form<TFieldValues> = ({ children, onSubmit, ...props }) => {
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleOnSubmit = useCallback(
      async (event: React.FormEvent<HTMLFormElement>) => {
        if (!enableDefault) {
          event.preventDefault();
        }

        await useFormReturns.handleSubmit(onSubmit)(event);

        setIsSubmitted(true)
      },
      [onSubmit]
    );

    useEffect(() => {
      if (isSubmitted) {
        useFormReturns.reset();
      }
    }, [isSubmitted]);

    return (
      <FormProvider {...useFormReturns}>
        <form {...props} onSubmit={handleOnSubmit}>
          {children}
        </form>
      </FormProvider>
    );
  };

  Form.Input = createFormInput<TFieldValues>();
  Form.Select = createFormSelect<TFieldValues>();

  return Form;
};
