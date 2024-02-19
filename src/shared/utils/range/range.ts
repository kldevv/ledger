export type RangeProps = {
  /**
   * Start
   */
  start?: number
  /**
   * Count
   */
  count: number
}

export const range = ({ start, count }: RangeProps) => {
  return Array.from({ length: count }, (_, index) => (start ?? 0) + index)
}
