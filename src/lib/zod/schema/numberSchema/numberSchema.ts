import { z } from "zod";

const parseNumberString = (input: string): number => {
  const valueWithoutSeparators = input.replace(/,/g, '');

  return parseFloat(valueWithoutSeparators);
};

export const numberSchema = z.string().refine((value) => {
  const parsedValue = parseNumberString(value);

  return !isNaN(parsedValue) && parsedValue >= 0
}, {
  message: 'Invalid number format or negative value'
}).transform((value) => {

  return parseNumberString(value);
});