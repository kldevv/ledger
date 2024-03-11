import { Listbox } from '@headlessui/react'
import classNames from 'classnames'
import React, { useMemo } from 'react'

import { LoadingBox, TreasuryBookChip } from '@/components/core'
import { useTreasuryBookContext } from '@/hooks'

export const BranchSwitch: React.FC = () => {
  const { selectedTreasuryBookId, setSelectedTreasuryBookId, data, state } =
    useTreasuryBookContext()

  const options = useMemo(
    () =>
      data?.treasuryBooks.map(({ id, name, currency }) => ({
        value: id,
        label: <TreasuryBookChip name={name} currency={currency} />,
      })) ?? [],
    [data?.treasuryBooks],
  )

  const selectedTreasuryBook = useMemo(
    () => data?.treasuryBooks.find(({ id }) => id === selectedTreasuryBookId),
    [data?.treasuryBooks, selectedTreasuryBookId],
  )

  if (state.loading) {
    return <LoadingBox className="w-96" />
  }

  return (
    <Listbox onChange={setSelectedTreasuryBookId}>
      <div className="mx-2 w-80">
        <Listbox.Button className="w-full">
          <div className=" border-mid-gray flex w-full items-center truncate rounded-md border px-4 text-left text-xs font-medium">
            {selectedTreasuryBook && (
              <TreasuryBookChip
                name={selectedTreasuryBook?.name}
                currency={selectedTreasuryBook?.currency}
              />
            )}
          </div>
        </Listbox.Button>
        <Listbox.Options className="absolute z-30 flex w-80 flex-col items-start space-y-2 rounded-md bg-white p-3 shadow">
          {options.map(({ value, label }) => (
            <Listbox.Option key={value} value={value} as={React.Fragment}>
              {({ active }) => (
                <li
                  className={classNames(
                    active ? 'bg-light-accent text-white' : 'text-dark-shades',
                    'px-1 rounded-md text-xs w-full truncate',
                  )}
                >
                  {label}
                </li>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  )
}
