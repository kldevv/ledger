import { memo, useCallback, useEffect, useState } from 'react';
import type {
  FieldValues,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';
import { FormProvider } from 'react-hook-form';

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
}

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

let count = 0

export const Form = memo(<TFieldValues extends FieldValues>({
  children,
  onSubmit,
  context,
  enableDefault,
  ...props
}: FormProps<TFieldValues>) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOnSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      if (!enableDefault) {
        event.preventDefault();
      }

      await context.handleSubmit(onSubmit)(event);

      setIsSubmitted(true);
    },
    [onSubmit]
  );

  count++

  useEffect(() => {
    if (isSubmitted) {
      context.reset();
    }
  }, [isSubmitted]);

  return (
    <FormProvider {...context}>
      <form {...props} onSubmit={handleOnSubmit}>
        <span>render: {count}</span>
        {children}
      </form>
    </FormProvider>
  );
})
