import { Listbox } from '@headlessui/react'
import classNames from 'classnames'
import React, { useMemo } from 'react'

import { DotStreamLoader, TreasuryBookChip } from '@/components/common'
import { useTreasuryBookContext } from '@/hooks'

export const TreasuryBookSelector: React.FC = () => {
  const { selectedTreasuryBookId, setSelectedTreasuryBookId, data, state } =
    useTreasuryBookContext()

  const options = useMemo(
    () =>
      data?.getTreasuryBooks.map(({ id, name, currency }) => ({
        value: id,
        label: <TreasuryBookChip name={name} currency={currency} />,
      })) ?? [],
    [data?.getTreasuryBooks],
  )

  const selectedTreasuryBook = useMemo(
    () =>
      data?.getTreasuryBooks.find(({ id }) => id === selectedTreasuryBookId),
    [data?.getTreasuryBooks, selectedTreasuryBookId],
  )

  if (state.loading) {
    return <DotStreamLoader />
  }

  return (
    <div className="w-96">
      <Listbox
        as="div"
        className="relative mx-4 flex w-full justify-center"
        onChange={setSelectedTreasuryBookId}
      >
        <Listbox.Button className="w-full">
          <div className="text-dark-shades border-mid-gray flex w-full flex-auto flex-nowrap items-center truncate rounded-2xl border-2 px-6 py-1 text-left text-xs font-medium">
            {selectedTreasuryBook && (
              <TreasuryBookChip
                name={selectedTreasuryBook?.name}
                currency={selectedTreasuryBook?.currency}
              />
            )}
          </div>
        </Listbox.Button>
        <Listbox.Options className="absolute z-30 mt-12 flex flex-col items-start space-y-2 rounded-xl bg-white p-3 shadow">
          {options.map(({ value, label }) => (
            <Listbox.Option key={value} value={value} as={React.Fragment}>
              {({ active }) => (
                <li
                  className={classNames(
                    active ? 'bg-light-accent text-white' : 'text-dark-shades',
                    'px-3 rounded-md text-xs w-full',
                  )}
                >
                  {label}
                </li>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  )
}
