import { Listbox } from '@headlessui/react'
import classNames from 'classnames'
import React, { useCallback, useMemo } from 'react'

import { useTreasuryBooksQuery } from '@/api/graphql'
import { TreasuryBookChip } from '@/components/core'
import { useCurrentBranch } from '@/components/core/hooks'

export const BranchSwitch: React.FC = () => {
  const [currentBranch, setCurrentBranch] = useCurrentBranch()
  const { data } = useTreasuryBooksQuery({
    variables: {
      input: {
        ownerId: '81087108-3748-446a-b033-a85d7c9ace7b',
      },
    },
  })

  const options = useMemo(
    () =>
      data?.treasuryBooks.map(({ id, name, currency }) => ({
        value: id,
        label: <TreasuryBookChip name={name} currency={currency} />,
      })) ?? [],
    [data?.treasuryBooks],
  )

  const handleSetCurrentBranch = useCallback(
    (value: string) =>
      setCurrentBranch(data?.treasuryBooks.find(({ id }) => id === value)),
    [data?.treasuryBooks, setCurrentBranch],
  )

  return (
    <Listbox onChange={handleSetCurrentBranch}>
      <div className="mx-2 w-80">
        <Listbox.Button className="w-full">
          <div className=" border-mid-gray flex w-full items-center truncate rounded-md border px-4 text-left text-xs font-medium">
            {currentBranch && (
              <TreasuryBookChip
                name={currentBranch?.name}
                currency={currentBranch?.currency}
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
