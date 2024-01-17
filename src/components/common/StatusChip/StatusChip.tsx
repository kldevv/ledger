import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

export type StatusChipProps = {
  /**
   * Status
   */
  status?: string | null
}

export const StatusChip: React.FC<StatusChipProps> = ({ status }) => {
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
    <div className="flex gap-x-2 items-center">
      <div
        className={classNames('p-1', 'rounded-full', 'flex-none', haloColor)}
      >
        <div className={classNames('w-1.5 h-1.5', 'rounded-full', coreColor)} />
      </div>
      {t(`StatusChip.label.${status}`)}
    </div>
  )
}
