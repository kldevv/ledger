import { z } from 'zod'

import { parseNumberString } from '@/shared'

export const numberSchema = z
  .string()
  .refine(
    (value) => {
      const parsedValue = parseNumberString(value)

      return !isNaN(parsedValue) && parsedValue >= 0
    },
    {
      message: 'Invalid number format or negative value',
    },
  )
  .transform((value) => {
    return String(parseNumberString(value))
  })
