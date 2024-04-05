import { numericFormatter } from 'react-number-format'

export const formatCurrencyNumber = (value?: string | number | null) =>
  numericFormatter(String(value ?? 0), {
    decimalScale: 2,
    thousandSeparator: ',',
    allowLeadingZeros: false,
    allowNegative: false,
    fixedDecimalScale: true,
  })
