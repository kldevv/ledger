import { useState } from 'react'

import { useTagsQuery } from '@/api/graphql'
import { Card } from '@/components/core'
import { TagTypeDropdownFilter } from '@/components/core/Customized/Filters/TagTypeDropdownFilter'
import { TagTable } from '@/components/tag'
import { useCurrentBranch } from '@/components/core/hooks'

import type { TagType } from '@/api/graphql'

export const TagDataTable: React.FC = () => {
  const [currentBranch] = useCurrentBranch()
  const [typeFilter, setTypeFilter] = useState<TagType | null>(null)

  const { data: { tags } = {} } = useTagsQuery({
    variables: {
      input: {
        treasuryBookId: currentBranch?.id ?? '',
        type: typeFilter,
      },
    },
    skip: !currentBranch?.id,
  })

  return (
    <Card>
      <div className="flex flex-col space-y-2">
        <div className="border-b-mid-gray flex items-center space-x-2 border-b pb-3 pt-1">
          <TagTypeDropdownFilter value={typeFilter} onChange={setTypeFilter} />
        </div>
        <TagTable data={tags ?? []} />
      </div>
    </Card>
  )
}
