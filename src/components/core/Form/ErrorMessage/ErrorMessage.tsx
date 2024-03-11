export interface ErrorMessageProps {
  /**
   * Error
   */
  error?: string | null
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  if (error == null) {
    return null
  }

  return <p className="text-red text-xs font-normal">{error}</p>
}
