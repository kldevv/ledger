import { z } from 'zod'

import { parseCurrencyNumericFormat } from '@/shared'

export const numberSchema = z
  .string()
  .refine(
    (value) => {
      const parsedValue = parseCurrencyNumericFormat(value)

      return !isNaN(parsedValue) && parsedValue >= 0
    },
    {
      message: 'Invalid number format or negative value',
    },
  )
  .transform((value) => {
    return String(parseCurrencyNumericFormat(value))
  })
