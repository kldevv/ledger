import { numericFormatter } from 'react-number-format'

export const formatCurrencyNumber = (value?: string | number | null) => {
  if (value == null) {
    return '0'
  }

  return numericFormatter(String(value), {
    decimalScale: 2,
    thousandSeparator: ',',
    allowLeadingZeros: false,
    allowNegative: false,
    fixedDecimalScale: true,
  })
}
