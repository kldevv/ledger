import { useTranslation } from 'next-i18next'
import { useCallback, useMemo, useState } from 'react'

import { TagType, useTagsQuery } from '@/api/graphql'
import { Card, Table } from '@/components/core'
import { useCurrentBranch } from '@/components/core/hooks'
import { Dropdown } from '@/components/core/presentationals'
import { tagTypeToSolidIconName } from '@/shared/utils'

import { useTagsTableCol } from '../../hooks'

import type { DropdownItem } from '@/components/core/presentationals'
import type { UseSelectSelectedItemChange } from 'downshift'

export const TagsTable: React.FC = () => {
  const { t } = useTranslation('tag')
  const [currentBranch] = useCurrentBranch()
  const [filter, setFilter] = useState<TagType | null>(null)

  const hanldeFilterChange = useCallback(
    (change: UseSelectSelectedItemChange<DropdownItem<TagType | null>>) =>
      setFilter(change.selectedItem.value),
    [],
  )

  const { data } = useTagsQuery({
    variables: {
      input: {
        branchId: currentBranch?.id ?? '',
      },
    },
    skip: currentBranch == null,
  })
  const colDefs = useTagsTableCol()

  const tags = useMemo<DropdownItem<TagType | null>[]>(() => {
    return ([...Object.values(TagType), null] as const).map((value) => ({
      title: t(`tagType.${value}`),
      value,
      solidIcon: value != null ? tagTypeToSolidIconName(value) : undefined,
    }))
  }, [t])

  return (
    <Card>
      <div className="flex flex-col space-y-2">
        <div className="border-b-mid-gray flex items-center space-x-2 border-b pb-3 pt-1">
          <Dropdown>
            <Dropdown.Select
              items={tags}
              onChange={hanldeFilterChange}
              value={tags.find(({ value }) => value === filter)}
            >
              <Dropdown.Options />
            </Dropdown.Select>
          </Dropdown>
        </div>
        <Table data={data?.tags ?? []} colDefs={colDefs} />
      </div>
    </Card>
  )
}
