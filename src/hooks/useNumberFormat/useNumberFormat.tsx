import type { NumericFormatProps } from 'react-number-format'

import { useNumericFormat } from 'react-number-format'

export const useNumberFormat = (props: NumericFormatProps) => {
  const { format, removeFormatting } = useNumericFormat({
    decimalScale: 2,
    allowLeadingZeros: false,
    allowNegative: false,
    thousandSeparator: ',',
    thousandsGroupStyle: 'thousand',
    fixedDecimalScale: true,
    ...props,
  })

  return { format, removeFormatting }
}
