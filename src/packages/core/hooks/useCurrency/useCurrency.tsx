import { useCallback } from 'react'
import { numericFormatter } from 'react-number-format'

import type { IconProps } from '../../components'
import type { Currency } from '@/api/graphql'

/**
 * Currency metadata
 */
export const CurrencyData: Record<
  Currency,
  {
    icon: IconProps['name']
    name: string
    sign: string
  }
> = {
  EUR: {
    icon: 'EU',
    name: 'Euro',
    sign: '€',
  },
  NTD: {
    icon: 'TW',
    name: 'New Taiwan Dollar',
    sign: 'NT$',
  },
  RMB: {
    icon: 'CN',
    name: 'Renminbi',
    sign: '¥',
  },
  USD: {
    icon: 'US',
    name: 'United States Dollar',
    sign: '$',
  },
}

export interface UseCurrencyProps {
  /**
   * Currency
   */
  currency: Currency
}

export const useCurrency = ({ currency }: UseCurrencyProps) => {
  const format = useCallback(
    (num: number | string | null) =>
      numericFormatter(String(num ?? 0), {
        decimalScale: 2,
        thousandSeparator: ',',
        allowLeadingZeros: false,
        allowNegative: false,
        fixedDecimalScale: true,
      }),
    [],
  )

  return {
    data: CurrencyData[currency],
    format,
  }
}
