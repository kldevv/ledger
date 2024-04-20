import { useTranslation } from 'next-i18next'
import { useCallback, useMemo, useState } from 'react'

import {
  DateStandard,
  AccountingElement,
  useTotalOverMonthsQuery,
  EntryStatus,
} from '@/api/graphql'
import { useCurrentBranch } from '@/components/core/hooks'
import {
  ButtonCore,
  Card,
  Dropdown,
  Table,
} from '@/components/core/presentationals'
import { accountingElementToOutlineIconName } from '@/shared/utils'

import { useTotalOverMonthsTableCol } from '../../hooks'

import type { DropdownItem } from '@/components/core/presentationals'
import type { UseSelectSelectedItemChange } from 'downshift'

// import type { EntryStatus } from '@/api/graphql'

type StateSchema = {
  standard: DateStandard
  groupByElement: AccountingElement
}

type FilterSchema = {
  status?: EntryStatus
  year?: number
}

export const TotalOverMonthsTable: React.FC = () => {
  const { t } = useTranslation('summary')
  const [currentBranch] = useCurrentBranch()
  const colDefs = useTotalOverMonthsTableCol()
  const [state, setState] = useState<StateSchema>({
    standard: DateStandard.ACCRUAL,
    groupByElement: AccountingElement.ACCOUNT,
  })
  const [filter, setFilter] = useState<FilterSchema | undefined>()

  const { data, loading } = useTotalOverMonthsQuery({
    variables: {
      input: {
        branchId: currentBranch?.id ?? '',
        ...state,
        ...filter,
      },
    },
    fetchPolicy: 'cache-and-network',
    skip: currentBranch == null,
  })

  const standards = useMemo(
    () =>
      [DateStandard.ACCRUAL, DateStandard.TRANSACTION].map((standard) => ({
        value: standard,
        title: t(`dateStandard.${standard}`),
      })),
    [t],
  )

  const groupByElements = useMemo(
    () =>
      [
        AccountingElement.ACCOUNT,
        AccountingElement.ACCOUNT_GROUP,
        AccountingElement.ACCOUNTING_TYPE,
      ].map((element) => ({
        value: element,
        title: t(`accountingElement.${element}`),
        outlineIcon: accountingElementToOutlineIconName(element),
      })),
    [t],
  )

  const years = useMemo(
    () =>
      Array.from({ length: new Date().getFullYear() - 2017 }, (_, index) => ({
        value: index + 2018,
        title: String(index + 2018),
      })).reverse(),
    [],
  )

  const entryStatuses = useMemo(
    () =>
      [EntryStatus.COMPLETED, EntryStatus.PENDING].map((status) => ({
        value: status,
        title: t(`journal:entryStatus.${status}`),
        status,
      })),
    [t],
  )

  const handleStandardChange = useCallback(
    (change: UseSelectSelectedItemChange<DropdownItem<DateStandard>>) =>
      setState((prev) => ({ ...prev, standard: change.selectedItem.value })),
    [],
  )

  const handleGroupByElementChange = useCallback(
    (change: UseSelectSelectedItemChange<DropdownItem<AccountingElement>>) =>
      setState((prev) => ({
        ...prev,
        groupByElement: change.selectedItem.value,
      })),
    [],
  )

  const handleYearChange = useCallback(
    (change: UseSelectSelectedItemChange<DropdownItem<number>>) =>
      setFilter((prev) => ({ ...prev, year: change.selectedItem.value })),
    [],
  )

  const handleStatusChange = useCallback(
    (change: UseSelectSelectedItemChange<DropdownItem<EntryStatus>>) =>
      setFilter((prev) => ({ ...prev, status: change.selectedItem.value })),
    [],
  )

  return (
    <Card>
      <div>
        <div className="flex flex-col">
          <div className="border-b-mid-gray mb-4 flex flex-wrap items-center gap-2 border-b pb-6">
            <div className="w-48">
              <Dropdown>
                <Dropdown.Select
                  items={standards}
                  onChange={handleStandardChange}
                  value={standards.find(
                    ({ value }) => value === state.standard,
                  )}
                >
                  <Dropdown.Options />
                </Dropdown.Select>
              </Dropdown>
            </div>
            <div className="w-48">
              <Dropdown>
                <Dropdown.Select
                  items={groupByElements}
                  onChange={handleGroupByElementChange}
                  value={groupByElements.find(
                    ({ value }) => value === state.groupByElement,
                  )}
                >
                  <Dropdown.Options />
                </Dropdown.Select>
              </Dropdown>
            </div>
            <div className="w-36">
              <Dropdown>
                <Dropdown.Select
                  items={years}
                  onChange={handleYearChange}
                  placeholder={t`totalOverMonthsTable.placeholder.year`}
                  value={years.find(({ value }) => value === filter?.year)}
                >
                  <Dropdown.Options />
                </Dropdown.Select>
              </Dropdown>
            </div>
            <div className="w-40">
              <Dropdown>
                <Dropdown.Select
                  items={entryStatuses}
                  onChange={handleStatusChange}
                  placeholder={t`totalOverMonthsTable.placeholder.status`}
                  value={entryStatuses.find(
                    ({ value }) => value === filter?.status,
                  )}
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
                {t`totalOverMonthsTable.reset`}
              </ButtonCore>
            )}
          </div>
        </div>
        <Table
          data={data?.totalOverMonths ?? []}
          colDefs={colDefs}
          loading={loading || !data}
          enabledPagination={false}
        />
      </div>
    </Card>
  )
}
