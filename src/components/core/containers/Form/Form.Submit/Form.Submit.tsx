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
}

export const FormSubmit: React.FC<FormSubmitProps> = ({
  children,
  className,
}) => {
  const {
    isLoading: isFormLoading,
    isValid,
    isValidating,
    isDirty,
  } = useFormState()

  // Disable button if the form states are not ready
  const isDisabled = useMemo(() => {
    return !isValid || isValidating || isFormLoading || !isDirty
  }, [isValid, isValidating, isFormLoading, isDirty])

  return (
    <Button disabled={isDisabled} type="submit" className={className}>
      {children}
    </Button>
  )
}
