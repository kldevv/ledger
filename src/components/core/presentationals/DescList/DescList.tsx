import classNames from 'classnames'

import { LoadingBox, Spinner } from '..'

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
    <dl>
      {items.map(({ title, desc }, index) => (
        <div
          className="border-t-mid-gray grid grid-cols-3 items-center gap-x-8 border-t-2 px-2 py-4 text-xs font-normal first:border-t-0"
          key={title}
        >
          <dt>
            <div className="text-gray">{title}</div>
          </dt>
          <dd>
            <div className="text-dark-shades col-span-2">
              {loading ? (
                <LoadingBox
                  className={classNames('h-4 w-20', {
                    'w-32': index % 3 === 0,
                    'w-44': index % 2 === 0,
                    'w-60': index % 7 === 0,
                  })}
                />
              ) : (
                desc
              )}
            </div>
          </dd>
        </div>
      ))}
    </dl>
  )
}
