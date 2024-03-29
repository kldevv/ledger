import type { Control, FieldValues, Path } from 'react-hook-form'

import { useMemo } from 'react'
import { useController } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'

import { ErrorMessage, InputCore, Label } from '@/components/core'
import { useCurrentBranch } from '@/components/core/hooks'
import { getCurrencySymbol } from '@/shared'

import type { Currency } from '@/api/graphql'
import type { InputCoreProps } from '@/components/core'

export interface InputCurrencyNumberProps<TFieldValues extends FieldValues>
  extends Omit<
    InputCoreProps,
    'onChange' | 'value' | 'onBur' | 'defaultValue' | 'type' | 'ref'
  > {
  /**
   * Input number label
   */
  label: string
  /**
   * Input number name
   */
  name: Path<TFieldValues>
  /**
   * Form control
   */
  control?: Control<TFieldValues>
  /**
   * Default value
   */
  defaultValue?: number | string
  /**
   * Override the default selected currency
   */
  currency?: Currency
}

export const InputCurrencyNumber = <TFieldValues extends FieldValues>({
  name,
  label,
  control,
  currency,
  ...props
}: InputCurrencyNumberProps<TFieldValues>) => {
  const {
    field: { onChange, onBlur, value, ref, disabled },
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  const [currentBranch] = useCurrentBranch()

  const currencySymbol = useMemo(
    () => getCurrencySymbol(currentBranch?.currency),
    [currency, currentBranch?.currency, currentBranch?.id],
  )

  return (
    <div className="flex w-full min-w-fit flex-col">
      <Label htmlFor={`input-${name}`}>{label}</Label>
      <div className="relative flex">
        <span className="text-dark-shades absolute left-2 top-3 select-none text-xs font-normal">
          {currencySymbol}
        </span>
        <NumericFormat
          id={`input-${name}`}
          onChange={onChange}
          customInput={InputCore}
          getInputRef={ref}
          disabled={disabled}
          onBlur={onBlur}
          name={name}
          value={value === '' ? '0' : value}
          decimalScale={2}
          allowLeadingZeros={false}
          allowNegative={false}
          thousandSeparator={','}
          fixedDecimalScale
          className="pl-10 text-right"
          {...props}
        />
      </div>
      <ErrorMessage error={error?.message} />
    </div>
  )
}
