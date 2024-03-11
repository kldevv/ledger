import classNames from 'classnames'
import { forwardRef, useMemo } from 'react'
import { useFormState } from 'react-hook-form'

import { Button } from '@/components/core'

import type { ButtonProps } from '@/components/core'

type SubmitButtonProps = Omit<ButtonProps, 'type'>

export const SubmitButton: React.FC<SubmitButtonProps> = forwardRef(
  ({ loading, disabled = false, className, ...props }, ref) => {
    const {
      isLoading: isFormLoading,
      isSubmitting,
      isValid,
      isValidating,
      isDirty,
    } = useFormState()

    // Disable button if the form states are not ready
    const isDisabled = useMemo(() => {
      return disabled || !isValid || isValidating || isFormLoading || !isDirty
    }, [disabled, isValid, isValidating, isFormLoading, isDirty])

    // Loading the button when submitting, useful when handling async `onSubmit` callback
    const isLoading = useMemo(() => {
      return loading === true || isSubmitting
    }, [loading, isSubmitting])

    return (
      <Button
        className={classNames(
          'max-w-xs text-sm leading-6 font-medium bg-light-accent text-light-shades py-1 px-3 rounded-md my-2 disabled:bg-mid-gray',
          className,
        )}
        ref={ref}
        disabled={isDisabled}
        loading={isLoading}
        {...props}
        type="submit"
      />
    )
  },
)

SubmitButton.displayName = 'SubmitButton'
