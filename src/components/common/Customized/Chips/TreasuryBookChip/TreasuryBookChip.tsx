import { Currency } from '@/api/graphql'
import { CurrencyChip } from '..'

export interface TreasuryBookChipProps {
  /**
   * Treasury book name
   */
  name: string
  /**
   * Treasury book currency
   */
  currency: Currency
}

export const TreasuryBookChip: React.FC<TreasuryBookChipProps> = ({
  name,
  currency,
}) => {
  return (
    <div className="'text-xs leading-6 font-medium cursor-pointer text-start flex items-center w-full rounded-md py-1">
      <div className="overflow-hidden overflow-ellipsis">{name}</div>
      <div className="ml-auto pl-8">
        <CurrencyChip currency={currency} />
      </div>
    </div>
  )
}
