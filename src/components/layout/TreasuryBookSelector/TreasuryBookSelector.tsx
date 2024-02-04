import { Listbox } from '@headlessui/react'
import classNames from 'classnames'
import React, { useMemo } from 'react'

import { CurrencyChip } from '@/components/common'
import { useTreasuryBookContext } from '@/hooks'

export const TreasuryBookSelector: React.FC = () => {
  const { selectedTreasuryBookId, setSelectedTreasuryBookId, data } =
    useTreasuryBookContext()

  const options = useMemo(
    () =>
      data?.getTreasuryBooks.map(({ id, name, currency }) => ({
        value: id,
        label: name,
        currency,
      })) ?? [],
    [data?.getTreasuryBooks],
  )

  const selectedTreasuryBook = useMemo(
    () =>
      data?.getTreasuryBooks.find(({ id }) => id === selectedTreasuryBookId),
    [data?.getTreasuryBooks, selectedTreasuryBookId],
  )

  return (
    <Listbox
      as="div"
      className="relative mx-4 flex justify-start"
      onChange={setSelectedTreasuryBookId}
    >
      <Listbox.Button>
        <div className="text-dark-shades shadow-xs border-mid-gray flex flex-auto flex-nowrap items-center truncate rounded-2xl border-2 px-6 py-1 text-left text-xs font-medium">
          {selectedTreasuryBook?.name}
          <div className="ml-auto pl-8">
            <CurrencyChip currency={selectedTreasuryBook?.currency} />
          </div>
        </div>
      </Listbox.Button>
      <Listbox.Options className="absolute z-30 mt-9 flex flex-col items-start space-y-2 rounded-xl bg-white p-3 shadow">
        {options.map(({ value, label, currency }) => (
          <Listbox.Option key={value} value={value} as={React.Fragment}>
            {({ active }) => (
              <li
                className={classNames(
                  'text-xs leading-6 font-medium cursor-pointer text-start flex items-center w-full rounded-md px-3 py-1',
                  active ? 'bg-light-accent text-white' : 'text-dark-shades',
                )}
              >
                {label}
                <div className="ml-auto pl-8">
                  <CurrencyChip currency={currency} />
                </div>
              </li>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  )
}
