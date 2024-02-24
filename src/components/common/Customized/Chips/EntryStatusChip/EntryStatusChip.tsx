import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import type { EntryStatus } from '@/api/graphql'

export type EntryStatusChipProps = {
  /**
   * Status
   */
  status?: EntryStatus | null
}

export const EntryStatusChip: React.FC<EntryStatusChipProps> = ({ status }) => {
  const { t } = useTranslation('common')

  const [haloColor, coreColor] = useMemo(
    () =>
      (() => {
        switch (status) {
          case 'COMPLETED':
            return ['bg-green-halo', 'bg-green']
          case 'PENDING':
            return ['bg-yellow-halo', 'bg-yellow']
          default:
            return ['bg-red-halo', 'bg-red']
        }
      })(),
    [status],
  )

  return (
    <div className="flex items-center gap-x-2">
      <div
        className={classNames('p-1', 'rounded-full', 'flex-none', haloColor)}
      >
        <div className={classNames('w-1.5 h-1.5', 'rounded-full', coreColor)} />
      </div>
      {t(`EntryStatusChip.label.${status}`)}
    </div>
  )
}
