import { Icon } from '..'

export interface ErrorProps {
  /**
   * Error
   */
  e?: string
}

export const Error: React.FC<ErrorProps> = ({ e }) => {
  if (e == null) {
    return null
  }

  return (
    <div
      className="text-dark-red/90 flex text-[0.625rem] leading-4"
      data-testid="field-error"
    >
      <span>
        <Icon name="ExclamationCircleSolid" className="mt-0.5 size-[0.7rem]" />
      </span>
      <span className="ml-0.5">{e}</span>
    </div>
  )
}
