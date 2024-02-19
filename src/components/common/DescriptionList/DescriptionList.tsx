import { Card, LoadingBox } from '..'

export type DescriptionListItem = {
  /**
   * Title
   */
  title: string
  /**
   * Data
   */
  description: React.ReactNode
}

export interface DescriptionListProps {
  /**
   * Items
   */
  items: DescriptionListItem[]
  /**
   * Loading?
   */
  loading?: boolean
}

export const DescriptionList: React.FC<DescriptionListProps> = ({
  items,
  loading = true,
}) => {
  if (items.length === 0) return null

  return (
    <Card>
      <div className="w-full">
        <dl>
          {items.map(({ title, description }) => (
            <div
              className="border-t-mid-gray grid grid-cols-2 items-center gap-x-8 border-t py-2 first:border-t-0"
              key={title}
            >
              <dt>
                <div className="text-dark-shades text-xs font-normal">
                  {title}
                </div>
              </dt>
              <dd>
                <div className="text-gray max-w-xs text-xs font-light leading-6">
                  {loading ? <LoadingBox className="h-3 w-36" /> : description}
                </div>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Card>
  )
}
