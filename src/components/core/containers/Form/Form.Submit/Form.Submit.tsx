import { useMemo } from 'react'
import { useFormState } from 'react-hook-form'

import { Button } from '@/components/core/presentationals'

export interface FormSubmitProps {
  /**
   * Children
   */
  children: string
  /**
   * Class name
   */
  className?: string
  /**
   * Is loading?
   */
  loading?: boolean
}

export const FormSubmit: React.FC<FormSubmitProps> = ({
  children,
  className,
  loading = false,
}) => {
  const {
    isLoading: isFormLoading,
    isSubmitting,
    isValid,
    isDirty,
  } = useFormState()

  // Disable button if the form states are not ready
  const isDisabled = useMemo(() => {
    return !isValid || isFormLoading || !isDirty
  }, [isValid, isFormLoading, isDirty])

  const isLoading = useMemo(() => {
    return loading === true || isSubmitting
  }, [loading, isSubmitting])

  return (
    <Button
      className={className}
      loading={isLoading}
      disabled={isDisabled}
      type="submit"
    >
      {children}
    </Button>
  )
}
