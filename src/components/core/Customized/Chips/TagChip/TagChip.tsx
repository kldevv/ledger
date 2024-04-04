import Link from 'next/link'

import { route } from '@/shared/route'
import { getTagTypeIcon } from '@/shared/utils'

import type { Tag } from '@/api/graphql'

export interface TagChipProps {
  /**
   * Tag
   */
  tag: Partial<Tag>
}

export const TagChip: React.FC<TagChipProps> = ({
  tag: { id, name, type },
}) => {
  return (
    <Link
      href={{
        pathname: route.tag.details.pathname,
        query: {
          id,
        },
      }}
    >
      <div className="text-dark-shades bg-mid-gray hover:bg-gray flex items-center rounded-lg px-2 py-1 align-middle text-xs">
        {getTagTypeIcon(type)}
        <span className="ml-1">{name}</span>
      </div>
    </Link>
  )
}
