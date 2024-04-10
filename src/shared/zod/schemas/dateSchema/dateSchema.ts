import { z } from 'zod'

export const dateSchema = z
  .string()
  .regex(/^\d{4}\/\d{2}\/\d{2}$/, { message: 'date.format' })
  .refine(
    (arg) => {
      if (Number.isNaN(Date.parse(arg))) return false

      const date = new Date(arg)

      const year = date.getFullYear()
      const month = ('0' + (date.getMonth() + 1)).slice(-2)
      const day = ('0' + date.getDate()).slice(-2)

      return `${year}/${month}/${day}` === arg
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
