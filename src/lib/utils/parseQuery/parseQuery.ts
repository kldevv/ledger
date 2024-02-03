export const parseQueryValue = (
  value: string | string[] | undefined,
): string | undefined => {
  return Array.isArray(value) ? value.at(0) : value
}
