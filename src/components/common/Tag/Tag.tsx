import Link from 'next/link'

import { route } from '@/shared'

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
      <div className="bg-light-accent text-light-shades h-6 w-12 truncate rounded-xl p-1 text-center align-middle text-xs">
        {name}
      </div>
    </Link>
  )
}
