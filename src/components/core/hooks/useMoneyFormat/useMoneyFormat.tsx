import type { NumericFormatProps } from 'react-number-format'

import { useCallback } from 'react'
import { useNumericFormat } from 'react-number-format'

export const useMoneyFormat = (props?: NumericFormatProps) => {
  const config = {
    decimalScale: 2,
    allowLeadingZeros: false,
    allowNegative: false,
    thousandSeparator: ',',
    thousandsGroupStyle: 'thousand',
    fixedDecimalScale: true,
    ...props,
  } as const

  const { format: _format, removeFormatting: _removeFormatting } =
    useNumericFormat(config)

  const removeFormatting = useCallback(
    (str: string) => {
      return new Number(_removeFormatting?.(str)).toFixed(2)
    },
    [_removeFormatting],
  )

  const format = useCallback(
    (str: string) => {
      return _format?.(removeFormatting(str))
    },
    [_format, removeFormatting],
  )

  return { format, removeFormatting }
}
