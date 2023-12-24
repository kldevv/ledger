import { useCallback, useEffect, useState } from 'react';
import type {
  FieldValues,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';
import { FormProvider } from 'react-hook-form';

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
  /**
   * React hook form returns
   */
  context: UseFormReturn<TFieldValues>;
  /**
   * Is default form behavior enabled?
   *
   * By default, `false`
   */
  enableDefault?: boolean;
}

export const Form = <TFieldValues extends FieldValues>({
  children,
  onSubmit,
  context,
  enableDefault,
  ...props
}: FormProps<TFieldValues>) => {
  const {
    formState: { isSubmitSuccessful },
    reset,
    handleSubmit,
  } = context;

  const handleOnSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      if (!enableDefault) {
        event.preventDefault();
      }

      handleSubmit(onSubmit)(event);
    },
    [onSubmit, handleSubmit]
  );

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <FormProvider {...context}>
      <form {...props} className="w-fit" onSubmit={handleOnSubmit}>
        {children}
      </form>
    </FormProvider>
  );
};
