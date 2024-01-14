import { Listbox } from '@headlessui/react'
import classNames from 'classnames'
import React, { useMemo } from 'react'

import { useTreasuryBookContext } from '@/hooks'

export const TreasuryBookSelector: React.FC = () => {
  const { selectedTreasuryBookId, setSelectedTreasuryBookId, data } =
    useTreasuryBookContext()

  const options = useMemo(
    () =>
      data?.getVaults.map(({ id, name }) => ({ value: id, label: name })) ?? [],
    [data?.getVaults],
  )

  const displayLabel = useMemo(
    () => data?.getVaults.find(({ id }) => id === selectedTreasuryBookId)?.name,
    [data?.getVaults, selectedTreasuryBookId],
  )

  return (
    <Listbox
      as="div"
      className="relative flex mx-4"
      onChange={setSelectedTreasuryBookId}
    >
      <Listbox.Button>
        <div className="flex-auto px-20 py-1 rounded-xl text-light-accent text-xs font-bold border-2 shadow-xs border-mid-gray">
          <span className="whitespace-nowrap overflow-hidden overflow-ellipsis">
            {displayLabel}
          </span>
        </div>
      </Listbox.Button>
      <Listbox.Options className="absolute z-30 px-10 mt-7 bg-white border border-mid-gray shadow rounded-xl py-1 flex flex-col space-y-2 items-center">
        {options.map(({ value, label }) => (
          <Listbox.Option key={value} value={value} as={React.Fragment}>
            {({ active, selected }) => (
              <li
                className={classNames(
                  'text-xs leading-6 font-semibold cursor-pointer text-center',
                  active || selected ? 'text-light-accent' : undefined,
                )}
              >
                {label}
              </li>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  )
}
