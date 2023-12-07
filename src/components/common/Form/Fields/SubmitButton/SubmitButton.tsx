import { useFormState } from "react-hook-form";
import { Button, ButtonProps } from "../../../lib"
import { forwardRef, useMemo } from "react";

type SubmitButtonProps = Omit<ButtonProps, 'type'>

export const SubmitButton: React.FC<SubmitButtonProps> = forwardRef(({ loading, disabled, ...props }, ref) => {
  const { isLoading: isFormLoading, isSubmitting, isValid, isValidating } = useFormState()
  
  // Disable button if the form states are not ready 
  const isDisabled = useMemo(() => {
    return disabled || !isValid || isValidating || isFormLoading;
  }, [disabled, isValid, isValidating, isFormLoading]);

  // Loading the button when submitting, useful when handling async `onSubmit` callback
  const isLoading = useMemo(() => {
    return loading || isSubmitting;
  }, [loading, isSubmitting]);

  return (
    <Button disabled={isDisabled} loading={isLoading} {...props} type="submit" />
  );
});