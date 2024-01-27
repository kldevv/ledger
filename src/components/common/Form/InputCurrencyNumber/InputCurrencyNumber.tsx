import type { Control, FieldValues, Path } from 'react-hook-form'

import { useMemo } from 'react'
import { useController } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'

import { ErrorMessage, InputCore, Label } from '@/components/common'
import { useTreasuryBookContext } from '@/hooks'
import { getCurrencySymbol } from '@/lib'

import type { InputCoreProps } from '@/components/common'

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
}

export const InputCurrencyNumber = <TFieldValues extends FieldValues>({
  name,
  label,
  control,
  ...props
}: InputCurrencyNumberProps<TFieldValues>) => {
  const {
    field: { onChange, onBlur, value, ref, disabled },
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  const { selectedTreasuryBookId, data: { getTreasuryBooks } = {} } =
    useTreasuryBookContext()

  const currencySymbol = useMemo(() => {
    const currency = getTreasuryBooks?.find(
      ({ id }) => id === selectedTreasuryBookId,
    )?.currency

    return getCurrencySymbol(currency)
  }, [getTreasuryBooks, selectedTreasuryBookId])

  return (
    <div className="w-[12rem] flex flex-col my-1">
      <Label htmlFor={`input-${name}`}>{label}</Label>
      <div className="flex relative">
        <span className="font-normal text-dark-shades text-xs absolute top-3 left-2">
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
          value={value}
          decimalScale={2}
          allowLeadingZeros={false}
          allowNegative={false}
          thousandSeparator={','}
          className="text-right pl-10"
          {...props}
        />
      </div>
      <ErrorMessage error={error?.message} />
    </div>
  )
}
