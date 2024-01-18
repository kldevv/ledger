import classNames from 'classnames'
import { forwardRef } from 'react'

export interface Label extends React.ComponentPropsWithRef<'label'> {}

export const Label: React.FC<Label> = forwardRef(
  ({ children, className, ...rest }, ref) => {
    return (
      <label
        className={classNames(
          'w-full text-xs leading-6 font-medium flex text-gray whitespace-nowrap',
          className,
        )}
        {...rest}
        ref={ref}
      >
        {children}
      </label>
    )
  },
)

Label.displayName = 'Label'
