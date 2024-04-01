import { z } from 'zod'

export const generateDropdownSchema = <T extends Record<string, string>>(
  options: T,
) =>
  z
    .nativeEnum(options)
    .nullable()
    .refine((value) => value != null)
