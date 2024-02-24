import classNames from 'classnames'
import { forwardRef, useMemo } from 'react'

export interface InputCoreProps extends React.ComponentPropsWithRef<'input'> {}

export const InputCore: React.FC<InputCoreProps> = forwardRef(
  ({ className, ...props }, ref) => {
    const cn = useMemo(
      () =>
        classNames(
          'py-1.5 px-3',
          'w-full h-[2.5rem]',
          'rounded-md border border-mid-gray',
          'font-normal text-sm leading-6 text-dark-shades outline-none',
          className,
        ),
      [className],
    )

    return <input className={cn} ref={ref} autoComplete="on" {...props} />
  },
)

InputCore.displayName = 'InputCore'
