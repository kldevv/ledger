import { forwardRef, useCallback } from "react"
import type { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form"
import { FormProvider } from "react-hook-form"

export type createFormProps<TFieldValues extends FieldValues> = {
  /**
   * Set of methods returned by the react-hook-form `useForm` hook
   */
  reactHookFormMethods: UseFormReturn<TFieldValues>
  /**
   * Is default form behavior enabled?
   * 
   * By default, `false`
   */
  enableDefault?: boolean
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
}


/**
 * A helper method to manufacture a new form with a context provider
 */
export const createForm = <TFieldValues extends FieldValues>({ reactHookFormMethods, enableDefault = false}: createFormProps<TFieldValues>) => {
    const Form: React.FC<FormProps<TFieldValues>> = forwardRef(useCallback(
    ({ children, onSubmit, ...props }, ref) => {

      const handleOnSubmit = useCallback(
        (event: React.FormEvent<HTMLFormElement>) => {
          if (!enableDefault) {
            event.preventDefault()
          }

          void reactHookFormMethods.handleSubmit(onSubmit)(event);
        },
        [onSubmit]
      );

      return (
        <FormProvider {...reactHookFormMethods}>
          <form {...props} ref={ref} onSubmit={handleOnSubmit}>
            {children}
          </form>
        </FormProvider>
      );
    },
    [reactHookFormMethods, enableDefault]
  ))

  return Form
}