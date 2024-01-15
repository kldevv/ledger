import Link from 'next/link'

import { route } from '@/lib'

export interface TagProps {
  /**
   * Tag id
   */
  id: string
  /**
   * Tag name
   */
  name: string
}

export const Tag: React.FC<TagProps> = ({ id, name }) => {
  return (
    <Link
      href={{
        pathname: route.tagDetail.pathname,
        query: {
          id,
        },
      }}
    >
      <div className="w-12 h-6 text-xs align-middle text-center whitespace-nowrap overflow-ellipsis overflow-hidden rounded-xl bg-light-accent py-1 px-1 text-light-shades">
        {name}
      </div>
    </Link>
  )
}
