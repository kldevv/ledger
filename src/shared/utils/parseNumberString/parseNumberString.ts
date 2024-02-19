export const parseNumberString = (input: string | number): number => {
  if (typeof input === 'number') {
    return input
  }

  const valueWithoutSeparators = input.replace(/,/g, '')

  return parseFloat(valueWithoutSeparators)
}
