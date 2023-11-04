import { useCallback } from "react"
import type { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form"
import { FormProvider } from "react-hook-form"

export type createFormProps = {
  /**
   * Set of methods returned by the react-hook-form `useForm` hook
   */
  reactHookFormMethods: UseFormReturn
  /**
   * Is default form behavior enabled?
   * 
   * By default, the value is `false`
   */
  enableDefault?: boolean
}

export interface FormProps<TFieldValues extends FieldValues>
  extends Omit<React.ComponentPropsWithRef<'form'>, 'onSubmit'> {
  /**
   * Form children components
   */
  children: React.ReactNode;
  /**
   * Callback on submit event
   */
  onSubmit: SubmitHandler<TFieldValues>;
}


/**
 * A helper method to manufacture a new form with a context provider
 * , and should not be used directly outside the our `useForm` hook
 */
export const createForm = ({ reactHookFormMethods, enableDefault = false}: createFormProps) => {
  const Form: React.FC<FormProps<FieldValues>> = useCallback(
    ({ children, onSubmit, ...props }) => {
      const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        if (!enableDefault) {
          // Prevent default form behaviors unless specify not to
          event.preventDefault();
        }

        void reactHookFormMethods.handleSubmit(onSubmit)(event);
      };

      return (
        <FormProvider {...reactHookFormMethods}>
          <form {...props} onSubmit={handleOnSubmit}>
            {children}
          </form>
        </FormProvider>
      );
    },
    [reactHookFormMethods, enableDefault]
  );

  return Form
}