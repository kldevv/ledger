import { z } from 'zod'

import { formatDate } from '@/shared/utils'

export const dateSchema = z
  .string()
  .regex(/^\d{4}\/\d{2}\/\d{2}$/, { message: 'date.format' })
  .refine(
    (arg) => {
      if (Number.isNaN(Date.parse(arg))) return false

      return formatDate(new Date(arg)) === arg
    },
    { message: 'date.invalid' },
  )
  .refine(
    (arg) => {
      const year = new Date(arg).getFullYear()

      return year >= 2018
    },
    { message: 'date.range' },
  )
