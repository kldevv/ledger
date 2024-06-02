import clsx from 'clsx'

import { LoadingBox } from '..'

export type DescListItem = {
  /**
   * Title
   */
  title: string
  /**
   * Data
   */
  desc: React.ReactNode
}

export interface DescriptionListProps {
  /**
   * Items
   */
  items: DescListItem[]
  /**
   * Is loading
   */
  loading?: boolean
}

export const DescList: React.FC<DescriptionListProps> = ({
  items,
  loading = false,
}) => {
  if (items.length === 0) return null

  return (
    <div>
      {items.map(({ title, desc }, index) => (
        <div
          className="border-t-mid-gray grid grid-cols-3 items-center gap-x-8 border-t-2 px-2 py-4 text-xs font-normal first:border-t-0"
          key={title}
          data-testid="desc-list-item"
        >
          <div className="text-gray" data-testid="desc-list-item-title">
            {title}
          </div>
          <div
            className="text-dark-shades col-span-2"
            data-testid="desc-list-item-desc"
          >
            {loading ? (
              <LoadingBox
                className={clsx('h-4 w-20', {
                  'w-32': index % 3 === 0,
                  'w-44': index % 2 === 0,
                  'w-60': index % 7 === 0,
                })}
              />
            ) : (
              desc
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
