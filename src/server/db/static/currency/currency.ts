import type { Currency as PrismaCurrency } from '@prisma/client'

export namespace ReadMany {
  export type Currency = {
    /**
     * Currency value
     */
    value: PrismaCurrency
    /**
     * Currency label
     */
    label: string
    /**
     * Currency icon
     */
    icon?: string
  }
}

const currencies: ReadMany.Currency[] = [
  {
    value: 'USD',
    label: 'USD',
  },
  {
    value: 'EUR',
    label: 'EUR',
  },
  {
    value: 'NTD',
    label: 'NTD',
  },
]

export const readMany = () => {
  return currencies
}
