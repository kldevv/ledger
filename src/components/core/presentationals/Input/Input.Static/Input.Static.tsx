import classNames from 'classnames'
import { forwardRef } from 'react'

export interface InputStaticProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const InputStatic = forwardRef<HTMLDivElement, InputStaticProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={classNames(
          'cursor-text outline-none w-full items-center flex',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)

InputStatic.displayName = 'Input.Static'
