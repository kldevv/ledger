import { useTranslation } from 'next-i18next'
import { useCallback, useMemo, useState } from 'react'

import { TagType, useTagsQuery } from '@/api/graphql'
import { useCurrentBranch } from '@/components/core/hooks'
import {
  ButtonCore,
  Card,
  Dropdown,
  Table,
} from '@/components/core/presentationals'
import { tagTypeToSolidIconName } from '@/shared/utils'

import { useTagsTableCol } from '../../hooks'

import type { DropdownItem } from '@/components/core/presentationals'
import type { UseSelectSelectedItemChange } from 'downshift'

export const TagsTable: React.FC = () => {
  const { t } = useTranslation('tag')
  const [currentBranch] = useCurrentBranch()
  const [filter, setFilter] = useState<TagType | undefined>(undefined)
  const colDefs = useTagsTableCol()

  const hanldeFilterChange = useCallback(
    (change: UseSelectSelectedItemChange<DropdownItem<TagType>>) =>
      setFilter(change.selectedItem.value),
    [],
  )

  const { data, loading } = useTagsQuery({
    variables: {
      input: {
        branchId: currentBranch?.id ?? '',
      },
    },
    skip: currentBranch == null,
  })

  const types = useMemo(() => {
    return Object.values(TagType).map((value) => ({
      title: t(`tagType.${value}`),
      value,
      solidIcon: tagTypeToSolidIconName(value),
    }))
  }, [t])

  const filteredData = useMemo(() => {
    return (data?.tags ?? []).filter(
      (tag) => filter == null || tag.type === filter,
    )
  }, [data?.tags, filter])

  return (
    <Card>
      <div className="flex flex-col">
        <div className="border-b-mid-gray flex items-center space-x-4 border-b pb-6">
          <div className="w-48">
            <Dropdown>
              <Dropdown.Select
                items={types}
                onChange={hanldeFilterChange}
                placeholder={t`tagsTable.placeholder.type`}
                value={types.find(({ value }) => value === filter)}
              >
                <Dropdown.Options />
              </Dropdown.Select>
            </Dropdown>
          </div>
          {filter != null && (
            <ButtonCore
              className="text-light-accent w-fit text-xs font-medium hover:underline"
              onClick={() => setFilter(undefined)}
            >
              {t`tagsTable.reset`}
            </ButtonCore>
          )}
        </div>
        <Table
          data={filteredData}
          colDefs={colDefs}
          loading={loading || !data}
        />
      </div>
    </Card>
  )
}
