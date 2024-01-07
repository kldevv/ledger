import type { Control, FieldValues, Path } from 'react-hook-form'
import { useController } from 'react-hook-form'
import classNames from 'classnames'
import { useCallback, useMemo } from 'react'
import { Label } from '../Label'
import { formatDate } from '@/lib'
import { ErrorMessage } from '../ErrorMessage'

export interface DatePickerProps<TFieldValues extends FieldValues>
  extends Omit<
    React.ComponentPropsWithoutRef<'input'>,
    'onChange' | 'value' | 'onBur'
  > {
  /**
   * Input label
   */
  label: string
  /**
   * Input name
   */
  name: Path<TFieldValues>
  /**
   * Form control
   */
  control?: Control<TFieldValues>
}

export const DatePicker = <TFieldValues extends FieldValues>({
  name,
  label,
  control,
  className,
  ...props
}: DatePickerProps<TFieldValues>) => {
  const {
    field: { value, ...rest },
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  const cn = useMemo(
    () =>
      classNames(
        'py-1.5 px-3',
        'w-full h-[2.5rem]',
        'rounded-md border border-mid-gray',
        'font-normal text-sm leading-6 text-dark-shades',
        'focus:outline-light-accent focus:bg-light-accent-halo',
        className,
      ),
    [className],
  )

  const convertValue = useCallback((value: Date | string) => {
    if (typeof value === 'string') return value

    return formatDate(value)
  }, [])

  return (
    <div className="w-[12rem] flex flex-col my-1">
      <Label htmlFor={`input-${name}`}>{label}</Label>
      <input
        {...props}
        {...rest}
        value={convertValue(value)}
        type="date"
        max="2999-12-31"
        className={cn}
        id={`input-${name}`}
        autoComplete="on"
      />
      <ErrorMessage error={error?.message} />
    </div>
  )
}
