import { z } from "zod";

const parseNumberString = (input: string | number): number => {
  if (typeof input === 'number') {
    return input
  }

  const valueWithoutSeparators = input.replace(/,/g, '');

  return parseFloat(valueWithoutSeparators);
};

export const numberSchema = z.union([z.string(), z.number()]).refine((value) => {
  const parsedValue = parseNumberString(value);

  return !isNaN(parsedValue) && parsedValue >= 0
}, {
  message: 'Invalid number format or negative value'
}).transform((value) => {

  return parseNumberString(value);
});